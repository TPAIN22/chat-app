import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="sm:px-24 bg-base-200">
    <div className="md:rounded-2xl shadow-lg overflow-y-auto border flex-col lg:flex-row border-base-300 bg-base-100 p-6 min-h-[calc(100vh-9rem)] max-w-7xl my-2 mx-auto flex">
          <Sidebar />

          <div className="flex-1">
            {!selectedUser ? (
              <NoChatSelected />
            ) : (
              <ChatContainer/>
            )}
          </div>
          </div>
    </div>
  );
};

export default HomePage;
