import { useState, useEffect, use } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { LogOutIcon, SettingsIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatTime } from "../lib/date";
import SidebarSkeleton from "./SidebarSkeleton";

const Sidebar = () => {
  const { theme, setTheme } = useThemeStore();
  const {
    users,
    setSelectedUser,
    isUsersLoading,
    messages,
    subscribeToMessages,
    unsubscribeToMessages,
    getMessages,
    getUsers,
    selectedUser,
  } = useChatStore();
  const { onlineUsers, authUser, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
    subscribeToMessages();
    return () => unsubscribeToMessages();
  }, [getUsers]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-base-100 border-r border-base-content/10 md:w-[20%] h-screen w-full overflow-auto relative">
      {/* Search Input */}
      <div className="p-2 sticky top-0 z-10 bg-base-100 border-b border-base-content/10">
        <input
          type="text"
          placeholder="Search users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full input input-sm bg-base-200 input-bordered"
        />
      </div>

      {/* Users List */}
      {isUsersLoading ? (
        <SidebarSkeleton />
      ) : (
        <ul className="space-y-2 w-full list-none pb-28">
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className={`flex items-center gap-3 p-2 ml-2 cursor-pointer hover:bg-base-300 ${
                selectedUser?._id === user._id ? "bg-base-300" : ""
              }`}
              onClick={() => {
                setSelectedUser(user);
                getMessages(user._id);
              }}
            >
              <div className="w-10 h-10 rounded-full relative">
                <img
                  src={
                    user.profilePic ||
                    "https://api.dicebear.com/9.x/lorelei/svg"
                  }
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <span
                  className={`${
                    onlineUsers.includes(user._id) ? "block" : "hidden"
                  } absolute top-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full`}
                ></span>
              </div>
              <div className="flex justify-between w-full items-center text-base-content/90">
                <div className="ml-2 w-full">
                  <div className="font-semibold md:text-sm lg:text-md flex items-center justify-between w-full">
                    <p>{user.name}</p>
                    <p className="text-xs text-base-content/50">
                      {user.lastMessage &&
                        formatTime(user.lastMessage.createdAt)}
                    </p>
                  </div>
                  <p className="text-xs mt-2 line-clamp-2">
                    {user.lastMessage?.message || ""}{" "}
                    {user.lastMessage?.senderId === authUser._id && "(You)"}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* User Info Section (bottom) */}
      <div className="sticky bottom-0 z-10 bg-base-100 border-t border-base-content/10 px-4 py-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={authUser.profilePic || "vite.svg"}
                alt=""
                className="size-12 rounded-full"
              />
              <span
                className={`${
                  onlineUsers.includes(authUser._id) ? "block" : "hidden"
                } absolute top-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full`}
              ></span>
            </div>
            <div className="ml-2">
              <p className="font-semibold md:text-sm lg:text-lg">
                {authUser.name}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer text-base-content/90">
              <SettingsIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={logout}>
                Log out
                <LogOutIcon className="ml-1 text-destructive size-4" />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <p
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")} >
                  {theme === "light" ? "Dark Mode" : " Light Mode"}
                </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
