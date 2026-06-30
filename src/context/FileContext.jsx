import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { subscribeToFiles } from "../services/fileService";

const FileContext = createContext();

export function FileProvider({ children }) {
    const { currentUser } = useAuth();

    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (!currentUser) return;

        const unsubscribe = subscribeToFiles(
            currentUser.uid,
            setFiles
        );

        return unsubscribe;
    }, [currentUser]);

    return (
        <FileContext.Provider
            value={{
                files,
                selectedFile,
                setSelectedFile,
                setFiles,
            }}
        >
            {children}
        </FileContext.Provider>
    );
}

export const useFiles = () => useContext(FileContext);