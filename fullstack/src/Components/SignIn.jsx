import React, {useContext, useState} from "react";
import Header from "./Header";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";
import AuthContext from "./contexts/AuthContext";

const SignIn = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const { handleSignIn } = useContext(AuthContext);
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:3001/api/auth/signin", {
      email,
      password,
    });
    if (response.data) {
      console.log(response)
      handleSignIn(response.data);
      navigate("/dashboard");
      localStorage.setItem("user", JSON.stringify(response.data));
    }
  } catch (error) {
    if (error.response.status === 401) {
      setAlert("Invalid credentials. Please try again.");
    } else {
      setAlert("An unexpected error occurred. Please try again.");
    }
  }
};
  return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow bg-gradient-to-r to-purple-400 from-indigo-400 py-20">
          <div className="container mx-auto max-w-md bg-gray-100 border-2 drop-shadow-xl rounded-md p-6">
            <h2 className="text-3xl font-bold text-center text-primary mb-6 select-none">
              Sign In
            </h2>

            {alert && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{alert}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
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
                    className="w-full px-3 py-2 border-2 border-primary focus:border-accent rounded focus:outline-none"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                />
              </div>

              <div className="mb-6">
                <label
                    htmlFor="password"
                    className="block text-primary font-semibold mb-2 select-none"
                >
                  Password:
                </label>

              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border-2 border-primary focus:border-accent rounded focus:outline-none"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <span className="relative top-[-10px]">
              Don't have an account yet? <Link to="/signup" className="underline text-blue-600">Sign up</Link>
            </span>

            <button
              type="submit"
              className="hover:scale-[101%] hover:font-bold hover:text-md transition-all ease-linear duration-100 bg-accent text-white px-6 py-3 rounded-md shadow-md w-full"
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