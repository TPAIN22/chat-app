import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { Sidebar } from '../components/Sidebar'
import { NoChatSelected } from '../components/NoChatSelected'
import { ChatContainor } from '../components/ChatContainor'

function Home() {
  const { selectedUser } = useChatStore()

  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-10 px-4'>
        <div className='bg-base-100 p-2 rounded-3xl shadow-xl w-full max-w-4xl h-[calc(100vh-10rem)] overflow-y-auto'>
          <div className='flex h-full rounded-3xl overflow-hidden'>
            <Sidebar />
            {!selectedUser?._id ? (
              <NoChatSelected />
            ) : (
              <ChatContainor />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
