import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, setCurrentUser } from '../store';
import Notice from '../components/Notice';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault(); setError('');
    if (!form.email.trim() || !form.password) return setError('Enter your email and password.');
    const user = getUsers().find((u) => u.email.toLowerCase() === form.email.trim().toLowerCase() && u.password === form.password);
    if (!user) return setError('Invalid email or password. Register a demo account first.');
    setCurrentUser(user.email); navigate('/dashboard', { replace: true });
  };
  return <div className="auth-page"><div className="auth-art"><div className="auth-art-content"><div className="brand brand-light"><span className="brand-mark">C</span><span>CampusHub<small>STUDENT PORTAL</small></span></div><div className="art-copy"><span className="pill">YOUR CAMPUS, CONNECTED</span><h1>Make your<br />student journey<br /><em>count.</em></h1><p>One place for your academic profile, student records, and campus progress.</p></div><div className="art-bottom">Learn · Grow · Achieve</div></div></div>
    <div className="auth-panel"><div className="auth-form-wrap"><div className="mobile-brand brand"><span className="brand-mark">C</span><span>CampusHub<small>STUDENT PORTAL</small></span></div><span className="eyebrow">WELCOME BACK</span><h2>Sign in to your account</h2><p className="muted">Enter your student details to continue.</p><Notice type="error">{error}</Notice>
      <form onSubmit={submit} className="form-stack"><label>Email address<input type="email" name="email" value={form.email} onChange={update} placeholder="you@college.edu" autoComplete="email" required /></label><label>Password<div className="password-wrap"><input type={show ? 'text' : 'password'} name="password" value={form.password} onChange={update} placeholder="Enter your password" autoComplete="current-password" required /><button type="button" className="show-password" onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button></div></label><button className="primary-button full-button">Sign in <span>→</span></button></form>
      <p className="auth-switch">New to CampusHub? <Link to="/register">Create an account</Link></p><p className="tiny-note">Frontend demo: data is saved in this browser only.</p></div></div></div>;
}
