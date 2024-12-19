import axios from "axios";

// Use environment variables for the base URL and token
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"; // Default to localhost if no environment variable is set

// Base API configuration
const API = axios.create({
  baseURL: API_URL, // Use the base URL from the environment variable
  timeout: 5000, // Optional: Set a timeout for requests (in ms)
  headers: {
    "Content-Type": "application/json", // Ensure the content type is always set to JSON
  },
});

// Add authorization token if available
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`; // Add token to Authorization header
    }
    return req;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors here
  }
);

// Optional: Add response interceptor to handle responses globally
API.interceptors.response.use(
  (response) => {
    // Optionally, you can manipulate the response before returning it
    return response;
  },
  (error) => {
    // Handle different error statuses globally
    if (error.response) {
      if (error.response.status === 401) {
        console.log("Unauthorized, please log in again.");
        // Optionally clear localStorage or redirect the user to login
        localStorage.removeItem("token");
        window.location.href = "/login"; // Example redirection to login
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    }
    return Promise.reject(error); // Return error if it's not handled above
  }
);

export default API;
