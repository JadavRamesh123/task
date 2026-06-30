import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";


function Dashboard() {
  return (
    <div>
      <Navbar />

      <div style={{ padding: "10px" }}>
        <Link to="/shared">
          <button>📁 Shared With Me</button>
        </Link>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Sidebar />
        <Editor />
      </div>
    </div>
  );
}

export default Dashboard;