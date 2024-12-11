import axios from "axios";
import { useState } from "react";

const fetchApi = axios.create({
  baseURL: "http://172.16.100.49:4000/v1", // Replace with your base URL
  timeout: 10000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json", // Set default headers
  },
});

export const useApi = () => {
  const [loading, setLoading] = useState(false);

  const apiCall = async (config) => {
    setLoading(true);
    try {
      const response = await fetchApi(config);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { apiCall, loading };
};
