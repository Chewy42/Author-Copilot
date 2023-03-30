import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
import axios from "axios";

import Header from "./Header";
import AlertBox from "./AlertBox";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { handleSignUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/signup",
        {
          name,
          email,
          password,
          confirmPassword,
        }
      );
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        handleSignUp(response.data);
        navigate("/panel");
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gradient-to-r to-purple-400 from-indigo-400 py-10 relative">
        <div className="container mx-auto max-w-md bg-gray-100 drop-shadow-xl rounded-md p-6 border-2">
          <h2 className="text-3xl font-bold text-center text-primary mb-6 select-none">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-primary font-semibold mb-2 select-none"
              >
                Full Name:
              </label>

              <input
                type="text"
                id="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="w-full px-3 py-2 border-2 border-primary rounded focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-primary font-semibold mb-2 select-none"
              >
                Email:
              </label>

              <input
                type="email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-3 py-2 border-2 border-primary rounded focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-primary font-semibold mb-2 select-none"
              >
                Password:
              </label>

              <input
                type="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-3 py-2 border-2 border-primary rounded focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-primary font-semibold mb-2 select-none"
              >
                Confirm Password:
              </label>

              <input
                type="password"
                id="confirm-password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                className="w-full px-3 py-2 border-2 border-primary rounded focus:outline-none focus:border-purple-600"
              />
            </div>

            <span className="relative top-[-10px]">
              Already registered? <Link to="/signin" className="underline text-blue-600">Click here to sign in.</Link>
            </span>

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-accent hover:scale-[103%] transition-all ease-linear duration-200 text-white hover:font-bold px-6 py-3 mt-2 rounded-md shadow-md w-full"
            >
              Sign Up
            </button>
            {error && <AlertBox message={error} />}
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
