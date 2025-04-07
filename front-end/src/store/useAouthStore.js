import {axiosInstance} from '../lib/axios'
import {create} from 'zustand'
import { toast } from 'react-hot-toast'
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : '/'

export const useAuthStore = create((set , get) => ({
    authUser:null,
    isSigningUp:false,
    isLoginIn:false,
    isUpdatingProfile:false,
    isCheckinAuth:true,
    onlineUsers :[],
    socket:null,


    checkAuth: async () =>{
        set({isCheckinAuth:true})
        try {
            const res = await axiosInstance.get('/auth/check')
            set({authUser:res.data})
            get().connectSocket()

        } catch (error) {
            console.log(error.message)
            console.log("error in checkAuth controler",error)
            set({authUser:null})
        }
        finally{
            set({isCheckinAuth:false})
        }
    },
    signup: async (data) =>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post('/auth/signup',data)
            set({authUser:res.data})
            toast.success('Congratulations you are not gay👌')
            get().connectSocket()

        } catch (error) {
            toast.error(error.response.data.msg)
            set({authUser:null})
        }
        finally{
            set({isSigningUp:false})
        }
    },

    logout: async () => {
        try {
          await axiosInstance.post('/auth/logout');
          set({ authUser: null }); 
          toast.success('If You Didn\'t Come Back You are Gay👌'); 
          get().desConnectSocket()
        } catch (error) {
          console.log("error in logout controller", error); 
          toast.error('faild to logout'); 
        }
      },
      
    login: async (data) => {
        set({isLoginIn:true})
        try {
            const res = await axiosInstance.post('/auth/login',data)
            set({authUser:res.data})
            toast.success('Welcome To The Club👌')
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.msg)
            set({authUser:null})
            toast.error(error.response.data.msg)
        }
        finally{
            set({isLoginIn:false})
        }
    },
    updateProfile: async (data) => {
        set({isUpdatingProfile:true})
        try {
            const res = await axiosInstance.put('/auth/update',data)
            set({authUser:res.data})
            toast.success('Profile Updated Successfully👌')
        } catch (error) {
            console.log("error in updateProfile controler",error.response.data.message)
            toast.error(error.response.data.msg)
        }
        finally{
            set({isUpdatingProfile:false})
        }
    },
    connectSocket: () => {
        const {authUser} = get()
        if(!authUser || get().socket?.connected ) return

        const socket = io(BASE_URL , {
            query: {
                userId: authUser._id
            }
        })
        socket.connect()
        set({socket:socket})
        socket.on('onlineUsers' , (onlineUsers) => {
            set({onlineUsers:onlineUsers})
        })
    },
    desConnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect()
    }
}))

