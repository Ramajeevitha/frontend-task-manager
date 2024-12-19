import React, { useState, useEffect } from "react";
import axios from "axios";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import './app.css'; // Import the CSS file

const App = () => {
  const [user, setUser] = useState(null); // Store logged-in user data
  const [tasks, setTasks] = useState([]); // Store tasks
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Check if user is authenticated
  const [token, setToken] = useState(null); // Store authentication token

  // Fetch tasks when user is authenticated
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (isAuthenticated && token) {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTasks(response.data.tasks); // Store tasks from the API
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.response?.data?.message || error.message);
      }
    };

    fetchTasks();
  }, [isAuthenticated, token]);

  // Handle user login
  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);

    // Optionally save the token to localStorage
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Check localStorage for user session on initial load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>

      {/* Display login and register forms if user is not authenticated */}
      {!isAuthenticated ? (
        <>
          <h2>Login</h2>
          <LoginForm onLogin={handleLogin} />

          <h2>Register</h2>
          <RegisterForm />
        </>
      ) : (
        <>
          <h2>Welcome, {user?.name || "User"}</h2>
          <button onClick={handleLogout}>Logout</button>

          {/* TaskForm for creating new tasks */}
          <TaskForm
            token={token}
            onTaskCreated={(newTask) => setTasks((prevTasks) => [...prevTasks, newTask])}
          />

          {/* Display list of tasks */}
          <h2>Your Tasks</h2>
          <TaskList tasks={tasks} />
        </>
      )}
    </div>
  );
};

export default App;
