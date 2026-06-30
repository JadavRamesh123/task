import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";
import {
    loginUser,
    logoutUser,
    registerUser,
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        registerUser,
        loginUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};