import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar relative">
            <div className="size-10 rounded-full">
              <img src={selectedUser.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt={selectedUser.name} />
              <div className={`size-3 absolute top-0 right-0 bg-emerald-500 rounded-full ${onlineUsers.includes(selectedUser._id) ? "" : "hidden"}`}></div>
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedUser.name}</h3>
            <p className="text-sm text-base-content/70">
              {}
            </p>
          </div>
        </div>
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;