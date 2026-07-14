import { Link } from 'react-router-dom';

const PRIORITY_DOT = {
  HIGH: '🔴',
  MEDIUM: '🟡',
  LOW: '🔵',
};

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
};

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.isCompleted ? 'done' : ''}`}>
      <button className="check-btn" onClick={() => onToggle(todo.id)} title={todo.isCompleted ? 'Geri al' : 'Tamamlandı olarak işaretle'}>
        {todo.isCompleted && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </button>

      <div className="todo-body">
        <div className="todo-title">{todo.title}</div>
        {todo.description && <div className="todo-desc">{todo.description}</div>}
        <div className="todo-meta">
          <span className={`priority-tag ${todo.priority}`}>
            {PRIORITY_DOT[todo.priority]} {todo.priority === 'HIGH' ? 'Yüksek' : todo.priority === 'MEDIUM' ? 'Orta' : 'Düşük'}
          </span>
          <span className="todo-date">{formatDate(todo.createdAt)}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '4px' }}>
        <Link to={`/edit/${todo.id}`} className="edit-btn" title="Görevi düzenle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </Link>
        <button className="del-btn" onClick={() => onDelete(todo.id)} title="Görevi sil">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
            <path d="M10 11v6"></path>
            <path d="M14 11v6"></path>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
