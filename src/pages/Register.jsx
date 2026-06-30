import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/Register.css";


function Register() {
  const { registerUser } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(email, password);

      alert("Registration Successful!");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">

        {/* LEFT SIDE */}
        <div className="left-panel">
          <h1>WELCOME</h1>
          <p>
            Create your account and start using the collaborative editor.
            Work together in real-time with your team.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-panel">
          <h1>Create Account</h1>
          <p>Fill in the details to get started</p>

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

            <button type="submit">Register</button>
          </form>

          <Link to="/login">Already have an account? Login</Link>
        </div>

      </div>
    </div>
  );
}

export default Register;