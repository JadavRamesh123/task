import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createFile,
  deleteFile,
  findUserByEmail,
  shareFile,
} from "../services/fileService";
import { useAuth } from "../context/AuthContext";
import { useFiles } from "../context/FileContext";
import SearchBar from "./SearchBar";
import ShareModal from "./ShareModal";
import "../css/Sidebar.css";

function Sidebar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const {
    files,
    selectedFile,
    setSelectedFile,
  } = useFiles();

  const [search, setSearch] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareFileId, setShareFileId] = useState(null);

  // Create File
  const handleCreate = async () => {
    try {
      await createFile({
        title: "Untitled File",
        content: "",
        ownerId: currentUser.uid,
        sharedWith: [],
      });
    } catch (error) {
      console.error(error);
      alert("Unable to create file");
    }
  };

  // Delete File
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this file?"
    );

    if (!confirmDelete) return;

    try {
      await deleteFile(id);

      if (selectedFile?.id === id) {
        setSelectedFile(null);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete file");
    }
  };

  // Share File
  const handleShare = async (email, role) => {
    try {
      const user = await findUserByEmail(email);

      if (!user) {
        alert("User not found.");
        return;
      }

      if (user.uid === currentUser.uid) {
        alert("You cannot share a file with yourself.");
        return;
      }

      await shareFile(shareFileId, user.uid, role);

      alert("File shared successfully!");

      setShowShareModal(false);
    } catch (error) {
      console.error(error);
      alert("Unable to share file.");
    }
  };

  // Search
  const filteredFiles = files.filter((file) =>
    file.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div
        style={{
          width: "300px",
          padding: "15px",
          borderRight: "1px solid #ddd",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={handleCreate}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          + New File
        </button>

        <SearchBar onSearch={setSearch} />

        {filteredFiles.length === 0 ? (
          <p>No files found.</p>
        ) : (
          filteredFiles.map((file) => (
            <div
              key={file.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                background:
                  selectedFile?.id === file.id
                    ? "#f0f8ff"
                    : "#fff",
              }}
            >
              <h4
                onClick={() => {
                  setSelectedFile(file);
                  navigate(`/file/${file.id}`);
                }}
                style={{
                  cursor: "pointer",
                  margin: "0 0 10px 0",
                }}
              >
                {file.title}
              </h4>

              <small>
                {file.updatedAt?.toDate().toLocaleString()}
              </small>

              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                {/* Only Owner can Delete and Share */}
                {file.ownerId === currentUser.uid && (
                  <>
                    <button onClick={() => handleDelete(file.id)}>
                      ❌ Delete
                    </button>

                    <button
                      onClick={() => {
                        setShareFileId(file.id);
                        setShowShareModal(true);
                      }}
                    >
                      👥 Share
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShare={handleShare}
      />
    </>
  );
}

export default Sidebar;