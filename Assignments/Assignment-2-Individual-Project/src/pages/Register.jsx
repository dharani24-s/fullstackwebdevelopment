import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, saveUsers } from '../store';
import Notice from '../components/Notice';

export default function Register() {
  const [form, setForm] = useState({ name: '', studentId: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault(); setError(''); setSuccess('');
    if (form.name.trim().length < 2) return setError('Enter your full name.');
    if (form.studentId.trim().length < 2) return setError('Enter a valid student ID.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.');
    const users = getUsers();
    if (users.some((u) => u.email.toLowerCase() === form.email.trim().toLowerCase() || u.studentId.toLowerCase() === form.studentId.trim().toLowerCase())) return setError('That email or student ID is already registered.');
    const user = { name: form.name.trim(), studentId: form.studentId.trim().toUpperCase(), email: form.email.trim().toLowerCase(), password: form.password, course: 'B.Tech', department: 'Computer Science', semester: 'Semester 1', totalSubjects: 6, attendance: 85, pendingAssignments: 2 };
    saveUsers([...users, user]); setSuccess('Registration successful! Redirecting to sign in…');
    setTimeout(() => navigate('/login'), 900);
  };
  return <div className="auth-page register-page"><div className="auth-art"><div className="auth-art-content"><div className="brand brand-light"><span className="brand-mark">C</span><span>CampusHub<small>STUDENT PORTAL</small></span></div><div className="art-copy"><span className="pill">START YOUR JOURNEY</span><h1>Your future<br />starts with a<br /><em>first step.</em></h1><p>Create your student account to keep your academic information organized.</p></div><div className="art-bottom">Learn · Grow · Achieve</div></div></div>
  <div className="auth-panel"><div className="auth-form-wrap"><div className="mobile-brand brand"><span className="brand-mark">C</span><span>CampusHub<small>STUDENT PORTAL</small></span></div><span className="eyebrow">JOIN CAMPUSHUB</span><h2>Create your account</h2><p className="muted">Fill in the details below to register.</p><Notice type="error">{error}</Notice><Notice>{success}</Notice>
    <form onSubmit={submit} className="form-stack"><label>Full name<input name="name" value={form.name} onChange={update} placeholder="Your full name" required /></label><label>Student ID<input name="studentId" value={form.studentId} onChange={update} placeholder="e.g. CSE2026001" required /></label><label>Email address<input type="email" name="email" value={form.email} onChange={update} placeholder="you@college.edu" required /></label><div className="two-fields"><label>Password<input type="password" name="password" value={form.password} onChange={update} placeholder="At least 6 characters" minLength="6" required /></label><label>Confirm password<input type="password" name="confirmPassword" value={form.confirmPassword} onChange={update} placeholder="Repeat password" minLength="6" required /></label></div><button className="primary-button full-button">Create account <span>→</span></button></form><p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p></div></div></div>;
}
