import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect, useRef } from 'react';

const MessagesContainor = () => {
  const { messages , selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div className='max-h-[calc(100vh-8rem)] p-30 bg-base-100 overflow-y-auto '>
      {messages.map((message) => (
        <div key={message._id} className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || 'vite.svg'
                    : selectedUser?.profilePic || 'https://api.dicebear.com/9.x/lorelei/svg'
                }
                alt=""
              />
            </div>
          </div>

          <div className="chat-header mb-1">{ message.senderId === authUser._id ? 'you' : selectedUser?.name }</div>

          <div  ref={messagesEndRef}
          className={`${message.senderId === authUser._id ? 'bg-primary/80 text-secondary' : 'bg-base-200 text-base-content'} chat-bubble p-2`} >{message.message}</div>
        </div>
      ))}
    </div>
  );
};

export default MessagesContainor;
