import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AVAILABLE_ROLES = [
  'USER', 'RESTAURANT_OWNER', 'GUESTHOUSE_OWNER', 'MARKETPLACE_VENDOR', 'SUPERVISOR', 'MANAGER',
];

export default function RegisterPage() {
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '', role: AVAILABLE_ROLES[0] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/app');
    } catch (err: any) {
      const msg = err.response?.data;
      if (typeof msg === 'string') setError(msg);
      else if (typeof msg === 'object' && msg !== null) setError(Object.values(msg).join('. '));
      else setError('Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="logo-mark">DS</span>
          <h1>Decoded Solutions</h1>
          <p>Create Account</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" value={form.firstName} onChange={update('firstName')} placeholder="John" required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" value={form.lastName} onChange={update('lastName')} placeholder="Doe" required />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={form.password} onChange={update('password')} placeholder="Min 6 characters" required minLength={6} />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={form.role} onChange={update('role')} required>
              {AVAILABLE_ROLES.map(r => (
                <option key={r} value={r}>{r.replace('_', ' ')}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            <UserPlus size={18} />
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="register-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
