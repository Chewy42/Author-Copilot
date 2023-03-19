import React from "react";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">
          Author<span className="text-blue-300">Copilot</span>
        </div>

        <nav className="flex items-center">
          <Menu as="div" className="relative inline-block text-left mr-4">
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-700 bg-white rounded-md focus:outline-none">
              Menu
              <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 text-blue-500" />
            </Menu.Button>

            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/"
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Home
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/about"
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    About
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="/contact"
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    Contact
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>

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
        </nav>
      </div>
    </header>
  );
};

export default Header;