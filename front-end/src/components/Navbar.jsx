import { CircleUserIcon, LucideLogOut, MessageSquare, Settings } from 'lucide-react'
import React from 'react'
import { useAuthStore } from '../store/useAouthStore'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const { authUser, logout } = useAuthStore()
  const navigate = useNavigate()
  return (
    <div className='sm:flex grid items-center justify-between py-2 px-10 md:px-20'>
      <button
        type='button'
        className='flex items-center gap-2 hover:cursor-pointer'
        onClick={() => navigate('/Home')}
      >
        <MessageSquare size={50} />
        <p>👌OnlyFriends👌</p>
      </button>

      <div className='flex items-center gap-8'>
        {authUser && (
          <button
            type='button'
            onClick={() => navigate('/profile')}
            className='flex items-center gap-2 text-muted-foreground hover:text-muted hover:cursor-pointer'
          >
            Profile
            <CircleUserIcon size={20} />
          </button>
        )}
        <button
          type='button'
          onClick={() => navigate('/settings')}
          className='flex items-center gap-2 text-muted-foreground hover:text-muted hover:cursor-pointer'
        >
          Settings
          <Settings size={20} />
        </button>

        {authUser && (
          <button
            type='button'
            onClick={() => { logout(); navigate('/Login'); }}
            className='flex items-center gap-2 text-red-400 cursor-pointer hover:text-red-200 hover:cursor-pointer'
          >
            Log Out
            <LucideLogOut size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
