import React, { useState, useContext } from "react";
import axios from "axios";
import Modal from "./Modal";
import AuthContext from "./contexts/AuthContext";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [placeholderName, setPlaceholderName] = useState("John Doe");
  const [placeholderEmail, setPlaceholderEmail] = useState(
    "johndoe@authorcopilot.com"
  );
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [openaiOrgId, setOpenaiOrgId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/api/auth/update/${user.id}`,
        { name, email, password, openaiApiKey, openaiOrgId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3001/api/auth/delete",
        {
          data: { password: deletePassword },
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    setIsModalOpen(false);
  };

  return (
    <section className="flex-grow bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-primary mb-8">Settings</h2>

      <div className="bg-white p-8 rounded-md shadow-md">
        <h3 className="text-2xl font-bold text-primary mb-6">
          Account Information
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-primary font-semibold mb-2"
            >
              Full Name:
            </label>

            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border-2 border-accent rounded focus:outline-none 
    "
              value={name}
              placeholder={user.name}
              onChange={(event) => setName(event.target.value)}
              disabled
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-primary font-semibold mb-2"
            >
              Email:
            </label>

            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border-2 border-accent rounded focus:outline-none
    "
              value={email}
              placeholder={user.email}
              onChange={(event) => setEmail(event.target.value)}
              disabled
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-primary font-semibold mb-2"
            >
              New Password:
            </label>

            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border-2 border-accent rounded focus:outline-none
    "
              value={password}
              placeholder="********"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="currentPassword"
              className="block text-primary font-semibold mb-2"
            >
              Current Password:
            </label>

            <input
              type="password"
              id="currentPassword"
              className="w-full px-3 py-2 border-2 border-accent rounded focus:outline-none
    "
              value={currentPassword}
              placeholder="********"
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="openaiApiKey"
              className="block text-primary font-semibold mb-2"
            >
              OpenAI API Key:
            </label>

            <input
              type="text"
              id="openaiApiKey"
              className="w-full px-3 py-2 border-2 border-accent rounded focus:outline-none"
              value={openaiApiKey}
              placeholder="Enter your OpenAI API Key"
              onChange={(event) => setOpenaiApiKey(event.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="openaiOrgId"
              className="block text-primary font-semibold mb-2"
            >
              OpenAI Organization ID:
            </label>

            <input
              type="text"
              id="openaiOrgId"
              className="w-full px-3 py-2 border-2 border-accent rounded focus:outline-none"
              value={openaiOrgId}
              placeholder="Enter your OpenAI Organization ID"
              onChange={(event) => setOpenaiOrgId(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-green-600
 text-white hover:bg-green-500 px-6 py-3 rounded-md shadow-md"
          >
            Save Changes
          </button>
        </form>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-8 bg-red-600 text-white hover:bg-red-500 px-6 py-3 rounded-md shadow-md"
        >
          Delete Account
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDelete}
          password={deletePassword}
          setPassword={setDeletePassword}
        />
      </div>
    </section>
  );
};

export default Settings;
