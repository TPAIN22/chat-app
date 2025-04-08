import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === 'development' 
        ? 'http://localhost:5001/api' 
        : `${window.location.origin}/api`,  // في بيئة الإنتاج يستخدم الـ origin الخاص بالموقع
    withCredentials: true,
});
