import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect, useRef ,useState } from 'react';
import { saveAs } from 'file-saver';


const MessagesContainor = () => {
  const { messages , selectedUser ,taggleDropdown , isDropdownOpen } = useChatStore();
  const { authUser } = useAuthStore();
  const [previewImages, setPreviewImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='max-h-[calc(100vh-8rem)] md:p-30  bg-base-100 overflow-y-auto '>
      {messages.map((message) => (
        <div key={message._id} className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              <img
                src={
                  message.senderId === authUser._id
                    ? authUser.profilePic || 'vite.svg'
                    : selectedUser?.profilePic || 'https://api.dicebear.com/9.x/lorelei/svg'
                }
                alt=""
              />
            </div>
          </div>

          <div className="chat-header mb-1">{ message.senderId === authUser._id ? 'you' : selectedUser?.name }</div>

          <div  ref={messagesEndRef}
          className={`${message.senderId === authUser._id ? 'bg-primary/80 text-secondary' : 'bg-base-200 text-base-content'} chat-bubble p-2`} >{message.message}{message.image && (
            <img
              className='w-50 h-30 cursor-pointer'
              src={message.image}
              alt=""
              onClick={() => {
                const images = Array.isArray(message.image) ? message.image : [message.image];
                setPreviewImages(images);
                setCurrentIndex(images.indexOf(message.image));
              }}
              
            />
          )}
          
          </div>
        </div>
      ))}
     {previewImages.length > 0 && (
  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in"
    onClick={() => {
      setPreviewImages([]);
      setCurrentIndex(0);
    }}
  >
    <button
      onClick={() => {
        setPreviewImages([]);
        setCurrentIndex(0);
      }}
      className="absolute top-4 right-4 text-white text-3xl font-bold z-50 hover:text-red-400 transition"
    >
      &times;
    </button>


<button
  onClick={(e) => {
    e.stopPropagation();
    const imageUrl = previewImages[currentIndex];

    saveAs(imageUrl, `image-${Date.now()}.jpg`);
  }}
  className="absolute top-4 left-4 text-base-content text-xl z-50 bg-base-100 px-4 py-1 rounded "
>
  تحميل
</button>



    {/* زر سابق */}
    {previewImages.length > 1 && currentIndex > 0 && (
      <button
        className="absolute left-4 text-base-content text-4xl z-50 hover:scale-110 transition"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentIndex((prev) => prev - 1);
        }}
      >
        ‹
      </button>
    )}

    {/* الصورة */}
    <img
      src={previewImages[currentIndex]}
      alt="preview"
      className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg transition-transform duration-300 ease-in-out scale-100 hover:scale-105"
      onClick={(e) => e.stopPropagation()}
    />

    {/* زر التالي */}
    {previewImages.length > 1 && currentIndex < previewImages.length - 1 && (
      <button
        className="absolute right-4 text-white text-4xl z-50 hover:scale-110 transition"
        onClick={(e) => {
          e.stopPropagation();
          setCurrentIndex((prev) => prev + 1);
        }}
      >
        ›
      </button>
    )}
  </div>
)}


    </div>
    
  );
};

export default MessagesContainor;
