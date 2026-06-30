import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FileEditor from "./pages/FileEditor";
import SharedFiles from "./pages/SharedFiles";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* File Editor */}
      <Route
        path="/file/:id"
        element={
          <ProtectedRoute>
            <FileEditor />
          </ProtectedRoute>
        }
      />

      {/* Shared Files */}
      <Route
        path="/shared"
        element={
          <ProtectedRoute>
            <SharedFiles />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;