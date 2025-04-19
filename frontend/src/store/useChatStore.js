import {create} from 'zustand'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'
import {useAuthStore} from './useAuthStore'

export const useChatStore = create((set , get) => ({
    messages: [],
    users: [],
    isMessageLoading: false,
    selectedUser: null,
    isUsersLoading: false,
    isDropdownOpen: true,

    taggleDropdown: () => set({ isDropdownOpen: !get().isDropdownOpen }),


    getUsers: async () => {
      set({ isUsersLoading: true });
      
    
      try {
        const res = await axiosInstance.get("/message/users");
        const users = res.data;
        const { authUser } = useAuthStore.getState();
    
        const fetchUserMessages = async (userId) => {
          try {
            const res = await axiosInstance.get(`/message/${userId}`);
            const allMessages = res.data;
    
            const relevantMessages = allMessages.filter(
              (msg) =>
                (msg.senderId === authUser._id && msg.receiverId === userId) ||
                (msg.senderId === userId && msg.receiverId === authUser._id)
            );
    
            return relevantMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] || null;
          } catch (error) {
            console.error("Error fetching messages:", error);
            return null;
          }
        };
    
        const usersWithLastMessages = await Promise.all(
          users.map(async (user) => {
            const lastMessage = await fetchUserMessages(user._id);
            return { ...user, lastMessage };
          })
        );
    
        usersWithLastMessages.sort((a, b) => {
          if (!a.lastMessage && !b.lastMessage) return 0;
          if (!a.lastMessage) return 1;
          if (!b.lastMessage) return -1;
          return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt);
        });
    
        set({ users: usersWithLastMessages });
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
        toast.error(error.response?.data?.message || "Something went wrong");
      } finally {
        set({ isUsersLoading: false });
      }
    }
    ,      
    

   getMessages: async (userId) => {
    if (!userId) return
    try {
      set({ isMessageLoading: true });
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
      console.log("🚀 [getMessages] Fetched messages:", res.data);
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally {
      set({ isMessageLoading: false });
    }
   },







    sendMessage: async (messageData) => {
        const { selectedUser, messages, users } = get();
        try {
          const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
          const newMessage = res.data;
      
          set({ messages: [...messages, newMessage] });
      
          const updatedUsers = [...users];
          const index = updatedUsers.findIndex(user => user._id === selectedUser._id);
      
          if (index !== -1) {
            const [movedUser] = updatedUsers.splice(index, 1);
            updatedUsers.unshift(movedUser); 
            set({ users: updatedUsers });
          }
      
        } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong");
        }
      },
      

      subscribeToMessages: () => {
        const { selectedUser, users } = get();
        const socket = useAuthStore.getState().socket;
      
        if (!socket) return;
      
        socket.on("newMessage", (newMessage) => {
          const messages = useChatStore.getState().messages;    
          const isCurrentChat =
            selectedUser &&
            (newMessage.senderId === selectedUser._id ||
              newMessage.receiverId === selectedUser._id);
        
          if (isCurrentChat) {
            useChatStore.setState({ messages: [...messages, newMessage] });
          }
          const updatedUsers = [...users];
          const userIndex = updatedUsers.findIndex(
            (user) =>
              user._id === newMessage.senderId || user._id === newMessage.receiverId
          );
        
          if (userIndex !== -1) {
            const [movedUser] = updatedUsers.splice(userIndex, 1);
        
            const updatedUser = {
              ...movedUser,
              lastMessage: newMessage, 
            };
        
            updatedUsers.unshift(updatedUser);
            useChatStore.setState({ users: updatedUsers });
          }
        });
        
      },
      unsubscribeToMessages: () => {
            const socket = useAuthStore.getState().socket
            socket.off('newMessage')
      },
      
    setSelectedUser: (user) => set({ selectedUser: user }),

}))