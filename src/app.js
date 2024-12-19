import React, { useState, useEffect } from "react";
import axios from "axios";
import RegisterForm from "./components/registerform";
import LoginForm from "./components/loginform";
import TaskList from "./components/tasklist";
import TaskForm from "./components/taskform";
import './app.css'; // Import the CSS file

const App = () => {
  const [user, setUser] = useState(null); // Store logged-in user data
  const [tasks, setTasks] = useState([]); // Store tasks
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Check if user is authenticated
  const [token, setToken] = useState(null); // Store authentication token

  // Fetch tasks when user is authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      axios.get("https://taskmanagerproject-li8b.onrender.com/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setTasks(response.data.tasks); // Store tasks from the API
        })
        .catch(error => {
          console.error("Error fetching tasks:", error);
        });
    }
  }, [isAuthenticated, token]);

  // Handle user login
  const handleLogin = (userData, token) => {
    setUser(userData);
    setToken(token);
    setIsAuthenticated(true);
  };

  // Handle user logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      
      {/* Display login form if user is not authenticated */}
      {!isAuthenticated ? (
        <>
          <h2>Login</h2>
          <LoginForm onLogin={handleLogin} />
          
          <h2>Register</h2>
          <RegisterForm />
        </>
      ) : (
        <>
          <h2>Welcome, {user.name}</h2>
          <button onClick={handleLogout}>Logout</button>

          {/* TaskForm for creating new tasks */}
          <TaskForm token={token} onTaskCreated={(newTask) => setTasks([...tasks, newTask])} />

          {/* Display list of tasks */}
          <h2>Your Tasks</h2>
          <TaskList tasks={tasks} />
        </>
      )}
    </div>
  );
};

export default App;
