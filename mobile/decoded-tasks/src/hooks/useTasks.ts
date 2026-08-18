import { useCallback, useEffect, useRef, useState } from 'react'
import type { Task, Filter } from '../types'

const STORAGE_KEY = 'decoded-tasks'
const CHECK_INTERVAL = 60 * 1000

function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const tasks: Task[] = raw ? JSON.parse(raw) : []
    return tasks.map(t => ({
      ...t,
      startDate: t.startDate || t.createdAt.slice(0, 10),
      reminderFrequency: t.reminderFrequency || 'daily',
      remindBeforeDue: t.remindBeforeDue ?? 2,
      lastReminded: t.lastReminded || null,
    }))
  } catch {
    return []
  }
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

function localDateStr(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function daysBetween(later: string, earlier: string): number {
  const a = new Date(later + 'T00:00:00')
  const b = new Date(earlier + 'T00:00:00')
  return Math.round((a.getTime() - b.getTime()) / 86400000)
}

function requestNotificationPermission() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission()
  }
}

function canNotify(): boolean {
  return 'Notification' in window && Notification.permission === 'granted'
}

const FREQ_DAYS: Record<string, number> = {
  daily: 1,
  'every-2-days': 2,
  'every-3-days': 3,
  weekly: 7,
}

function dueSoonMessage(task: Task, todayStr: string): string | null {
  if (task.dueDate === todayStr) {
    return task.status === 'pending'
      ? `"${task.title}" is due today and hasn't been started.`
      : `"${task.title}" is due today!`
  }
  if (task.dueDate < todayStr) {
    const late = daysBetween(todayStr, task.dueDate)
    return `"${task.title}" is ${late} day(s) overdue.`
  }
  const daysLeft = daysBetween(task.dueDate, todayStr)
  if (daysLeft <= task.remindBeforeDue) {
    return `"${task.title}" is due in ${daysLeft} day(s).`
  }
  return null
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [filter, setFilter] = useState<Filter>('all')
  const tasksRef = useRef(tasks)

  useEffect(() => { tasksRef.current = tasks }, [tasks])

  useEffect(() => { saveTasks(tasks) }, [tasks])

  useEffect(() => { requestNotificationPermission() }, [])

  const checkReminders = useCallback((manual = false) => {
    const todayStr = localDateStr()
    const current = tasksRef.current
    const messages: string[] = []
    const toUpdate: string[] = []

    if (canNotify()) {
      const lastCheck = localStorage.getItem('decoded-tasks-last-check')
      if (lastCheck !== todayStr) {
        const active = current.filter(t => t.status !== 'completed')
        localStorage.setItem('decoded-tasks-last-check', todayStr)
        messages.push(`Check your tasks for today — ${active.length} task(s) active.`)
      }

      current.forEach(t => {
        if (t.status === 'completed' || t.reminderFrequency === 'none') return
        const interval = FREQ_DAYS[t.reminderFrequency]
        if (!interval) return

        let due = false
        if (!t.lastReminded) due = true
        else if (daysBetween(todayStr, t.lastReminded) >= interval) due = true

        if (due) {
          const msg = dueSoonMessage(t, todayStr)
          if (msg) {
            messages.push(msg)
            toUpdate.push(t.id)
          }
        }
      })

      if (messages.length > 0) {
        const body = messages.slice(0, 3).join('\n') + (messages.length > 3 ? `\n\n+${messages.length - 3} more` : '')
        new Notification('Decoded Tasks', {
          body,
          icon: '/favicon.svg',
        })
      } else if (manual) {
        new Notification('Decoded Tasks', {
          body: 'No tasks need attention right now. You\'re on track!',
          icon: '/favicon.svg',
        })
      }
    } else if (manual) {
      requestNotificationPermission()
    }

    if (toUpdate.length > 0) {
      setTasks(prev =>
        prev.map(t => toUpdate.includes(t.id) ? { ...t, lastReminded: todayStr } : t)
      )
    }
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => checkReminders(false), CHECK_INTERVAL)
    return () => window.clearInterval(id)
  }, [checkReminders])

  useEffect(() => {
    checkReminders(false)
  }, [checkReminders])

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'status' | 'lastReminded'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      status: 'pending',
      lastReminded: null,
      createdAt: new Date().toISOString(),
    }
    setTasks(prev => [newTask, ...prev])
  }, [])

  const cycleStatus = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== id) return t
        const next = t.status === 'pending' ? 'in-progress' : t.status === 'in-progress' ? 'completed' : 'pending'
        return { ...t, status: next }
      })
    )
  }, [])

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }, [])

  const editTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, ...updates } : t)
    )
  }, [])

  const todayStr = localDateStr()

  const filteredTasks = tasks.filter(t => {
    switch (filter) {
      case 'pending': return t.status === 'pending'
      case 'in-progress': return t.status === 'in-progress'
      case 'completed': return t.status === 'completed'
      case 'today': return t.startDate <= todayStr && t.dueDate >= todayStr && t.status !== 'completed'
      case 'overdue': return t.dueDate < todayStr && t.status !== 'completed'
      default: return true
    }
  })

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    overdue: tasks.filter(t => t.status !== 'completed' && t.dueDate < todayStr).length,
    dueToday: tasks.filter(t => t.status !== 'completed' && t.startDate <= todayStr && t.dueDate >= todayStr).length,
  }

  return { tasks: filteredTasks, stats, filter, setFilter, addTask, cycleStatus, deleteTask, editTask, checkReminders }
}
