import React, { useContext } from "react";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import {useNavigate} from "react-router-dom";

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
                <Link to="/" className="text-xl font-bold text-blue-600">
                    Author<span className="text-blue-300">Copilot</span>
                </Link>

                <nav className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left mr-4">
                        {/* ... menu items */}
                    </Menu>

                    {!isAuthenticated && (
                        <>
                            <Link
                                to="/signin"
                                className="text-blue-600 hover:text-blue-500 px-4 py-2 rounded-md"
                            >
                                Sign In
                            </Link>

                            <Link
                                to="/signup"
                                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md shadow-md"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}

                    {isAuthenticated && (
                        <>
                            <Link
                                to="/dashboard"
                                className="bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md shadow-md mr-2"
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