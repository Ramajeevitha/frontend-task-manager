import React, { useState } from "react";
import API from "../services/api";

const TaskForm = () => {
  const [taskData, setTaskData] = useState({ description: "", completed: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData({
      ...taskData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", taskData);
      alert("Task added successfully");
      setTaskData({ description: "", completed: false }); // Reset form
    } catch (error) {
      alert("Failed to add task");
    }
  };

  // Inline styles
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#f8f9fa",
    },
    title: {
      fontSize: "24px",
      color: "#333",
      marginBottom: "20px",
    },
    form: {
      width: "100%",
      maxWidth: "400px",
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    input: {
      width: "100%",
      padding: "10px 15px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      color: "#333",
      transition: "border-color 0.3s",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "15px",
    },
    checkbox: {
      marginRight: "10px",
    },
    button: {
      width: "100%",
      padding: "10px",
      background: "#007bff",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    buttonActive: {
      backgroundColor: "#003f7f",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add a Task</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="Task Description"
          style={styles.input}
          value={taskData.description}
          onChange={handleChange}
          required
        />
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            name="completed"
            style={styles.checkbox}
            checked={taskData.completed}
            onChange={handleChange}
          />
          <label>Mark as Completed</label>
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.background)}
          onMouseDown={(e) => (e.target.style.backgroundColor = styles.buttonActive.backgroundColor)}
          onMouseUp={(e) => (e.target.style.backgroundColor = styles.button.background)}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
