import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Set state values for authentication, token, user ID, and user name.
const [isAuthenticated, setIsAuthenticated] = useState(
  !!localStorage.getItem("user")
);
const [userToken, setUserToken] = useState(
  localStorage.getItem("token") || null
);
const [userId, setUserId] = useState(localStorage.getItem("uuid") || null);
const [userName, setUserName] = useState(
  localStorage.getItem("name") || null
);

  // handle sign-in by storing the user in local storage and setting isAuthenticated to true
  const handleSignIn = (response) => {
    // check if the response includes an existing user and a token
    if (response.existingUser && response.token) {
      // store the user token in local storage
      localStorage.setItem("user", "true");
      localStorage.setItem("token", response.token);
      localStorage.setItem("uuid", response.existingUser._id);
      localStorage.setItem("name", response.existingUser.name);
      // update the state of our application with the user token
      setIsAuthenticated(true);
      setUserToken(response.token);
      setUserId(response.existingUser._id);
      setUserName(response.existingUser.name);
      // reload the page
      window.location.reload();
    }
  };

  const handleSignUp = (response) => {
    // Check if the response is a new user and has a token.
    if (response.newUser && response.token) {
      // Set user, token, uuid, and name in local storage.
      localStorage.setItem("user", "true");
      localStorage.setItem("token", response.token);
      localStorage.setItem("uuid", response.newUser._id);
      localStorage.setItem("name", response.newUser.name);
      // Set isAuthenticated, userToken, userId, and userName state.
      setIsAuthenticated(true);
      setUserId(response.newUser._id);
      setUserToken(response.token);
      setUserName(response.newUser.name);
      // Reload the page to display the new user.
      window.location.reload();
    }
  };

  //handle sign-out by removing the user from local storage and setting isAuthenticated to false
  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("uuid");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsAuthenticated(false);
    setUserId(null);
    setUserToken(null);
    setUserName(null);
    window.location.reload();
  };

    // return the context provider with the following value
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
