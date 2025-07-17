import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); 

    try {
      const res = await fetch("https://signup-login-page-pgrh.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
      } else {
        setMessage("Login failed. Check your credentials.");
      }
    } catch (err) {
      setMessage("Error connecting to server.");
      console.error(err);
    }
  };

  return (
    <>
      <div className="title">
        <h1>Sign In | Powered by Gabriel</h1>
      </div>

      <div className="text-hello">
        <p>Login to Get Started!</p>
      </div>

      <form id="info" onSubmit={handleLoginSubmit}>
  <p>Email</p>
  <input
    type="text"
    placeholder="Email Address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  <p>Your Password</p>
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  <div className="form-actions">
    <button type="submit">Log In</button>

    <div className="or">
      <p>OR</p>
    </div>

    <button type="button" onClick={() => navigate("/signup")}>
      Sign Up
    </button>
  </div>
</form>

  {message && (
  <p
    style={{
      position: "fixed",
      top: "10px",
      right: "10px",
      backgroundColor: message.includes("successful") ? "#4caf50" : "#f44336",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      fontWeight: "bold",
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      zIndex: 1000,
    }}
    role="alert">
    {message}
  </p>
)}

    </>
  );
}

export default Login;
