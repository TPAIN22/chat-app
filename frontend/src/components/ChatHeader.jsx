import { ArrowLeft, EllipsisVertical, PhoneIcon, VideoIcon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser , taggleDropdown } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  return (
    <div className="border-b border-base-300 w-full px-4 md:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {setSelectedUser(null);
              taggleDropdown() }
            }
            className="md:hidden p-1 rounded-full hover:bg-base-200 transition"
          >
            <ArrowLeft className="size-5" />
          </button>

          <div className="relative">
            <img
              src={selectedUser.profilePic || "https://api.dicebear.com/9.x/lorelei/svg"}
              alt="profile"
              className="size-10 md:size-12 rounded-full"
            />
            <span
              className={`${
                onlineUsers.includes(selectedUser._id) ? "block" : "hidden"
              } absolute top-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full`}
            ></span>
          </div>
          <span className="font-semibold text-sm md:text-base">{selectedUser.name}</span>
        </div>

        {/* يمين: أيقونات الاتصال والإعدادات */}
        <div className="flex items-center gap-4 text-base-content/80">
          <VideoIcon className="cursor-pointer size-5 md:size-6" />
          <PhoneIcon className="cursor-pointer size-5 md:size-6" />
          <EllipsisVertical className="cursor-pointer size-5 md:size-6" />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
