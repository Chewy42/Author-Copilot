import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));
    const [userId, setUserId] = useState(localStorage.getItem("uuid") || null);
    const [userToken, setUserToken] = useState(localStorage.getItem("token") || null);
    //handle sign-in by storing the user in local storage and setting isAuthenticated to true
    const handleSignIn = (response) => {
        localStorage.setItem("user", "true");
        localStorage.setItem("uuid", response.existingUser._id)
        localStorage.setItem("token", response.token)
        setIsAuthenticated(true);
        setUserId(response.existingUser._id)
        setUserToken(response.token)
        window.location.reload()
    };

    const handleSignUp = (response) => {
        localStorage.setItem("user", "true");
        localStorage.setItem("uuid", response.newUser._id)
        localStorage.setItem("token", response.token)
        setIsAuthenticated(true);
        setUserId(response.newUser._id)
        setUserToken(response.token)
        window.location.reload()
    }

    //handle sign-out by removing the user from local storage and setting isAuthenticated to false
    const handleSignOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("uuid");
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserId(null)
        setUserToken(null)
        window.location.reload()
    };

    const value = {
        isAuthenticated,
        userId,
        userToken,
        handleSignIn,
        handleSignUp,
        handleSignOut
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;