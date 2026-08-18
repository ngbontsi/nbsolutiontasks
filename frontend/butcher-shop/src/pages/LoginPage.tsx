import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useShop();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register({ email, password, firstName, lastName });
      }
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Operation failed');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>{mode === 'login' ? 'Sign In' : 'Create Account'}</h1>
        <p>{mode === 'login' ? 'Welcome back' : 'Join the butcher shop'}</p>
      </div>
      <div className="checkout-layout" style={{ justifyContent: 'center' }}>
        <form onSubmit={handleSubmit} className="checkout-form" style={{ maxWidth: 400 }}>
          {error && <div className="error-banner">{error}</div>}
          {mode === 'register' && (
            <>
              <div className="form-group">
                <label>First Name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary btn-block" type="submit">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
          <p style={{ textAlign: 'center', marginTop: 16 }}>
            {mode === 'login' ? (
              <>Don&apos;t have an account?{' '}<Link to="#" onClick={() => setMode('register')}>Register</Link></>
            ) : (
              <>Already have an account?{' '}<Link to="#" onClick={() => setMode('login')}>Sign In</Link></>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
