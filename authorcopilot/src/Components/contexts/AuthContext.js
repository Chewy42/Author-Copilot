import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("user"));
    const [userToken, setUserToken] = useState(localStorage.getItem("token") || null);
    const [userId, setUserId] = useState(localStorage.getItem("uuid") || null);
    const [userName, setUserName] = useState(localStorage.getItem("name") || null);

    //handle sign-in by storing the user in local storage and setting isAuthenticated to true
    const handleSignIn = (response) => {
        localStorage.setItem("user", "true");
        localStorage.setItem("token", response.token)
        localStorage.setItem("uuid", response.existingUser._id)
        localStorage.setItem("name", response.existingUser.name)
        setIsAuthenticated(true);
        setUserToken(response.token)
        setUserId(response.existingUser._id)
        setUserName(response.existingUser.name)
        window.location.reload()
    };

    const handleSignUp = (response) => {
        localStorage.setItem("user", "true");
        localStorage.setItem("token", response.token)
        localStorage.setItem("uuid", response.newUser._id)
        localStorage.setItem("name", response.newUser.name)
        setIsAuthenticated(true);
        setUserId(response.newUser._id)
        setUserToken(response.token)
        setUserName(response.newUser.name)
        window.location.reload()
    }

    //handle sign-out by removing the user from local storage and setting isAuthenticated to false
    const handleSignOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("uuid");
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setIsAuthenticated(false);
        setUserId(null)
        setUserToken(null)
        setUserName(null)
        window.location.reload()
    };

    const value = {
        isAuthenticated,
        userId,
        userToken,
        userName,
        handleSignIn,
        handleSignUp,
        handleSignOut
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;