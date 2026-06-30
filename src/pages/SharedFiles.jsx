import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getSharedFiles } from "../services/fileService";

function SharedFiles() {
  const { currentUser } = useAuth();

  const [sharedFiles, setSharedFiles] = useState([]);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const files = await getSharedFiles(currentUser.uid);
      setSharedFiles(files);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shared With Me</h2>

      {sharedFiles.length === 0 ? (
        <p>No shared files.</p>
      ) : (
        sharedFiles.map((file) => (
          <div
            key={file.id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{file.title}</h3>

            <p>{file.content}</p>

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