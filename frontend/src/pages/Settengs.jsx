import React, { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, User, Send, Loader, LoaderCircle } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constans/index";

const Settings = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const fileInputRef = useRef();
  const PREVIEW_MESSAGES = [
    { id: 1, content: "Hey! How's it going?", isSent: false },
    {
      id: 2,
      content: "I'm doing great! Just working on some new features.",
      isSent: true,
    },
  ];
  const [profilePic, setProfilePic] = useState();
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file?.type?.startsWith("image/")) {
      toast.error("Please select an image file");
    }
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

  return (
    <div className="sm:px-24 text-base-content">
      <div className="bg-base-300 text-primary-content shadow-lg p-8 mt-4  md:rounded-3xl">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-base-content">Settings</h1>
          <p className="text-base-content/70">
            Update your profile information and customize your theme.
          </p>
        </div>

        {/* User Profile Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative size-30  rounded-full">
            <label htmlFor="profilePic" className="cursor-pointer rounded-full">
              <img
                src={
                  authUser?.profilePic ||
                  profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className=" rounded-full size-30"
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
            <LoaderCircle className={`absolute top-0 right-0 animate-spin text-white w-full h-full ${!isUpdatingProfile ? "hidden" : ""}`} />
          </div>

          <div className="flex flex-col items-center gap-4 w-full">
            <div className="input border border-base-content/20 rounded-lg relative pl-4 text-base-content">
              <User
                size={20}
                className="absolute top-3 right-3 text-base-content/50"
              />
              {authUser?.name || "Username"}
            </div>
            <div className="input border border-base-content/20 rounded-lg relative pl-4 text-base-content">
              <Mail
                size={20}
                className="absolute top-3 right-3 text-base-content/50"
              />
              {authUser?.email || "user@example.com"}
            </div>
          </div>
          {/* Preview Section */}

          <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
            <div className="p-4 bg-base-200">
              <div className="max-w-lg ">
                {/* Mock Chat UI */}
                <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                  {/* Chat Header */}
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

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.isSent ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${
                            message.isSent
                              ? "bg-primary text-primary-content"
                              : "bg-base-200"
                          }
                        `}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`
                            text-[10px] mt-1.5
                            ${
                              message.isSent
                                ? "text-primary-content/70"
                                : "text-base-content/70"
                            }
                          `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
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

        {/* Theme Selector Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-base-content mb-4">
            Select Theme
          </h2>
          <div className="flex flex-wrap gap-2">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`group flex flex-col items-center w-fit p-2 rounded-lg transition-colors ${
                  theme === t ? "bg-base-100" : "hover:bg-base-100/50"
                }`}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative w-16 h-10 rounded-md overflow-hidden"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-sm font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
