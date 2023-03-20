import React from "react";
import Header from "./Header";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/api/auth/signin", {
      email,
      password,
    });
    console.log(response);

    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }

    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-blue-50 py-20">
        <div className="container mx-auto max-w-md bg-white shadow-md rounded-md p-6">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Sign In
          </h2>

          <form onSubmit={handleSubmit}>
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="mb-6">
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-3 rounded-md shadow-md w-full"
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
