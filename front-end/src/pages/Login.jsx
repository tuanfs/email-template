import React, { useState } from "react";
import "../css/login.css";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-form">
      <form>
        <h1>Login</h1>
        <div className="content">
          <div className="input-field">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="username"
              autoComplete="none"
            />
          </div>
          <div className="input-field">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
          </div>
          <a href="http://localhost:3001/forget-password" className="link">
            Forgot Your Password?
          </a>
        </div>
        <div className="action">
          <button
            onClick={(e) => {
              e.preventDefault();
              axios
                .post("http://localhost:3001/login", {
                  username,
                  password
                })
                .then((response) => {
                  console.log("🚀 ~ Login ~ response:", response);
                })
                .catch((error) => {
                  console.log("🚀 ~ Login ~ error:", error);
                });
            }}
            style={{ color: "green" }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
