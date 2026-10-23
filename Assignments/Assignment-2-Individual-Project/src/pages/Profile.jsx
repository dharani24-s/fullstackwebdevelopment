import { useState } from 'react';
import { getCurrentUser, updateCurrentUser } from '../store';
import Notice from '../components/Notice';

export default function Profile() {
  const user = getCurrentUser();
  const [form, setForm] = useState({ name: user.name, course: user.course, department: user.department, semester: user.semester });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault(); setSuccess(''); setError('');
    if (Object.values(form).some((v) => !v.trim())) return setError('Please complete every field.');
    updateCurrentUser(form); setSuccess('Profile updated successfully.');
  };
  return <div><div className="page-heading"><div><span className="eyebrow">PERSONAL INFORMATION</span><h1>My Profile</h1><p>View and update your student details.</p></div></div><Notice type="error">{error}</Notice><Notice>{success}</Notice><div className="profile-layout"><div className="panel profile-summary"><div className="profile-avatar">{user.name.charAt(0).toUpperCase()}</div><h2>{user.name}</h2><p className="muted">{user.studentId}</p><span className="status-pill">● Demo student</span><div className="summary-line"><span>Email</span><strong>{user.email}</strong></div><div className="summary-line"><span>Student ID</span><strong>{user.studentId}</strong></div><p className="tiny-note">Email and student ID cannot be changed in this demo.</p></div><div className="panel profile-edit"><div className="panel-title"><div><span className="eyebrow">EDIT DETAILS</span><h3>Academic profile</h3></div><span className="course-symbol">✎</span></div><form className="form-stack" onSubmit={submit}><label>Full name<input name="name" value={form.name} onChange={update} required /></label><label>Course<input name="course" value={form.course} onChange={update} required /></label><label>Department<input name="department" value={form.department} onChange={update} required /></label><label>Semester<input name="semester" value={form.semester} onChange={update} required /></label><button className="primary-button">Save changes →</button></form></div></div></div>;
}
