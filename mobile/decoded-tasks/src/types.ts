export type Priority = 'high' | 'medium' | 'low'
export type TaskStatus = 'pending' | 'in-progress' | 'completed'
export type Filter = 'all' | 'pending' | 'in-progress' | 'completed' | 'today' | 'overdue'
export type ReminderFrequency = 'none' | 'daily' | 'every-2-days' | 'every-3-days' | 'weekly'

export interface Task {
  id: string
  title: string
  description: string
  startDate: string
  dueDate: string
  priority: Priority
  status: TaskStatus
  reminderFrequency: ReminderFrequency
  remindBeforeDue: number
  lastReminded: string | null
  createdAt: string
}
