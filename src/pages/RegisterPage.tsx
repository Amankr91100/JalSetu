import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Waves } from 'lucide-react';

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    password: '',
    confirm: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.organization.trim()) e.organization = 'Organization is required';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'At least 8 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
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
          <h1 className="text-2xl font-bold text-navy-900">Create account</h1>
          <p className="text-sm text-navy-500 mt-1">For authorised agencies · Demo registration</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 space-y-4" noValidate>
          {[
            { id: 'name', label: 'Full name', type: 'text', auto: 'name' },
            { id: 'email', label: 'Email', type: 'email', auto: 'email' },
            { id: 'organization', label: 'Organization', type: 'text', auto: 'organization' },
            { id: 'password', label: 'Password', type: 'password', auto: 'new-password' },
            { id: 'confirm', label: 'Confirm password', type: 'password', auto: 'new-password' },
          ].map(({ id, label, type, auto }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-navy-700 mb-1">{label}</label>
              <input
                id={id}
                type={type}
                autoComplete={auto}
                value={form[id as keyof typeof form]}
                onChange={(e) => set(id, e.target.value)}
                className="input-field"
              />
              {errors[id] && <p className="mt-1 text-xs text-danger-600">{errors[id]}</p>}
            </div>
          ))}
          <button type="submit" disabled={submitting} className="w-full btn-primary py-2.5">
            {submitting ? 'Creating…' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-navy-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-flood-600 hover:text-flood-800">
            Login
          </Link>
        </p>
        <p className="mt-2 text-center text-xs text-navy-400">
          No real credentials are stored. This is a frontend demo only.
        </p>
      </div>
    </div>
  );
}
