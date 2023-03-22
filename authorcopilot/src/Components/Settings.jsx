import React, {useState, useContext} from "react";
import axios from "axios";
import Modal from "./Modal";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AuthContext from "./contexts/AuthContext";
import Axios from "axios";

const Settings = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [deletePassword, setDeletePassword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {userId, token} = useContext(AuthContext);
    const [placeholderName, setPlaceholderName] = useState("ERROR");
    const [placeholderEmail, setPlaceholderEmail] = useState("ERROR");

    //send get request to get user data
    const getUserData = async (id, token) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/auth/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data)
            setPlaceholderName(response.data.name);
            setPlaceholderEmail(response.data.email);
        } catch (error) {
            console.error(error);
        }
    }
    getUserData(userId, token);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:3001/api/auth/update/${userId}`,
                { name, email, password },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };



    const handleDelete = async () => {
        try {
            const response = await axios.delete("http://localhost:3001/api/auth/delete",
                {data: {password: deletePassword}, withCredentials: true});
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        setIsModalOpen(false);
    };

    return (<div className="min-h-screen flex flex-col">
        <Header/>

        <main className="flex-grow flex">
            <Sidebar/>

            <section className="flex-grow bg-gray-100 p-6">
                <h2 className="text-3xl font-bold text-blue-600 mb-8">Settings</h2>

                <div className="bg-white p-8 rounded-md shadow-md">
                    <h3 className="text-2xl font-bold text-blue-600 mb-6">
                        Account Information
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
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
                                value={name}
                                placeholder={placeholderName}
                                onChange={(event) => setName(event.target.value)}
                                disabled
                            />
                        </div>

                        <div className="mb-6">
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
                                value={email}
                                placeholder="johndoe@gmail.com"
                                onChange={(event) => setEmail(event.target.value)}
                                disabled
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-blue-700 font-semibold mb-2"
                            >
                                New Password:
                            </label>

                            <input
                                type="password"
                                id="password"
                                className="w-full px-3 py-2 border-2 border-blue-300 rounded focus:outline-none focus:border-blue-600"
                                value={password}
                                placeholder="********"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="currentPassword"
                                className="block text-blue-700 font-semibold mb-2"
                            >
                                Current Password:
                            </label>

                            <input
                                type="password"
                                id="currentPassword"
                                className="w-full px-3 py-2 border-2 border-blue-300 rounded focus:outline-none focus:border-blue-600"
                                value={currentPassword}
                                placeholder="********"
                                onChange={(event) => setCurrentPassword(event.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-600 text-white hover:bg-blue-500 px-6 py-3 rounded-md shadow-md"
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
        </main>
    </div>);
};

export default Settings;