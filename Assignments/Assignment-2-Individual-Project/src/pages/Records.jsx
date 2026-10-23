import { useState } from 'react';
import { getRecords, saveRecords } from '../store';
import Notice from '../components/Notice';

const blank = { name: '', studentId: '', email: '', department: '', semester: '', course: 'B.Tech' };

export default function Records() {
  const [students, setStudents] = useState(getRecords());
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const persist = (items) => { setStudents(items); saveRecords(items); };
  const reset = () => { setForm(blank); setEditingId(null); };
  const submit = (e) => {
    e.preventDefault(); setError(''); setSuccess('');
    const duplicate = students.some((s) => s._id !== editingId && (s.studentId.toLowerCase() === form.studentId.trim().toLowerCase() || s.email.toLowerCase() === form.email.trim().toLowerCase()));
    if (duplicate) return setError('A record with that student ID or email already exists.');
    const record = { ...form, name: form.name.trim(), studentId: form.studentId.trim().toUpperCase(), email: form.email.trim().toLowerCase() };
    if (editingId) { persist(students.map((s) => s._id === editingId ? { ...s, ...record } : s)); setSuccess('Student record updated.'); }
    else { persist([...students, { ...record, _id: `${Date.now()}-${Math.random()}` }]); setSuccess('Student record added.'); }
    reset();
  };
  const edit = (s) => { setEditingId(s._id); setForm({ name: s.name, studentId: s.studentId, email: s.email, department: s.department, semester: s.semester, course: s.course || 'B.Tech' }); setError(''); setSuccess(''); window.scrollTo({top:0,behavior:'smooth'}); };
  const remove = (s) => { if (window.confirm(`Delete the record for ${s.name}?`)) { persist(students.filter((item) => item._id !== s._id)); setSuccess('Student record deleted.'); } };
  const filtered = students.filter((s) => `${s.name} ${s.studentId} ${s.department} ${s.email}`.toLowerCase().includes(search.toLowerCase()));

  return <div><div className="page-heading"><div><span className="eyebrow">DIRECTORY</span><h1>Student Records</h1><p>Manage student information in one place.</p></div><span className="record-count">{students.length} records</span></div><Notice type="error">{error}</Notice><Notice>{success}</Notice>
    <div className="records-layout"><section className="panel record-form-panel"><div className="panel-title"><div><span className="eyebrow">{editingId ? 'EDIT EXISTING' : 'ADD TO DIRECTORY'}</span><h3>{editingId ? 'Edit student' : 'Add a student'}</h3></div><span className="course-symbol">{editingId ? '✎' : '+'}</span></div><form className="form-stack" onSubmit={submit}><label>Full name<input name="name" value={form.name} onChange={update} placeholder="Student name" required /></label><label>Student ID<input name="studentId" value={form.studentId} onChange={update} placeholder="e.g. CSE2026001" required /></label><label>Email address<input type="email" name="email" value={form.email} onChange={update} placeholder="student@college.edu" required /></label><label>Department<input name="department" value={form.department} onChange={update} placeholder="Computer Science" required /></label><label>Semester<input name="semester" value={form.semester} onChange={update} placeholder="Semester 3" required /></label><label>Course<input name="course" value={form.course} onChange={update} required /></label><button className="primary-button full-button">{editingId ? 'Save changes' : 'Add student'} →</button>{editingId && <button type="button" className="cancel-button" onClick={reset}>Cancel editing</button>}</form></section>
    <section className="panel table-panel"><div className="table-heading"><div><span className="eyebrow">STUDENT DIRECTORY</span><h3>All students</h3></div><input className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search records…" aria-label="Search student records" /></div><div className="table-scroll"><table><thead><tr><th>Student</th><th>Department</th><th>Semester</th><th>Email</th><th>Actions</th></tr></thead><tbody>{filtered.map((s) => <tr key={s._id}><td><div className="student-cell"><span className="mini-avatar">{s.name.charAt(0).toUpperCase()}</span><span><strong>{s.name}</strong><small>{s.studentId}</small></span></div></td><td>{s.department}</td><td>{s.semester}</td><td>{s.email}</td><td><div className="action-buttons"><button onClick={() => setViewing(s)}>View</button><button onClick={() => edit(s)}>Edit</button><button className="delete-action" onClick={() => remove(s)}>Delete</button></div></td></tr>)}{!filtered.length && <tr><td colSpan="5" className="empty-cell">No matching student records.</td></tr>}</tbody></table></div></section></div>
    {viewing && <div className="modal-backdrop" onClick={() => setViewing(null)}><div className="modal-card" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setViewing(null)} aria-label="Close">×</button><div className="profile-avatar">{viewing.name.charAt(0).toUpperCase()}</div><h2>{viewing.name}</h2><p className="muted">Student record details</p>{[['Student ID',viewing.studentId],['Email',viewing.email],['Course',viewing.course],['Department',viewing.department],['Semester',viewing.semester]].map(([label,value])=><div className="detail-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}<button className="primary-button full-button" onClick={()=>setViewing(null)}>Close</button></div></div>}
  </div>;
}
