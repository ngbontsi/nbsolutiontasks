import TaskItem from './TaskItem'
import type { Task, Filter } from '../types'

interface Props {
  tasks: Task[]
  filter: Filter
  setFilter: (f: Filter) => void
  stats: { total: number; pending: number; inProgress: number; completed: number; overdue: number; dueToday: number }
  onCycle: (id: string) => void
  onEdit: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
  onDelete: (id: string) => void
}

const filters: Filter[] = ['all', 'pending', 'in-progress', 'completed', 'today', 'overdue']

export default function TaskList({ tasks, filter, setFilter, stats, onCycle, onEdit, onDelete }: Props) {
  return (
    <div>
      <div style={styles.tabs}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.tab,
              color: filter === f ? '#3b82f6' : '#666',
              borderBottom: filter === f ? '2px solid #3b82f6' : '2px solid transparent',
            }}
          >
            {f === 'all' && `All (${stats.total})`}
            {f === 'pending' && `Pending (${stats.pending})`}
            {f === 'in-progress' && `In Progress (${stats.inProgress})`}
            {f === 'completed' && `Done (${stats.completed})`}
            {f === 'today' && `Today (${stats.dueToday})`}
            {f === 'overdue' && `Overdue (${stats.overdue})`}
          </button>
        ))}
      </div>

      <div style={styles.list}>
        {tasks.length === 0 ? (
          <div style={styles.empty}>
            {filter === 'all' ? 'No tasks yet. Add one above.' : 'No tasks match this filter.'}
          </div>
        ) : (
          tasks.map(t => (
            <TaskItem key={t.id} task={t} onCycle={onCycle} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  tabs: {
    display: 'flex',
    gap: '2px',
    overflowX: 'auto',
    marginBottom: '16px',
  },
  tab: {
    background: 'transparent',
    border: 'none',
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'color 0.15s',
    fontFamily: 'inherit',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  empty: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#555',
    fontSize: '14px',
  },
}
