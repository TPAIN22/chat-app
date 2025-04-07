import React from "react";
import { Camera, Mail, User } from "lucide-react";
import { useAuthStore } from "../store/useAouthStore";

function Profile() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const dateOnly = authUser.createdAt.split("T")[0];
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleProfileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(selectedFile);

    fileReader.onload = async () => {
      const base64Image = fileReader.result;
      setSelectedImage(base64Image);
      await updateProfile({ avatar: base64Image });
    };
  };

  return (
    <div className="w-full bg-base-200 h-screen space-y-4 pt-10">
      <div className="flex items-center justify-center flex-col m-auto space-y-8 max-w-4/8 bg-base-100 p-10 rounded-xl">
        <label
          htmlFor="profile-pic"
          className="size-30 border border-gray-400 rounded-full relative cursor-pointer"
        >
          <img
            src={selectedImage || authUser.avatar}
            alt="avatar"
            className="rounded-full size-30 border border-base-100"
          />
          <Camera className="absolute bottom-0 right-0 bg-base-100 border border-gray-400 size-9 p-1 rounded-full" />
          <input
            type="file"
            id="profile-pic"
            className="hidden"
            accept="image/*"
            onChange={handleProfileChange}
            disabled={isUpdatingProfile}
          />
        </label>
        <p>click the camera to change your profile pic</p>
        <div className="w-full min-w-[200px] space-y-2">
          <p className="pl-2 text-sm">name</p>
          <div className="border border-gray-400 p-2 pl-10 flex items-center rounded-md w-full min-w-[200px] relative">
            <User className="absolute pl-2 left-0 size-9 p-1 rounded-full" />
            <p className="text-sm">{authUser.name}</p>
          </div>
          <div className="border border-gray-400 p-2 pl-10 flex items-center rounded-md w-full min-w-[200px] relative">
            <Mail className="absolute pl-2 left-0 size-9 p-1 rounded-full" />
            <p className="text-sm">{authUser.email}</p>
          </div>
        </div>
        <div className="w-full min-w-[200px] space-y-6">
          <div className="text-2xl font-bold space-y-2">
            <h2> Acount Info </h2>
            <hr className="border-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="w-full flex items-center justify-between ">
              <p>Member since</p>
              <p>{dateOnly}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p>Acount Status</p>
              <p>Active✅</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
