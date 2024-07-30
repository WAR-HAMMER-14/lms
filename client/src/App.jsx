import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import DashboardStudent from './components/DashboardStudent'
import AdminLogin from './components/admin/AdminLogin'
import Header from './components/include/Header'
import Logout from './components/Logout'
import DashboardAdmin from './components/admin/DashboardAdmin'
import AdminCourses from './components/admin/AdminCourses'
import CourseAddEdit from './components/admin/CourseAddEdit'

function App() {

  return (
    <>
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path='/admin' element={<AdminLogin />} />
				<Route path="/dashboard" element={<DashboardStudent />} />
				<Route path='/adminDashboard' element={<DashboardAdmin />} />
				<Route path='/logout' element={<Logout />} />
				<Route path='/adminCourses' element={<AdminCourses />} />
				<Route path='/courseEdit/:course_id' element={<CourseAddEdit />} />
				<Route path='*' element={<h1>404</h1>} />
			</Routes>
		</BrowserRouter>
    </>
  )
}

export default App
