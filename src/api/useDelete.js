import { useState } from 'react';
import axios from 'axios';

const useDelete = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteItem = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      setSuccess(true);
      return response; 
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteItem, loading, error, success };
};

export default useDelete;
