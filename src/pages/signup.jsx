import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit triggered");

    try {
      const res = await fetch("https://signup-login-page-pgrh.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessage("Account created!");
        console.log(data);
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage("Email already registered.");
      }
    } catch (err) {
      setMessage("Server error.");
      console.error(err);
    }
  };

  return (
    <>
      {message && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            backgroundColor: message.includes("created") ? "#4caf50" : "#f44336",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          {message}
        </div>
      )}

      <div className="title">
        <h1>Sign Up | Powered by Gabriel</h1>
      </div>

      <div className="text-hello">
        <p>Create Your Account</p>
      </div>

      <form id="info" onSubmit={handleRegisterSubmit}>
        <p>Name</p>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <p>Email</p>
        <input
          type="text"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p>Your Password</p>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="forgot-password" onClick={() => navigate("/login")}>Already have an account?</p>

        <button type="submit">Create Account</button>
      </form>
    </>
  );
}

export default SignUp;
