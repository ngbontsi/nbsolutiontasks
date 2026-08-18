import { ClipboardList, Bell } from 'lucide-react'
import { useTasks } from './hooks/useTasks'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

export default function App() {
  const { tasks, stats, filter, setFilter, addTask, cycleStatus, editTask, deleteTask, checkReminders } = useTasks()
  const hasAlerts = stats.overdue > 0 || stats.dueToday > 0

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ClipboardList size={24} color="#3b82f6" />
            <h1 style={styles.title}>Decoded Tasks</h1>
          </div>
          <button onClick={() => checkReminders(true)} style={styles.bellBtn} title="Check notifications">
            <Bell size={18} color={hasAlerts ? '#eab308' : '#555'} />
            {hasAlerts && <span style={styles.bellDot} />}
          </button>
        </header>

        <TaskForm onAdd={addTask} />

        <TaskList
          tasks={tasks}
          filter={filter}
          setFilter={setFilter}
          stats={stats}
          onCycle={cycleStatus}
          onEdit={editTask}
          onDelete={deleteTask}
        />

        <footer style={styles.footer}>
          <div style={styles.footerStats}>
            {stats.pending} pending &middot; {stats.inProgress} in progress &middot; {stats.completed} done
          </div>
          <div style={styles.footerBrand}>
            Built by <a href="https://ngbontsi.github.io/freelance-work/" target="_blank" rel="noopener noreferrer" style={styles.link}>Decoded Solutions</a>
          </div>
          <a
            href="https://wa.me/27646320739?text=Hi%2C%20I%20saw%20Decoded%20Tasks%20and%20I%27d%20like%20to%20ask%20about%20a%20project"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.cta}
          >
            Need your own app built? Let&apos;s talk.
          </a>
        </footer>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#e5e5e5',
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px 16px 60px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '8px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 700,
    margin: 0,
  },
  footer: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#444',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center',
  },
  footerStats: {
    fontSize: '12px',
    color: '#444',
  },
  footerBrand: {
    fontSize: '12px',
    color: '#666',
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: 600,
  },
  cta: {
    display: 'inline-block',
    background: '#22c55e',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: 600,
    padding: '10px 18px',
    borderRadius: '8px',
    marginTop: '4px',
  },
  bellBtn: {
    position: 'relative',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    width: '8px',
    height: '8px',
    background: '#eab308',
    borderRadius: '50%',
  },
}
