import { Image, Send, X } from "lucide-react";
import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { toast } from "react-hot-toast";

export const MessageInput = () => {
  const [text, setText] = useState(""); 
  const [image, setImage] = useState(null); 
  const [isSending, setIsSending] = useState(false); 
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith('image/')) {
      toast.error("Please select a valid image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !image) return;
    if (isSending) return; 

    setIsSending(true);
    try {
      const messageData = { text, image };
      await sendMessage(messageData);
      setText("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.log('Failed to send message:', error);
    } finally {
      setIsSending(false); 
    }
  };

  return (
    <div className="p-4 w-full">
      {image && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={image}
              alt="img"
              className="w-20 h-20 object-cover rounded-md"
            />
            <button
              onClick={removeImage}
              type="button"
              className="absolute top-1.5 right-1.5 text-white bg-base-300"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSend} className="flex items-center gap-2">
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            className="w-full input input-bordered outline-none input-sm sm:input-md"
            placeholder="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex btn btn-circle ${image ? "text-emerald-500" : "text-zinc-400"}`}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          className="btn btn-sm btn-circle size-10"
          type="submit"
          disabled={(!text.trim() && !image) || isSending} 
        >
          {isSending ? (
            <span className="loading loading-spinner size-5"></span>
          ) : (
            <Send size={26} />
          )}
        </button>
      </form>
    </div>
  );
};
