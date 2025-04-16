import { useChatStore } from "../store/useChatStore";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatSkeleton from "./ChatSkeleton";
import MessagesContainor from "./MessagesContainor";
import { useEffect } from "react";
const ChatContainer = () => {
  const { isMessageLoading , selectedUser, getMessages, subscribeToMessages, unsubscribeToMessages } = useChatStore();
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeToMessages();
    }
  }, [selectedUser?._id, getMessages]);

  return (
    <div className="bg-base-100 h-screen flex-1 relative">
      <ChatHeader />
      {isMessageLoading ? <ChatSkeleton />:<MessagesContainor/>}
      <div className={`${selectedUser ? "block" : "hidden"}`}>
      <ChatInput />
      </div>
    </div>
  );
};
export default ChatContainer;
