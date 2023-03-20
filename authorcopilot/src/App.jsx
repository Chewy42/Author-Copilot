import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Panel from './Components/Panel'; 
import Settings from "./Components/Settings";
import { AuthProvider } from "./Components/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/panel" element={<Panel />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
