import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, selectedUser } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      let base64 = "";
      if (imagePreview) {
        const file = fileInputRef.current?.files[0];
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        if (file) {
          const compressedFile = await imageCompression(file, options);
          base64 = await imageCompression.getDataUrlFromFile(compressedFile);
        }
      }

      await sendMessage({
        message: text.trim(),
        image: base64,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!selectedUser) return null;

  return (
    <div className="w-full bg-base-100 px-2 sm:px-4 py-2 absolute bottom-0">
      {imagePreview && (
        <div className="mb-2 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-base-300"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-sm sm:input-md input-bordered border-base-200 rounded-lg text-sm sm:text-base"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`btn btn-sm sm:btn-md btn-circle ${
              imagePreview ? "text-emerald-500" : "text-base-content/50"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={18} />
          </button>
        </div>
        <button
          type="submit"
          className={`btn btn-sm sm:btn-md btn-circle ${
            imagePreview || text ? "text-emerald-500" : "text-base-content/50"
          }`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
