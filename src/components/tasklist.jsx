import React, { useEffect, useState } from "react";
import API from "../services/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await API.get("/tasks");
      setTasks(response.data.tasks);
    } catch (error) {
      alert("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Your Tasks</h1>
      {tasks.map((task) => (
        <div key={task._id}>
          <h3>{task.description}</h3>
          <p>Completed: {task.completed ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
