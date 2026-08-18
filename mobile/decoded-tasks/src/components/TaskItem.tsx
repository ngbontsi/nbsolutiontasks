import { useState } from 'react'
import { Check, Play, Circle, Pencil, Trash2, Bell, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import type { Task, Priority, TaskStatus, ReminderFrequency } from '../types'

interface Props {
  task: Task
  onCycle: (id: string) => void
  onEdit: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
  onDelete: (id: string) => void
}

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

const priorityIcon = (p: string) => {
  switch (p) {
    case 'high': return <ArrowUp size={14} color="#ef4444" />
    case 'low': return <ArrowDown size={14} color="#22c55e" />
    default: return <Minus size={14} color="#eab308" />
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' })
}

function getDateStyle(dateStr: string, done: boolean): React.CSSProperties {
  if (done) return { color: '#555' }
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dateStr + 'T00:00:00')
  const diff = due.getTime() - today.getTime()
  const days = Math.round(diff / 86400000)

  if (days < 0) return { color: '#ef4444', fontWeight: 600 }
  if (days === 0) return { color: '#eab308', fontWeight: 600 }
  if (days <= 2) return { color: '#f97316' }
  return { color: '#888' }
}

function getProgress(startDate: string, dueDate: string, done: boolean): number {
  if (done) return 100
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(startDate + 'T00:00:00')
  const due = new Date(dueDate + 'T00:00:00')
  const total = due.getTime() - start.getTime()
  const elapsed = today.getTime() - start.getTime()
  if (elapsed <= 0) return 0
  if (elapsed >= total) return 100
  return Math.round((elapsed / total) * 100)
}

const statusIcon = (s: string) => {
  switch (s) {
    case 'in-progress': return <Play size={14} color="#3b82f6" fill="#3b82f6" />
    case 'completed': return <Check size={16} color="#22c55e" />
    default: return <Circle size={16} color="#555" />
  }
}

const freqLabel = (f: ReminderFrequency) => {
  switch (f) {
    case 'daily': return 'Daily'
    case 'every-2-days': return 'Every 2d'
    case 'every-3-days': return 'Every 3d'
    case 'weekly': return 'Weekly'
    default: return ''
  }
}

export default function TaskItem({ task, onCycle, onEdit, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDesc, setEditDesc] = useState(task.description)
  const [editStart, setEditStart] = useState(task.startDate)
  const [editDue, setEditDue] = useState(task.dueDate)
  const [editPriority, setEditPriority] = useState<Priority>(task.priority)
  const [editStatus, setEditStatus] = useState<TaskStatus>(task.status)
  const [editReminderFreq, setEditReminderFreq] = useState<ReminderFrequency>(task.reminderFrequency)
  const [editRemindBefore, setEditRemindBefore] = useState(task.remindBeforeDue)

  const done = task.status === 'completed'
  const inProgress = task.status === 'in-progress'
  const progress = getProgress(task.startDate, task.dueDate, done)

  const startEdit = () => {
    setEditTitle(task.title)
    setEditDesc(task.description)
    setEditStart(task.startDate)
    setEditDue(task.dueDate)
    setEditPriority(task.priority)
    setEditStatus(task.status)
    setEditReminderFreq(task.reminderFrequency)
    setEditRemindBefore(task.remindBeforeDue)
    setEditing(true)
  }

  const saveEdit = () => {
    if (!editTitle.trim() || !editStart || !editDue) return
    onEdit(task.id, { title: editTitle.trim(), description: editDesc.trim(), startDate: editStart, dueDate: editDue, priority: editPriority, status: editStatus, reminderFrequency: editReminderFreq, remindBeforeDue: editRemindBefore })
    setEditing(false)
  }

  const cancelEdit = () => setEditing(false)

  if (editing) {
    return (
      <div style={{ ...styles.card, flexDirection: 'column', gap: '10px', borderColor: '#3b82f6' }}>
        <input value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="Title" style={styles.input} />
        <input value={editDesc} onChange={e => setEditDesc(e.target.value)} placeholder="Description" style={styles.input} />
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Start</label>
            <input type="date" value={editStart} min={todayStr()} onChange={e => { setEditStart(e.target.value); if (editDue && e.target.value > editDue) setEditDue('') }} style={styles.input} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Due</label>
            <input type="date" value={editDue} min={editStart || todayStr()} onChange={e => setEditDue(e.target.value)} style={styles.input} />
          </div>
        </div>
        <select value={editPriority} onChange={e => setEditPriority(e.target.value as Priority)} style={styles.input}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select value={editStatus} onChange={e => setEditStatus(e.target.value as TaskStatus)} style={styles.input}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Remind me</label>
            <select value={editReminderFreq} onChange={e => setEditReminderFreq(e.target.value as ReminderFrequency)} style={styles.input}>
              <option value="none">Never</option>
              <option value="daily">Daily</option>
              <option value="every-2-days">Every 2 days</option>
              <option value="every-3-days">Every 3 days</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={styles.label}>Warn before due</label>
            <select value={editRemindBefore} onChange={e => setEditRemindBefore(Number(e.target.value))} style={styles.input} disabled={editReminderFreq === 'none'}>
              <option value={0}>On due date</option>
              <option value={1}>1 day before</option>
              <option value={2}>2 days before</option>
              <option value={3}>3 days before</option>
              <option value={7}>1 week before</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={saveEdit} style={styles.submit}>Save</button>
          <button onClick={cancelEdit} style={styles.cancel}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      ...styles.card,
      opacity: done ? 0.5 : 1,
      borderColor: inProgress ? '#1e3a5f' : done ? '#1a1a1a' : '#1f1f1f',
      order: done ? 1 : 0,
    }}>
      <button onClick={() => onCycle(task.id)} style={styles.check}>
        {statusIcon(task.status)}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          ...styles.title,
          textDecoration: done ? 'line-through' : 'none',
          color: done ? '#555' : '#e5e5e5',
        }}>
          {task.title}
          {inProgress && <span style={styles.badge}>In Progress</span>}
        </div>
        {task.description && (
          <div style={styles.desc}>{task.description}</div>
        )}

        <div style={styles.meta}>
          <span style={getDateStyle(task.startDate, done)}>
            {formatDate(task.startDate)}
          </span>
          <span style={{ color: '#444' }}>&rarr;</span>
          <span style={getDateStyle(task.dueDate, done)}>
            {formatDate(task.dueDate)}
          </span>
          <span style={{ ...styles.priority, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            {priorityIcon(task.priority)}
            {task.priority}
          </span>
          {task.reminderFrequency !== 'none' && (
            <span style={{ ...styles.priority, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Bell size={12} color="#3b82f6" />
              {freqLabel(task.reminderFrequency)}
              {task.remindBeforeDue > 0 && ` · ${task.remindBeforeDue}d`}
            </span>
          )}
        </div>

        <div style={styles.progressTrack}>
          <div style={{
            ...styles.progressFill,
            width: `${progress}%`,
            background: done ? '#22c55e' : progress >= 100 ? '#ef4444' : '#3b82f6',
          }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flexShrink: 0 }}>
        <button onClick={startEdit} style={styles.action}>
          <Pencil size={14} color="#555" />
        </button>
        <button onClick={() => onDelete(task.id)} style={styles.action}>
          <Trash2 size={14} color="#555" />
        </button>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '14px',
    borderRadius: '10px',
    border: '1px solid #1f1f1f',
    background: '#0d0d0d',
    transition: 'opacity 0.2s',
  },
  check: {
    width: '24px',
    height: '24px',
    flexShrink: 0,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2px',
  },
  title: {
    fontSize: '15px',
    fontWeight: 500,
    lineHeight: 1.3,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  badge: {
    fontSize: '10px',
    fontWeight: 600,
    color: '#3b82f6',
    background: '#1e3a5f',
    padding: '2px 8px',
    borderRadius: '10px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.3px',
  },
  desc: {
    fontSize: '13px',
    color: '#666',
    marginTop: '2px',
    lineHeight: 1.3,
  },
  meta: {
    display: 'flex',
    gap: '8px',
    marginTop: '6px',
    fontSize: '12px',
    textTransform: 'capitalize' as const,
    alignItems: 'center',
  },
  priority: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    color: '#888',
  },
  progressTrack: {
    width: '100%',
    height: '4px',
    background: '#1a1a1a',
    borderRadius: '2px',
    marginTop: '8px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '2px',
    transition: 'width 0.3s ease',
  },
  action: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    opacity: 0.4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #2a2a2a',
    background: '#0a0a0a',
    color: '#e5e5e5',
    fontSize: '14px',
    outline: 'none',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    color: '#666',
    marginBottom: '4px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  submit: {
    flex: 1,
    padding: '8px',
    background: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  cancel: {
    padding: '8px 16px',
    background: 'transparent',
    color: '#888',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
}
