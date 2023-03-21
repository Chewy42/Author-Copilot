import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Panel from './Components/Panel';
import Settings from "./Components/Settings";

const App = () => {

    const isAuthenticated = !!localStorage.getItem("user");

    const PublicRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/signin" />;
    };

    const PrivateRoute = ({ children }) => {
        return !isAuthenticated ? children : <Navigate to="/panel" />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
                <Route path="/panel" element={<PrivateRoute><Panel /></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            </Routes>
        </Router>
    );
};

export default App;