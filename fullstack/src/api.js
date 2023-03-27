import axios from "axios";

export const generateEbook = async (topic) => {
    try {
      const response = await axios.post("http://localhost:3001/api/chat/generateEbookUnsupervised", { topic });
      if (response.status === 200) {
        const { data } = response;
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };  
