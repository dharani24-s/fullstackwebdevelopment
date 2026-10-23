import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../store';

export default function Layout() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const leave = () => { logout(); navigate('/login', { replace: true }); };
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">C</span><span>CampusHub<small>STUDENT PORTAL</small></span></div>
      <nav className="nav-links">
        <NavLink to="/dashboard">▦ <span>Dashboard</span></NavLink>
        <NavLink to="/profile">♙ <span>My Profile</span></NavLink>
        <NavLink to="/records">☷ <span>Student Records</span></NavLink>
      </nav>
      <div className="sidebar-bottom"><div className="help-note"><strong>Need help?</strong><p>Contact your college administrator for account support.</p></div><button className="logout-button" onClick={leave}>↪ <span>Log out</span></button></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div><span className="eyebrow">COLLEGE MANAGEMENT</span><h2>Student Portal</h2></div><div className="avatar">{(user?.name || 'S').charAt(0).toUpperCase()}</div></header>
      <div className="page-content"><Outlet /></div><footer className="footer">CampusHub · Student Management System · Frontend demo</footer>
    </main>
  </div>;
}
