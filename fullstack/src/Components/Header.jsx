import React, { useContext } from "react";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const { isAuthenticated, handleSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    handleSignOut();
    navigate("/");
  };

  return (
    <header className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-purple-800">
          Author<span className="text-purple-800">Copilot</span>
        </Link>

        <nav className="flex items-center">
          <Menu as="div" className="relative inline-block text-left mr-4">
            {/* ... menu items */}
          </Menu>

          {!isAuthenticated && (
            <>
              <Link
                to="/signin"
                className="text-purple-800 hover:text-purple-700 px-4 py-2 rounded-md"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="bg-purple-800 text-white hover:bg-purple-700 px-4 py-2 rounded-md shadow-md"
              >
                Limited Offer: 50% Off
              </Link>
            </>
          )}

          <ScrollLink
            to="pricing"
            smooth={true}
            className="cursor-pointer text-purple-800 hover:text-purple-700 px-4 py-2 rounded-md"
          >
            Exclusive Deals
          </ScrollLink>

          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="bg-purple-800 text-white hover:bg-purple-700 px-4 py-2 rounded-md shadow-md mr-2"
              >
                Dashboard
              </Link>

              <button
                onClick={handleSignOutClick}
                className="bg-red-600 text-white hover:bg-red-500 px-4 py-2 rounded-md shadow-md"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
