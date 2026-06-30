import { useEffect, useState } from "react";
import {
  updateFile,
  subscribeToFile,
} from "../services/fileService";
import { useFiles } from "../context/FileContext";
import { useAuth } from "../context/AuthContext";

function Editor() {
  const { selectedFile } = useFiles();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Check Permissions
  const isOwner = selectedFile?.ownerId === currentUser?.uid;

  const userPermission = selectedFile?.sharedWith?.find(
    (user) => user.uid === currentUser?.uid
  );

  const isViewer =
    !isOwner && userPermission?.role === "viewer";

    console.log("Current User:", currentUser?.uid);
console.log("Selected File:", selectedFile);
console.log("User Permission:", userPermission);
console.log("Is Viewer:", isViewer);
  // Load selected file
  useEffect(() => {
    if (selectedFile) {
      setTitle(selectedFile.title || "");
      setContent(selectedFile.content || "");
    }
  }, [selectedFile]);

  // Real-time updates
  useEffect(() => {
    if (!selectedFile) return;

    const unsubscribe = subscribeToFile(
      selectedFile.id,
      (file) => {
        setTitle(file.title || "");
        setContent(file.content || "");
      }
    );

    return unsubscribe;
  }, [selectedFile]);

  // Auto Save (Owner & Editor only)
  useEffect(() => {
    if (!selectedFile || isViewer) return;

    const timer = setTimeout(async () => {
      try {
        await updateFile(
          selectedFile.id,
          {
            title,
            content,
          },
          currentUser.uid
        );
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    title,
    content,
    selectedFile,
    currentUser,
    isViewer,
  ]);

  if (!selectedFile) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Select a File</h2>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      {/* TITLE */}
      <input
        type="text"
        value={title}
        placeholder="File Title"
        onChange={(e) => setTitle(e.target.value)}
        readOnly={isViewer}
        style={{
          width: "100%",
          fontSize: "22px",
          padding: "10px",
          marginBottom: "15px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          outline: "none",
          backgroundColor: isViewer ? "#f3f4f6" : "#fff",
          cursor: isViewer ? "not-allowed" : "text",
        }}
      />

      {/* CONTENT */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing..."
        readOnly={isViewer}
        style={{
          width: "100%",
          height: "500px",
          padding: "12px",
          fontSize: "14px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          outline: "none",
          resize: "none",
          lineHeight: "1.5",
          backgroundColor: isViewer ? "#f3f4f6" : "#fff",
          cursor: isViewer ? "not-allowed" : "text",
        }}
      />

      {isViewer && (
        <p
          style={{
            color: "red",
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          You have Viewer access. Editing is disabled.
        </p>
      )}
    </div>
  );
}

export default Editor;