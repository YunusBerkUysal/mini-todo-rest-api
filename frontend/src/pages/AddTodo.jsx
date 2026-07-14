import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/todos';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || title.trim().length < 3) {
      return setError('Başlık en az 3 karakter olmalıdır.');
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), description: description.trim(), priority })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Bir hata oluştu.');
      }

      navigate('/', { state: { created: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const titleProgress = Math.min((title.length / 80) * 100, 100);

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>Yeni Görev</h1>
        <p>Eklemek istediğin görevi aşağıdaki forma gir.</p>
      </div>

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

      <div className="card">
        <form className="form-section" onSubmit={handleSubmit}>
          <div className="field">
            <div className="field-header">
              <label htmlFor="title">Başlık</label>
              <span className={`char-count ${title.length >= 70 ? (title.length >= 80 ? 'over' : 'warn') : ''}`}>
                {title.length}/80
              </span>
            </div>
            <input
              id="title"
              type="text"
              placeholder="Ne yapman gerekiyor?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              autoFocus
            />
            {title.length > 0 && (
              <div style={{ height: '3px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${titleProgress}%`,
                  background: titleProgress >= 100 ? 'var(--red)' : titleProgress >= 87 ? 'var(--amber)' : 'var(--accent)',
                  borderRadius: '99px',
                  transition: 'width 0.2s, background 0.3s'
                }} />
              </div>
            )}
          </div>

          <div className="field">
            <div className="field-header">
              <label htmlFor="description">Açıklama <span style={{ fontWeight: 400, color: 'var(--text-3)', textTransform: 'none', letterSpacing: 0 }}>(isteğe bağlı)</span></label>
              <span className={`char-count ${description.length >= 280 ? (description.length >= 300 ? 'over' : 'warn') : ''}`}>
                {description.length}/300
              </span>
            </div>
            <textarea
              id="description"
              placeholder="Daha fazla ayrıntı ekle..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
            />
          </div>

          <div className="field">
            <label htmlFor="priority">Öncelik</label>
            <div className="select-group">
              <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="HIGH">🔴 Yüksek</option>
                <option value="MEDIUM">🟡 Orta</option>
                <option value="LOW">🔵 Düşük</option>
              </select>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Görevi Ekle
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddTodo;
