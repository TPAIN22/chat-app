import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAouthStore";

export const useChatStore = create((set , get) => ({
    messages: [],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    getUsers: async () => {
        set({isUsersLoading:true})
        try {
            const res = await axiosInstance.get('/message/users')
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.msg)
        }
        finally{
            set({isUsersLoading:false})
        }
    },
    getMessages: async (userId) => {
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/message/${userId}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response.data.msg)
            set({messages:[]})
        }
        finally{
            set({isMessagesLoading:false})
        }
    },
    sendMessage: async (data) => {
        const {selectedUser , messages} = get()
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,data)
            set({messages:[...messages , res.data]})
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    },
    subscribeToMessages: async () => {
        const {selectedUser} = get()
        if(!selectedUser) return
        const socket = useAuthStore.getState().socket

        socket.on('newMessage' , (data) => {
            const isMessageSentBySelectedUser = data.senderId !== selectedUser._id
            if(isMessageSentBySelectedUser) return
            set({messages:[...get().messages , data]})
        })
    },
    unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket
        socket.off('newMessage')
    },
    setSelectedUser:(selectedUser) => set({selectedUser:selectedUser})
}))