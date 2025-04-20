import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Link } from "react-router-dom";
import { ArrowLeft, Sun, Moon, Save, Image } from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Switch } from "@radix-ui/react-switch";
const Settings = () => {
  const { authUser, updateProfile } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const { taggleDropdown } = useChatStore();
  const fileInputRef = useRef(null);
  const [profilePic, setProfilePic] = useState(authUser.profilePic);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    await updateProfile({ profilePic });
  };

  return (
    <div className="w-full h-screen bg-base-100 p-4">
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="btn btn-sm btn-outline flex items-center lg:hidden"
        >
          <ArrowLeft className="mr-1 size-4" 
          onClick={() => setTimeout(() => taggleDropdown(), 50)}/>
          Back
        </Link>
        <Switch
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        >
          <Sun className="size-4" />
          <Moon className="size-4" />
        </Switch>
      </div>

      <div className="bg-base-100 rounded-xl shadow p-6 max-w-lg mx-auto space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={profilePic || "vite.svg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-base-100 rounded-full text-xs px-2 py-1 "
            >
              <Image className="size-5 md:size-6 rounded-full" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div>
          <label className="label-text pl-2">Name</label>
          <input
            className="input input-bordered w-full bg-base-200 cursor-not-allowed"
            type="text"
            value={authUser.name}
            disabled
          />
        </div>

        <div>
          <label className="label-text pl-2">Email</label>
          <input
            className="input input-bordered w-full bg-base-200 cursor-not-allowed"
            type="text"
            value={authUser.email}
            disabled
          />
        </div>

        <div className="text-center">
          <button onClick={handleSave} className="btn btn-sm btn-soft">
            <Save className="size-4 mr-1" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
