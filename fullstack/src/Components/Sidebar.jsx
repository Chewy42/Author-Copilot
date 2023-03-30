import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const Sidebar = ({ onMenuItemClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside className="w-64 bg-gray-100 text-white border-r-2">
      <div className="p-6">
        <Link onClick={
          () => {
            onMenuItemClick("dashboard");
            setMenuOpen(false);
          }
        } className="text-xl text-primary font-bold">
          Author<span className="text-secondary">Copilot</span>
        </Link>
      </div>

      <nav>
        <Link onClick={
          () => {
            onMenuItemClick("dashboard");
            setMenuOpen(false);
          }
        } className="text-primary font-semibold text-lg block px-6 py-3 bg-gray-100 hover:bg-gray-200 ease-linear transition-all duration-100">
          Dashboard
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hover:bg-gray-200 font-semibold text-lg ease-linear transition-all duration-100 text-primary w-full text-left px-6 py-3 flex items-center justify-between"
        >
          Writing Modes
          <ChevronDownIcon
            className={`w-5 h-5 ${
              menuOpen ? 'transform rotate-180' : ''
            } text-accent transition-transform duration-300`}
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
          <div className="divide-y divide-gray-200 transition-transform duration-400 ease-in-out origin-top transform scale-y-0"
               style={menuOpen ? { transform: "scaleY(1)" } : {}}
          >
            <Link
              onClick={() => {
                onMenuItemClick("supervised-writing");
                setMenuOpen(false);
              }
              }
              className="text-primary block px-6 py-3 rounded-md hover:bg-gray-200 ease-linear transition-all duration-100"
            >
              Supervised Writing
            </Link>
            <Link
              onClick={() => {
                onMenuItemClick("unsupervised-writing");
                setMenuOpen(false);
              }
              }
              className="text-primary block px-6 py-3 hover:bg-gray-200 rounded-md ease-linear transition-all duration-100 border"
            >
              Unsupervised Writing
            </Link>
            <Link
              to="/dashboard"
              className="text-primary block px-6 py-3 hover:bg-gray-200 rounded-md ease-linear transition-all duration-100"
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
          className="text-primary text-lg font-semibold block px-6 py-3 bg-gray-100 hover:bg-gray-200 ease-linear transition-all duration-100"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;