import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { ToastProvider } from './lib.jsx'
import Layout from './Layout.jsx'

import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Clients from './pages/Clients.jsx'
import NewClient from './pages/NewClient.jsx'
import Invoices from './pages/Invoices.jsx'
import Employees from './pages/Employees.jsx'
import Attendance from './pages/Attendance.jsx'
import Payslips from './pages/Payslips.jsx'

const Guard = () => {
  return localStorage.getItem('auth') ? (
    <Layout />
  ) : (
    <Navigate to="/login" replace />
  )
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<Guard />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/new-clients" element={<NewClient />} />
            <Route path="/new-clients/:id" element={<NewClient />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/payslips" element={<Payslips />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App