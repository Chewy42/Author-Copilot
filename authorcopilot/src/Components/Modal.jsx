import React from "react";

const Modal = ({ isOpen, onClose, onDelete, password, setPassword }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Are you sure you want to delete your account?
                </h3>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This action cannot be undone.
                  </p>

                  <div className="mt-4">
                    <label
                      htmlFor="password"
                      className="block text-blue-700 font-semibold mb-2"
                    >
                      Password:
                    </label>

                    <input
                      type="password"
                      id="password"
                      className="w-full px-3 py-2 border-2 border-blue-300 rounded focus:outline-none focus:border-blue-600"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="bg-red-600 text-white hover:bg-red-500 px-6 py-2 rounded-md shadow-md ml-3"
              onClick={onDelete}
            >
              Delete Account
            </button>

            <button
              type="button"
              className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-2 rounded-md shadow-md"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
