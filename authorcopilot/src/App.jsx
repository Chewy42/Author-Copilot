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

    const PublicRoute = ({ children, redirectTo }) => {
        return isAuthenticated ? children : <Navigate to="/panel" />;
    };

    const PrivateRoute = ({ children, redirectTo = "/signin" }) => {
        return isAuthenticated ? children : <Navigate to={redirectTo} />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<PublicRoute><SignIn /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
                <Route path="/panel" element={<PrivateRoute redirectTo="/signin"><Panel /></PrivateRoute>} />
                <Route path="/settings" element={<PrivateRoute redirectTo="/signup"><Settings /></PrivateRoute>} />
            </Routes>
        </Router>
    );
};

export default App;