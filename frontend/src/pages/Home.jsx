import { Sidebar } from "lucide-react";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  return (
    <div className="h-screen w-full bg-base-100">
      <Sidebar/>
      <ChatContainer/>
    </div>
  );
};

export default HomePage;
