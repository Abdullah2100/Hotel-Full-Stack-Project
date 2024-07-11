/* eslint-disable no-unexpected-multiline */
import './App.css'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Dashboard from './app/app/Dashboard'
import Profile from './app/app/Profile'
import Login from './app/auth/Login'
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import Department from './app/app/Department'
import RoomType from './app/app/RoomType'
// import Dashboard from './pages/dashboard/Dashboard'
function App() {
  const isAuthenticated = useIsAuthenticated();
  return (


    <BrowserRouter>
      <Routes >

        <Route path='*' element={<Navigate to="/dashboard" />} />


        <Route element={<AuthOutlet fallbackPath='/auth/login' />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/department' element={<Department />} />
          <Route path='/roomType' element={<RoomType />} />
        </Route>

        <Route path="/auth/login" element={

          !isAuthenticated ?
            <Login /> : <Navigate to="/dashboard" />

        } />
      </Routes>
    </BrowserRouter>

  )
}

export default App
