import React, { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, User, Send, LoaderCircle, Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const Settings = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const fileInputRef = useRef();
  const [profilePic, setProfilePic] = useState();

  const PREVIEW_MESSAGES = [
    { id: 1, content: "Hey! How's it going?", isSent: false },
    { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
  ];

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith("image/")) return;

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        setProfilePic(reader.result);
        const base64 = reader.result;
        await updateProfile({ profilePic: base64 });
      };
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="sm:px-6 max-w-2xl mx-auto text-base-content">
      <div className="bg-base-300 text-primary-content shadow-lg p-6 mt-4 rounded-2xl flex flex-col gap-6">
        <div className="flex justify-between items-center">
  <div>
    <h1 className="text-2xl font-bold text-base-content">Settings</h1>
    <p className="text-base-content/70 text-sm">
      Update your profile info and switch theme.
    </p>
  </div>

  <label className="flex cursor-pointer gap-2 items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>

    <input
      type="checkbox"
      className="toggle theme-controller"
      onChange={toggleTheme}
    />

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </label>
</div>


        <div className="flex justify-center">
          <div className="relative size-32 rounded-full">
            <label htmlFor="profilePic" className="cursor-pointer">
              <img
                src={
                  authUser?.profilePic ||
                  profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="rounded-full size-32 object-cover"
              />
            </label>
            <input
              type="file"
              id="profilePic"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
              disabled={isUpdatingProfile}
            />
            {isUpdatingProfile && (
              <LoaderCircle className="absolute top-0 right-0 animate-spin text-white w-full h-full" />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center ">
          <div className="input border border-base-content/20 rounded-lg relative pl-4 text-base-content">
            <User size={20} className="absolute top-3 right-3 text-base-content/50" />
            {authUser?.name || "Username"}
          </div>
          <div className="input border border-base-content/20 rounded-lg relative pl-4 text-base-content">
            <Mail size={20} className="absolute top-3 right-3 text-base-content/50" />
            {authUser?.email || "user@example.com"}
          </div>
        </div>

        <div className="rounded-xl border border-base-300 bg-base-100 shadow-lg overflow-hidden">
          <div className="p-4 bg-base-200">
            <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                    J
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">John Doe</h3>
                    <p className="text-xs text-base-content/70">Online</p>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 shadow-sm
                        ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-[10px] mt-1.5 ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}`}>
                        12:00 PM
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-base-300 bg-base-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1 text-sm h-10"
                    placeholder="Type a message..."
                    value="This is a preview"
                    readOnly
                  />
                  <button className="btn btn-primary h-10 min-h-0">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
