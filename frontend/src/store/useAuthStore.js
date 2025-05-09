import { create } from 'zustand'
import axiosInstance from '../lib/axios'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

const BASE_URL =import.meta.env.MODE === "development" ? "http://localhost:5001" : "/"

export const useAuthStore = create((set , get) => ({
    authUser: null,
    isCheckingAuth: true,        
    isLoggingIn: false,         
    isSigningUp: false,
    isUpdatingProfile: false,
    isMenuOpen: false,
    onlineUsers: [],
    socket: null,

    
    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data })
            get().connectSocket()

        } catch (error) {
            console.log(error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({ authUser: res.data })
            toast.success('User created successfully')
            get().connectSocket()

        } catch (error) {
            console.log(error)
            set({ authUser: null })
            toast.error(error.response.data.message)
        } finally {
            set({ isSigningUp: false })
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post('/auth/login', data)
            set({ authUser: res.data })
            toast.success('logged in successfully')
            get().connectSocket()
        } catch (error) {
            console.log(error)
            set({ authUser: null })
            toast.error(error.response.data.message)
        } finally {
            set({ isLoggingIn: false })
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout')
            set({ authUser: null })
            toast.success('logged out successfully')
            get().disconnectSocket()
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
    toggleMenu :() => {
        set((state) => ({ isMenuOpen: !state.isMenuOpen }))
    },
    connectSocket: () => {
        const {authUser} = get()
        if(!authUser || get().socket?.connected ) return

        const socket = io(BASE_URL ,{
            query: {
                userId: authUser._id
            }
        } )
        socket.connect()
        set ({ socket: socket })
        socket.on('onlineUsers' , (users) => set({ onlineUsers: users }))
    },
    disconnectSocket: () => {
        if(get().socket?.connected) return
        socket.disconnect()
    },
}))
