import { useEffect , useRef} from "react";
import { useChatStore } from "../store/useChatStore";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { ChatSkeleton } from "./skeletons/ChatSkeleton";
import { useAuthStore } from "../store/useAouthStore";
export const ChatContainor = () => {
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const { messages, isMessegesLoading, subscribeToMessages ,unsubscribeToMessages,selectedUser, getMessages } =
    useChatStore();
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();

      return () => unsubscribeToMessages();
    }
  }, [selectedUser?._id, getMessages ,subscribeToMessages,unsubscribeToMessages]);
  useEffect(() => {
    if (messageEndRef.current && messages)
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  } , [messages]);
  if (isMessegesLoading)
    return (
      <div className="flex flex-col flex-1 overflow-y-auto ">
        <ChatHeader />
        <ChatSkeleton />
        <MessageInput />
      </div>
    );
  return (
    <div className="flex flex-col flex-1 min-h-full overflow-y-auto">
      <ChatHeader />

      <div className="flex-1 flex flex-col overflow-auto p-4 px-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.myId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref = {messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.myId === authUser._id
                      ? authUser.avatar || "/images/avatar.png"
                      : selectedUser.avatar || "/images/avatar.png"
                  }
                />
              </div>
            </div>

            <div className={`chat-bubble max-w-xs break-words ${
              message.myId === authUser._id ? "bg-primary text-base-300" : "bg-base-300 text-primary"
            }`}>
              {message.image && (
                <img
                  src={message.image}
                  alt="Message"
                  className="rounded object-fit max-w-[200px] max-h-[200px]"
                />
              )}
             {message.text && <p>{message.text}</p>}
            </div>

            <div className="chat-footer opacity-50 text-xs mt-1">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, 
              })}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
