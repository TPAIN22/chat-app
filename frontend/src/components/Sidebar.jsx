import React, { useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { users, setSelectedUser, isUsersLoading, getUsers, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <div className="lg:max-w-xs lg:max-h-[calc(100vh-9rem)] w-full bg-base-100 p-0 lg:p-4 lg:overflow-y-scroll overflow-x-scroll lg:overflow-x-scroll lg:mr-6 md:shadow-[0_0_12px_rgba(0,0,0,0.15)] rounded-2xl">
      <h2 className="text-lg hidden lg:block font-semibold mb-4 text-base-content">Users</h2>
      
      {/* حقل البحث */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="input input-bordered w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ul className={`space-y-2 lg:flex-col ${searchQuery.length === 0 && selectedUser ? "hidden" : "flex"}`}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li
              key={user._id}
              className={`flex flex-col lg:flex-row items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors
                ${selectedUser?._id === user._id
                  ? "bg-base-300 text-secondary-content"
                  : "hover:bg-base-300"
                }`}
                onClick={() => {
                  setSelectedUser(user);
                  setSearchQuery("");
                }}                            >
              <div className="relative">
                <div className={`size-3 absolute top-0 right-0 bg-emerald-500 rounded-full ${onlineUsers.includes(user._id) ? "" : "hidden"}`}></div>
                <img
                  src={user.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <span className="font-medium text-base-content">
                {user.name.split(" ")[0]}
              </span>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No users found</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
