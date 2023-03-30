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
    <header className="bg-white p-4 shadow-md border-b-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          Author<span className="text-accent">Copilot</span>
        </Link>

        <nav className="flex items-center">
          <Menu as="div" className="relative inline-block text-left mr-4">
            {/* ... add future menu items */}
          </Menu>

          {!isAuthenticated && (
            <>
              <Link
                to="/signup"
                className="bg-accent hover:scale-[103%] transition-all ease-linear duration-200 text-white  px-4 py-2 rounded-md shadow-md"
              >
                Limited Offer: 50% Off
              </Link>

              <ScrollLink
                to="pricing"
                smooth={true}
                className="cursor-pointer hover:scale-[103%] transition-all ease-linear duration-200 text-accent px-4 py-2 rounded-md"
              >
                Exclusive Deals
              </ScrollLink>
              <Link
                to="/signin"
                className="text-accent hover:scale-[103%] transition-all ease-linear duration-200 px-4 py-2 rounded-md"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-accent hover:scale-[103%] transition-all ease-linear duration-200 px-4 py-2 rounded-md"
              >
                Sign Up
              </Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="bg-accent hover:scale-[103%] transition-all ease-linear duration-200 text-white hover:bg-purple-700 px-4 py-2 rounded-md shadow-md mr-2"
              >
                Dashboard
              </Link>

              <button
                onClick={handleSignOutClick}
                className="bg-red-600 hover:scale-[103%] transition-all ease-linear duration-200 text-white hover:bg-red-500 px-4 py-2 rounded-md shadow-md"
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
