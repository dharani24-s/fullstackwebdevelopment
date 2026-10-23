# Assignment 2: Individual Project - CampusHub (Student Management System)

**Sari Dharani** (A24126552176)

A frontend-only React + Vite app. It needs no Express or MongoDB: accounts and student records are stored in the browser's `localStorage`, so it is a classroom UI demo and not secure authentication. Do not enter real passwords.

## Features
- Login and registration with validation and show/hide password
- Protected routes and a dashboard with student summary cards
- Profile editing
- Student records: add, view, edit, delete and search
- Responsive blue-and-white layout

## Folder layout
```
src/
  index.html, main.jsx   entry point
  App.jsx                routes
  style.css              styles
  store.js               localStorage data layer
  components/            Layout, ProtectedRoute, Notice
  pages/                 Login, Register, Dashboard, Profile, Records
```

## How to run
Node.js 18 or later.
```
cd src
npm install
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173), register an account, then sign in.

## Screenshots
In `screenshots/`: `individual_screenshots.pdf` (all pages) and one PNG per page.
