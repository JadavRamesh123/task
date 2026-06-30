import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Login.css";

function Login() {
  const { loginUser } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(email, password);

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT SIDE */}
      <div className="auth-left">
        <h1>WELCOME BACK</h1>
        <p>Login to continue accessing your dashboard and files.</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <div className="auth-card">
          <h2>Login Account</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;