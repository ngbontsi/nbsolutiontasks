import { useState } from 'react'
import type { Priority, ReminderFrequency } from '../types'

interface Props {
  onAdd: (task: { title: string; description: string; startDate: string; dueDate: string; priority: Priority; reminderFrequency: ReminderFrequency; remindBeforeDue: number }) => void
}

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [reminderFrequency, setReminderFrequency] = useState<ReminderFrequency>('daily')
  const [remindBeforeDue, setRemindBeforeDue] = useState(2)
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !startDate || !dueDate) return
    onAdd({ title: title.trim(), description: description.trim(), startDate, dueDate, priority, reminderFrequency, remindBeforeDue })
    setTitle('')
    setDescription('')
    setStartDate('')
    setDueDate('')
    setPriority('medium')
    setReminderFrequency('daily')
    setRemindBeforeDue(2)
    setOpen(false)
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={styles.addButton}>
        + New Task
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        autoFocus
        placeholder="Task title *"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        style={styles.input}
      />
      <div style={styles.row}>
        <div style={{ flex: 1 }}>
          <label style={styles.label}>Start date *</label>
          <input
            type="date"
            value={startDate}
            min={todayStr()}
            onChange={e => {
              setStartDate(e.target.value)
              if (dueDate && e.target.value > dueDate) setDueDate('')
            }}
            style={styles.input}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label style={styles.label}>Due date *</label>
          <input
            type="date"
            value={dueDate}
            min={startDate || todayStr()}
            onChange={e => setDueDate(e.target.value)}
            style={styles.input}
          />
        </div>
      </div>
      <div style={styles.row}>
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
          style={{ ...styles.input, flex: 1 }}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div style={styles.row}>
        <div style={{ flex: 1 }}>
          <label style={styles.label}>Remind me</label>
          <select
            value={reminderFrequency}
            onChange={e => setReminderFrequency(e.target.value as ReminderFrequency)}
            style={styles.input}
          >
            <option value="none">Never</option>
            <option value="daily">Daily</option>
            <option value="every-2-days">Every 2 days</option>
            <option value="every-3-days">Every 3 days</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={styles.label}>Warn before due</label>
          <select
            value={remindBeforeDue}
            onChange={e => setRemindBeforeDue(Number(e.target.value))}
            style={styles.input}
            disabled={reminderFrequency === 'none'}
          >
            <option value={0}>On due date</option>
            <option value={1}>1 day before</option>
            <option value={2}>2 days before</option>
            <option value={3}>3 days before</option>
            <option value={7}>1 week before</option>
          </select>
        </div>
      </div>
      <div style={styles.row}>
        <button type="submit" style={styles.submit}>Add Task</button>
        <button type="button" onClick={() => setOpen(false)} style={styles.cancel}>Cancel</button>
      </div>
    </form>
  )
}

const styles: Record<string, React.CSSProperties> = {
  addButton: {
    width: '100%',
    padding: '14px',
    background: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  form: {
    background: '#141414',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    border: '1px solid #1f1f1f',
  },
  label: {
    display: 'block',
    fontSize: '11px',
    color: '#666',
    marginBottom: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #2a2a2a',
    background: '#0a0a0a',
    color: '#e5e5e5',
    fontSize: '14px',
    outline: 'none',
  },
  row: {
    display: 'flex',
    gap: '10px',
  },
  submit: {
    flex: 1,
    padding: '10px',
    background: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  cancel: {
    padding: '10px 20px',
    background: 'transparent',
    color: '#888',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
  },
}
