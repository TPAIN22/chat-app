import { use, useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { UserSkeleton } from "./skeletons/UserSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAouthStore";

export const Sidebar = () => {
  const { getUsers, users, selectedUSer, setSelectedUser, isUSerLoading  } = useChatStore();
  const {onlineUsers} = useAuthStore()
  const [showOnlineUsers, setShowOnlineUsers] = useState(true);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineUsers ? users.filter((user) => onlineUsers.includes(user._id)) : users

  if (isUSerLoading)
    return (
      <div>
        <UserSkeleton />
      </div>
    );
  return (
    <aside
      className="h-full w-16 lg:w-72 border-r overflow-auto border-base-300 
    flex flex-col transition-all duration-200"
    >
      <div
        className="w-full p-5"
      >
        <div className="flex items-center gap-2 border-b border-base-300 pb-5">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block ">Contacts</span>
          {/* to do online users taggle*/}
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2">
              <input 
              className="checkbox checkbox-sm"
              type="checkbox" checked={showOnlineUsers} onChange={(e) => setShowOnlineUsers(e.target.checked)}/>
              <span className="text-xs text-base-content ">({onlineUsers.length -1} Online)</span>

            </label>
            
          </div>
        </div>
        <div className="overflow-y-auto w-full py-3">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-100 transition-colors
            ${selectedUSer?._id === user._id && "bg-base-100"}`}
               onClick={() => setSelectedUser(user)}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.avatar || "/images/avatar.png"}
                  className="size-12 rounded-full "
                />
                {onlineUsers.includes(user._id) && (
                  <div className="absolute w-3 h-3 bg-green-400 rounded-full right-1 top-1"></div>
                )}
              </div>
              <div className="hidden lg:block text-left min-w-0 flex-1">
                <div className="font-medium text-sm truncate">{user.name}</div>
                <div className="text-xs font-light text-base-content/60 truncate">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}
          
        </div>
      </div>
    </aside>
  );
};
