import { EllipsisVertical, Phone, PhoneIcon, VideoIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="md:px-8 px-2 border-b border-base-300 w-full">
      {selectedUser && (
        <div className="flex items-center gap-3 w-full">
          <div className="relative">
            <img
              src={selectedUser.profilePic || "https://api.dicebear.com/9.x/lorelei/svg"}
              alt=""
              className="size-12 rounded-full"
            />
            <span
              className={`${
                onlineUsers.includes(selectedUser._id) ? "block" : "hidden"
              } absolute top-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full`}
            ></span>
          </div>
          <div className="flex flex-col justify-between w-full p-6">
            <span className="font-semibold">{selectedUser.name}</span>
          </div>
          <div className="mr-4 flex gap-6 text-base-content/80">
            <VideoIcon className="cursor-pointer size-6"/>
            <PhoneIcon className="cursor-pointer size-6"/>
            <EllipsisVertical className="cursor-pointer size-6"/>
            
          </div>
          </div>
      )}
    </div>
  );
};
export default ChatHeader;