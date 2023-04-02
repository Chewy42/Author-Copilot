import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./contexts/AuthContext";
import axios from "axios";

const MyEbooks = () => {
  const [ebooks, setEbooks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const response = await axios.get(
          "/api/chat/ebooks", 
          { user },
          { headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setEbooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEbooks();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl mb-6 font-bold text-center">My Ebooks</h1>
      <ul>
        {ebooks.map((ebook) => (
          <li key={ebook._id}>
            <h2>{ebook.title}</h2>
            <a href={ebook.fileUrl} download={`${ebook.title}.epub`}>
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyEbooks;
