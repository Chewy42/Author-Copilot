import React, { useContext } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import AuthContext from "./Components/contexts/AuthContext";
import HomePage from "./HomePage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Panel from "./Components/Panel";
import Settings from "./Components/Settings";

const App = () => {
    const { isAuthenticated } = useContext(AuthContext);

    const PublicRoute = ({ element }) => {
        return !isAuthenticated ? element : <Navigate to="/panel" replace />;
    };

    const PrivateRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/signin" replace />;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<PublicRoute element={<SignIn />} />} />
                <Route path="/signup" element={<PublicRoute element={<SignUp />} />} />
                <Route path="/panel" element={<PrivateRoute element={<Panel />} />} />
                <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
            </Routes>
        </Router>
    );
};

export default App;