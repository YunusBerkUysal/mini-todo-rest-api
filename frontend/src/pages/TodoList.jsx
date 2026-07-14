import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TodoItem from '../components/TodoItem';

const API_URL = 'http://localhost:3000/api/todos';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('createdAt-desc');
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const limit = 5;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.created) {
      setSuccess(true);
      const t = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(t);
    }
    if (location.state?.updated) {
      setSuccess(true);
      const t = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(t);
    }
  }, [location]);

  const fetchTodos = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.append('status', filter);
      if (priorityFilter !== 'all') params.append('priority', priorityFilter);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      
      const [sortBy, sortOrder] = sort.split('-');
      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);
      params.append('page', page);
      params.append('limit', limit);

      const response = await fetch(`${API_URL}?${params.toString()}`);
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Görevler alınamadı.');
      }
      
      const data = await response.json();
      setTodos(data);

      if (data.length === limit) {
        const nextParams = new URLSearchParams(params);
        nextParams.set('page', page + 1);
        const nextResponse = await fetch(`${API_URL}?${nextParams.toString()}`);
        if (nextResponse.ok) {
          const nextData = await nextResponse.json();
          setHasNextPage(nextData.length > 0);
        } else {
          setHasNextPage(false);
        }
      } else {
        setHasNextPage(false);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [filter, priorityFilter, searchQuery, sort]);

  useEffect(() => {
    fetchTodos();
  }, [filter, priorityFilter, searchQuery, sort, page]);

  const handleToggle = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}/toggle`, { method: 'PATCH' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }
      fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }
      fetchTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const completedCount = todos.filter(t => t.isCompleted).length;

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>Görevlerim</h1>
        <p>
          {todos.length === 0 && page === 1
            ? 'Görev bulunamadı.'
            : 'Görev listesi'}
        </p>
      </div>

      {success && (
        <div className="success-flash">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          İşlem başarıyla tamamlandı!
        </div>
      )}

      {error && (
        <div className="error-alert">
          <span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </span>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Görevlerde ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-row">
          <span className="filter-label">Durum</span>
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              className={`chip ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Tümü' : f === 'active' ? 'Aktif' : 'Tamamlanan'}
            </button>
          ))}

          <div className="divider" style={{ width: '1px', height: '24px', margin: '0 4px', background: 'var(--border)' }}></div>

          <span className="filter-label">Öncelik</span>
          <select
            className="priority-select-mini"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">Tümü</option>
            <option value="HIGH">🔴 Yüksek</option>
            <option value="MEDIUM">🟡 Orta</option>
            <option value="LOW">🔵 Düşük</option>
          </select>

          <div className="divider" style={{ width: '1px', height: '24px', margin: '0 4px', background: 'var(--border)' }}></div>

          <span className="filter-label">Sırala</span>
          <select
            className="priority-select-mini"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="createdAt-desc">Tarih (Yeniye)</option>
            <option value="createdAt-asc">Tarih (Eskiye)</option>
            <option value="priority-desc">Öncelik (Yüksek-Düşük)</option>
            <option value="priority-asc">Öncelik (Düşük-Yüksek)</option>
          </select>
        </div>
      </div>

      {todos.length === 0 && page === 1 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" ry="3"></rect>
              <line x1="9" y1="9" x2="15" y2="15"></line>
              <line x1="15" y1="9" x2="9" y2="15"></line>
            </svg>
          </div>
          <strong>Görev bulunamadı</strong>
          <p>Arama kriterlerini değiştir veya yeni görev ekle.</p>
        </div>
      ) : (
        <>
          <div className="todo-list">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
            {todos.length === 0 && page > 1 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-3)' }}>Bu sayfada görev yok.</div>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            <button
              className="chip"
              disabled={page === 1}
              style={{ opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            >
              Önceki Sayfa
            </button>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-3)' }}>Sayfa {page}</span>
            <button
              className="chip"
              disabled={!hasNextPage}
              style={{ opacity: !hasNextPage ? 0.5 : 1, cursor: !hasNextPage ? 'not-allowed' : 'pointer' }}
              onClick={() => setPage(p => p + 1)}
            >
              Sonraki Sayfa
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default TodoList;
