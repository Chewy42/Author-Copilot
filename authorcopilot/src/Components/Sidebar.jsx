import React from "react";

import {Menu} from "@headlessui/react";

import {ChevronDownIcon} from "@heroicons/react/outline";
import {Link} from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-blue-600 text-white">
      <div className="p-6">
        <Link to="/panel" className="text-xl font-bold">
          Author<span className="text-blue-300">Copilot</span>
        </Link>
      </div>

      <nav>
        <Menu as="div" className="relative text-left mb-3">
          <Menu.Button className="w-full text-left px-6 py-3">
            Dashboard
            <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 float-right text-blue-300" />
          </Menu.Button>

          <Menu.Items className="absolute w-64 mt-2 origin-top-left bg-blue-600 divide-y divide-blue-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {/* ... dashboard menu items */}
          </Menu.Items>
        </Menu>

        {/* ... other sidebar menu items */}
        <Link
          to="/settings"
          className="block px-6 py-3 hover:bg-blue-700 rounded-md"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;