// api.js
import axios from "axios";

export const generateEbook = async (topic) => {
  try {
    const response = await axios.post("http://localhost:3001/api/chat/generateEbook", { topic });
    return response.data;
  } catch (err) {
    console.error(err);
    return { error: "Error generating ebook" };
  }
};
