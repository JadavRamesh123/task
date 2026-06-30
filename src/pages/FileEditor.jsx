import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Editor from "../components/Editor";
import { getFile } from "../services/fileService";
import { useFiles } from "../context/FileContext";

function FileEditor() {
  const { id } = useParams();
  const { setSelectedFile } = useFiles();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFile();
  }, [id]);

  const loadFile = async () => {
    try {
      const file = await getFile(id);

      if (file) {
        setSelectedFile(file);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  return (
    <div>
      <Navbar />
      <Editor />
    </div>
  );
}

export default FileEditor;