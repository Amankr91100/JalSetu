import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Waves, Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'At least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Mock auth — no real credentials stored
    setTimeout(() => {
      setSubmitting(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-navy-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex p-2.5 rounded-xl bg-flood-600 text-white mb-3">
            <Waves className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-navy-900">Sign in to Flood Guard</h1>
          <p className="text-sm text-navy-500 mt-1">Authorised personnel only · Demo login</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="officer@agency.gov"
            />
            {errors.email && <p className="mt-1 text-xs text-danger-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-navy-700 mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600"
                onClick={() => setShowPw(!showPw)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-danger-600">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-navy-600 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded border-navy-300 text-flood-600 focus:ring-flood-500"
              />
              Remember me
            </label>
            <span className="text-sm text-flood-600">Forgot password? (demo)</span>
          </div>
          <button type="submit" disabled={submitting} className="w-full btn-primary py-2.5">
            {submitting ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-navy-500">
          No account?{' '}
          <Link to="/register" className="font-medium text-flood-600 hover:text-flood-800">
            Register
          </Link>
        </p>
        <p className="mt-2 text-center text-xs text-navy-400">
          Mock authentication only. No credentials are stored or transmitted.
        </p>
      </div>
    </div>
  );
}
