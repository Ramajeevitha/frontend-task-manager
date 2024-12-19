import axios from "axios";

// Base API configuration
const API = axios.create({
  baseURL: "http://localhost:8000", // Your backend URL
});

// Add authorization token if available
API.interceptors.request.use((req) => {  
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});



export default API;
