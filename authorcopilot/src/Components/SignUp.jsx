import React from "react";

import Header from "./Header";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-blue-50 py-20">
        <div className="container mx-auto max-w-md bg-white shadow-md rounded-md p-6">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Sign Up
          </h2>

          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-blue-700 font-semibold mb-2"
              >
                Full Name:
              </label>

              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border-2 border-blue-300 rounded focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-blue-700 font-semibold mb-2"
              >
                Email:
              </label>

              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border-2 border-blue-300 rounded focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="mb-4">
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
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-blue-700 font-semibold mb-2"
              >
                Confirm Password:
              </label>

              <input
                type="password"
                id="confirm-password"
                className="w-full px-3 py-2 border-2 border-blue-300 rounded focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-3 rounded-md shadow-md w-full"
            >
              Sign Up
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
