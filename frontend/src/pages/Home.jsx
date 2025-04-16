import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
 return (
    <div className="h-[100dvh] flex items-center w-full">
      <ChatContainer/>
    </div>
  );
};
export default HomePage;
