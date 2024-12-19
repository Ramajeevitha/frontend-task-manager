import React from "react";
import ReactDOM from "react-dom/client"; // Import the new React 18 API
import App from "./app";

// Use createRoot instead of render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
