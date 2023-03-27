import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const Sidebar = ({ onMenuItemClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside className="w-64 bg-blue-600 text-white">
      <div className="p-6">
        <Link onClick={
          () => {
            onMenuItemClick("dashboard");
            setMenuOpen(false);
          }
        } className="text-xl font-bold">
          Author<span className="text-blue-300">Copilot</span>
        </Link>
      </div>

      <nav>
        <Link onClick={
          () => {
            onMenuItemClick("dashboard");
            setMenuOpen(false);
          }
        } className="block px-6 py-3 hover:bg-blue-700 rounded-md">
          Dashboard
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-full text-left px-6 py-3 flex items-center justify-between"
        >
          Writing Modes
          <ChevronDownIcon
            className={`w-5 h-5 ${
              menuOpen ? 'transform rotate-180' : ''
            } text-blue-300 transition-transform duration-300`}
          />
        </button>

        <Transition
          show={menuOpen}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-blue-700 divide-y divide-blue-800 transition-transform duration-400 ease-in-out origin-top transform scale-y-0"
               style={menuOpen ? { transform: "scaleY(1)" } : {}}
          >
            <Link
              onClick={() => {
                onMenuItemClick("supervised-writing");
                setMenuOpen(false);
              }
              }
              className="block px-6 py-3 hover:bg-blue-800 rounded-md"
            >
              Supervised Writing
            </Link>
            <Link
              onClick={() => {
                onMenuItemClick("unsupervised-writing");
                setMenuOpen(false);
              }
              }
              className="block px-6 py-3 hover:bg-blue-800 rounded-md"
            >
              Unsupervised Writing
            </Link>
            <Link
              to="/dashboard"
              className="block px-6 py-3 hover:bg-blue-800 rounded-md"
            >
              Complete Automation
            </Link>
            {/* Add more menu items */}
          </div>
        </Transition>

        <Link
          onClick={() => {
            onMenuItemClick("settings");
            setMenuOpen(false);
          }
          }
          className="block px-6 py-3 hover:bg-blue-700 rounded-md"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
