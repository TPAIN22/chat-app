import { useChatStore } from "../store/useChatStore";
import ChatInput from "./ChatInput";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatSkeleton from "./ChatSkeleton";
import { useAuthStore } from "../store/useAuthStore";
const ChatContainer = () => {
  const { selectedUser, messages,subscribeToMessages , unsubscribeToMessages , isMessageLoading, getMessages } =
    useChatStore();
  const { authUser } = useAuthStore();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeToMessages();
    }
  }, [selectedUser._id, getMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  if (isMessageLoading)
    return (
      <div className="flex flex-col h-full bg-base-100 rounded-2xl shadow-[0_0_12px_rgba(0,0,0,0.15)]">
        <ChatHeader />
        <ChatSkeleton />
        <ChatInput />
      </div>
    );
  return (
    <div className="flex flex-col overflow-auto max-h-[calc(100vh-8rem)] relative h-full bg-base-100 rounded-2xl shadow-[0_0_12px_rgba(0,0,0,0.15)]">
      <ChatHeader />
      <div className="min-h-[calc(100vh-18rem)] w-full bg-base-100 p-4 overflow-y-auto shadow-[0_0_12px_rgba(0,0,0,0.15)] rounded-2xl">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="profile picture"
              className="w-24 h-24 rounded-full"
            />
            <h2 className="text-2xl font-bold">Start conversation!</h2>
          </div>
        )}
        {messages &&
          messages.map((msg) => (
            <div key={msg._id} >
              <div
                className={`chat ${
                  msg.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
                ref={scrollRef}
              >
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full">
                    <img
                      src={
                        authUser._id === msg.senderId
                          ? authUser.profilePic ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          : selectedUser.profilePic ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="profile picture"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {msg.senderId === authUser._id ? "You" : selectedUser.name}
                </div>
                <div className="chat-bubble p-2 flex flex-col items-end">
                  {msg.image && <img src={msg.image} className="size-28"/>}
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="sticky bottom-0">
        <ChatInput />
      </div>
    </div>
  );
};
export default ChatContainer;

