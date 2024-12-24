import React, { useState } from "react";
import API from "../services/api";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/users/login", formData);
      localStorage.setItem("token", response.data.token);
      alert("Login successful");
    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
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
      backgroundColor: "#f0f2f5",
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
    inputFocus: {
      borderColor: "#007bff",
      outline: "none",
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
      backgroundColor: "#003d80",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form
        style={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          style={styles.input}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={styles.input}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.background)}
          onMouseDown={(e) => (e.target.style.backgroundColor = styles.buttonActive.backgroundColor)}
          onMouseUp={(e) => (e.target.style.backgroundColor = styles.button.background)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
