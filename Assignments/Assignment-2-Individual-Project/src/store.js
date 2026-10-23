const USERS_KEY = 'campushubDemoUsers';
const CURRENT_KEY = 'campushubDemoCurrent';
const RECORDS_KEY = 'campushubDemoRecords';

const initialRecords = [
  { _id: 'demo-1', name: 'Aarav Sharma', studentId: 'DEMO001', email: 'aarav.demo@example.com', course: 'B.Tech', department: 'Computer Science', semester: 'Semester 3' },
  { _id: 'demo-2', name: 'Meera Patel', studentId: 'DEMO002', email: 'meera.demo@example.com', course: 'B.Tech', department: 'Information Technology', semester: 'Semester 4' },
  { _id: 'demo-3', name: 'Rohan Kumar', studentId: 'DEMO003', email: 'rohan.demo@example.com', course: 'B.Tech', department: 'Electronics', semester: 'Semester 2' }
];

export function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
export function saveUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
export function getCurrentUser() {
  const email = localStorage.getItem(CURRENT_KEY);
  return getUsers().find((u) => u.email === email) || null;
}
export function setCurrentUser(email) { localStorage.setItem(CURRENT_KEY, email); }
export function logout() { localStorage.removeItem(CURRENT_KEY); }
export function getRecords() {
  try {
    const saved = localStorage.getItem(RECORDS_KEY);
    if (saved) return JSON.parse(saved);
    localStorage.setItem(RECORDS_KEY, JSON.stringify(initialRecords));
    return initialRecords;
  } catch { return initialRecords; }
}
export function saveRecords(records) { localStorage.setItem(RECORDS_KEY, JSON.stringify(records)); }
export function updateCurrentUser(patch) {
  const current = getCurrentUser();
  if (!current) return null;
  const updated = { ...current, ...patch };
  saveUsers(getUsers().map((u) => u.email === current.email ? updated : u));
  return updated;
}
