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
    <div className="w-full min-h-screen flex py-4 px-6">
        settings
    </div>
  )
};

export default Settings;
