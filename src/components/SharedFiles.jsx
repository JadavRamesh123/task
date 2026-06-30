import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getSharedFiles } from "../services/fileService";

function SharedFiles() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (currentUser) {
      loadFiles();
    }
  }, [currentUser]);

  const loadFiles = async () => {
    try {
      const data = await getSharedFiles(currentUser.uid);
      setFiles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenFile = (file) => {
    navigate(`/file/${file.id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📁 Shared With Me</h1>

      {files.length === 0 ? (
        <h3>No Shared Files</h3>
      ) : (
        files.map((file) => (
          <div
            key={file.id}
            onClick={() => handleOpenFile(file)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              cursor: "pointer",
            }}
          >
            <h2>{file.title}</h2>

            <p>
              {file.content.length > 100
                ? file.content.substring(0, 100) + "..."
                : file.content}
            </p>

            <small>
              Owner: {file.ownerId}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default SharedFiles;