import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));

    //handle sign-in by storing the user in local storage and setting isAuthenticated to true
    const handleSignIn = () => {
        localStorage.setItem("user", "true");
        setIsAuthenticated(true);
        window.location.reload()
    };

    const handleSignUp = () => {
        localStorage.setItem("user", "true");
        setIsAuthenticated(true);
        window.location.reload()
    }

    //handle sign-out by removing the user from local storage and setting isAuthenticated to false
    const handleSignOut = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        window.location.reload()
    };

    const value = {
        isAuthenticated,
        handleSignIn,
        handleSignUp,
        handleSignOut
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;