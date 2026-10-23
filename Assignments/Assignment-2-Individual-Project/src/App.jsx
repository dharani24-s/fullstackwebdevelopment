import { Navigate, Route, Routes } from 'react-router-dom';
import { getCurrentUser } from './store';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Records from './pages/Records';

function HomeRedirect() {
  return <Navigate to={getCurrentUser() ? '/dashboard' : '/login'} replace />;
}

export default function App() {
  return <Routes>
    <Route path="/" element={<HomeRedirect />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/records" element={<Records />} />
      </Route>
    </Route>
    <Route path="*" element={<HomeRedirect />} />
  </Routes>;
}
