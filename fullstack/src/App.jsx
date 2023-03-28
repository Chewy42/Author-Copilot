import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import AuthContext from './Components/contexts/AuthContext';
import HomePage from './HomePage';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import Settings from './Components/Settings';
import SupervisedWriting from './Components/SupervisedWriting'; // Add this import
import TermsOfService from './Components/TermsOfService'; // Add this import

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const PublicRoute = ({ element }) => {
    return !isAuthenticated ? element : <Navigate to="/dashboard" replace />;
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
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route
          path="/settings"
          element={<PrivateRoute element={<Settings />} />}
        />
        <Route
          path="/supervised-writing"
          element={<PrivateRoute element={<SupervisedWriting />} />}
        />
        <Route 
          path="/terms-of-service"
          element={<TermsOfService />}
        />
      </Routes>
    </Router>
  );
};

export default App;
