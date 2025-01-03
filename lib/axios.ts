import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Include cookies automatically
  headers: {
    "Content-Type": "application/json",
  },
});

// Use async/await for the request interceptor
apiClient.interceptors.request.use(async (config) => {
  const session = await getSession(); // Corrected the method call
  const token = session?.accessToken; // Use optional chaining to avoid errors if session is null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Removed the extra dot
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) { // Use optional chaining for safety
      toast.error("Session expired. Redirecting to login...");
       signOut();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
