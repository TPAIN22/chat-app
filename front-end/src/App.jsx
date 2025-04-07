
import  {Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import LogIn from './pages/LogIn.jsx'
import Profile from './pages/Profile.jsx'
import Navbar from './components/Navbar.jsx'
import { useAuthStore } from './store/useAouthStore.js'
import { useEffect } from 'react'
import Settings from './pages/Settings.jsx'
import { LoaderCircle } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'
function App() {
  const {authUser, checkAuth ,isCheckinAuth ,onlineUsers} = useAuthStore()
  const{theme} = useThemeStore()
    useEffect(() => {checkAuth()},[])
    if(isCheckinAuth && !authUser) return (<div className='h-screen flex items-center justify-center'>
      <LoaderCircle className='animate-spin size-15'/>
    </div>)
  return (
    <div data-theme={theme}>
    <Navbar/>
    <Routes>
      <Route path='/' element={authUser ?  <Home/>: <LogIn/> } />
      <Route path='/signup' element={!authUser ? <SignUp/> : <Navigate to="/"/>}/>
      <Route path='/login' element={!authUser ? <LogIn/> : <Navigate to="/"/>}/>
      <Route path='/profile' element={authUser ? <Profile/>: <LogIn/>}/>
      <Route path='/settings' element={<Settings/>}/> 
      <Route path='/Home' element={authUser ?  <Home/>: <LogIn/> }/>
    </Routes>
    <div><Toaster
     position="top-left"
    reverseOrder={true}/></div>
    </div>
  )
}

export default App
