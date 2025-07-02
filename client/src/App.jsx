import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/signup'
import Home from './pages/home'
import { ProtectedRoute, PublicRoute } from './Components/protectedRoutes'

function App() {
  return (
   <Routes>
    <Route  path='/signup' element={   <PublicRoute><Signup/></PublicRoute>     } />
    <Route path='/login' element={ <PublicRoute> <Login/></PublicRoute> } />
    <Route path='/home' element={ <ProtectedRoute> <Home /></ProtectedRoute>    } />
        <Route path='*' element={ <Navigate to="/login" />  } />
   </Routes>
  )
}

export default App
