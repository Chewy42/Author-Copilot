import React, { useContext } from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import AuthContext from "./contexts/AuthContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <header className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Author<span className="text-blue-300">Copilot</span>
        </Link>

        <nav className="flex items-center">
          <Menu as="div" className="relative inline-block text-left mr-4">
            {/* ... menu items */}
          </Menu>

          {!isAuthenticated && (
            <>
              <a
                href="/signin"
                className="text-blue-600 hover:text-blue-500 px-4 py-2 rounded-md"
              >
                Sign In
              </a>

              <a
                href="/signup"
                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md shadow-md"
              >
                Sign Up
              </a>
            </>
          )}

          {isAuthenticated && (
            <a
              href="/panel"
              className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md shadow-md"
            >
              Panel
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
