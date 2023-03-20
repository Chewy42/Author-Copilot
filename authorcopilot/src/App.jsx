import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Panel from './Components/Panel';
import Settings from "./Components/Settings";
import { AuthProvider } from "./Components/contexts/AuthContext";
import { Navigate } from "react-router-dom";

function App() {

  //restrict panel and settings page to authenticated users
  const PrivateRoute = ({ children: Component, ...rest }) => (
      localStorage.getItem("user") ? (
          <Route element={Component} to="/panel" />
      ) : (
          <Navigate to="/signin" />
      )
  );

  //restrict user from going to signin or signup while logged in
  const PublicRoute = ({ children: Component, ...rest }) => (
      !localStorage.getItem("user") ? (
          <Route element={Component} to="/signin" />
      ) : (
          <Navigate to="/panel" />
      )
  );

  return (
      <AuthProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <PublicRoute path="/signin">
                <SignIn />
              </PublicRoute>
              <PublicRoute path="/signup">
                <SignUp />
              </PublicRoute>
              <PrivateRoute path="/panel">
                <Panel />
              </PrivateRoute>
              <PrivateRoute path="/settings">
                <Settings />
              </PrivateRoute>
            </Routes>
          </Router>
        </div>
      </AuthProvider>
  );
}

export default App;