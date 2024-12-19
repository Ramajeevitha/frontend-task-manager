import React, { useState } from "react";
import API from "../services/api";

const TaskForm = () => {
  const [taskData, setTaskData] = useState({ description: "", completed: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", taskData);
      alert("Task added successfully");
    } catch (error) {
      alert("Failed to add task");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="description" placeholder="Task Description" onChange={handleChange} required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
