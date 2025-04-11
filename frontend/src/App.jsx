import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import {Navigate, Route , Routes} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Settengs from './pages/Settengs'
import { useAuthStore } from './store/useAuthStore'
import { LoaderCircle } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'

 const App = () => {
  const {authUser ,checkAuth , isCheckingAuth , onlineUsers} = useAuthStore()
  useEffect(() => {checkAuth()}, [checkAuth])
  const {theme} = useThemeStore()
  if(isCheckingAuth) return (<div className='flex justify-center items-center h-screen'>
    <LoaderCircle className='animate-spin size-12'/>
  </div>)
  return (
    <div data-theme={theme} className='min-h-screen bg-base-200'>
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser?<Home/>:<Navigate to="/login"/>}/>
        <Route path="/login" element={authUser?<Home/>:<Login/>}/>
        <Route path="/signup" element={authUser?<Home/>:<Signup/>}/>
        <Route path="/profile" element={authUser?<Profile/>:<Navigate to="/login"/>}/>
        <Route path="/settings" element={<Settengs/>}/>
      </Routes>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>

    </div>
  )
}
export default App
