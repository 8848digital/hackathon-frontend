import { getCookie, removeCookie } from '@/utils/cookies';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.ENV === 'production' ?  process.env.BASE_URL : 'http://localhost:8002',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window === 'undefined') return config;
    
    // Add auth token to requests if available
    const token = getCookie('token');
    const apiKey = getCookie('api_key');
    
    if (token && apiKey) {
      config.headers.Authorization = `token ${apiKey}:${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window === 'undefined') return Promise.reject(error);
    
    // Handle session timeout or authentication errors
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear cookies on auth errors
      removeCookie('sid');
      removeCookie('token');
      removeCookie('api_key');
      document.cookie = 'full_name=Guest; path=/;';
      
     
    }
    
    return Promise.reject(error);
  }
);

export { axiosInstance };