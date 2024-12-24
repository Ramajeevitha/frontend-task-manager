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

  // Inline styles
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "800px",
      margin: "0 auto",
    },
    title: {
      textAlign: "center",
      fontSize: "28px",
      color: "#333",
      marginBottom: "20px",
    },
    taskCard: {
      background: "#fff",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      marginBottom: "15px",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    taskCardHover: {
      transform: "scale(1.02)",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
    },
    taskTitle: {
      fontSize: "20px",
      color: "#007bff",
      marginBottom: "10px",
    },
    taskStatus: {
      fontSize: "16px",
      color: "#555",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Tasks</h1>
      {tasks.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No tasks found. Start adding some!</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={styles.taskCard}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = styles.taskCardHover.transform;
              e.currentTarget.style.boxShadow = styles.taskCardHover.boxShadow;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <h3 style={styles.taskTitle}>{task.description}</h3>
            <p style={styles.taskStatus}>
              Completed: <strong>{task.completed ? "Yes" : "No"}</strong>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
