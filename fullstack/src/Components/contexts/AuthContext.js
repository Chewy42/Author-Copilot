import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignIn = async (response) => {
    if (response.existingUser && response.token) {
      const userData = {
        id: response.existingUser._id,
        name: response.existingUser.name,
        token: response.token,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      window.location.reload();
    }
  };

  const handleSignUp = async (response) => {
    if (response.newUser && response.token) {
      const userData = {
        id: response.newUser._id,
        name: response.newUser.name,
        token: response.token,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      window.location.reload();
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.reload();
  };

  const isAuthenticated = user !== null;

  const value = {
    isAuthenticated,
    user,
    handleSignIn,
    handleSignUp,
    handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
export default AuthContext;
