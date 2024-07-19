import { useMutation } from 'react-query';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/signup'; // Update API URL as needed

const registerHandler = async (params) => {
  try {
    const response = await axios.post(API_URL, params);
    return response.data;
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    throw new Error(error.response.data.error || error.message);
  }
};

export function useRegister() {
  const {
    mutateAsync: register,
    isLoading,
    error,
  } = useMutation(registerHandler, {
    onSuccess: (data) => {
      if (data.statusCode === 401) {
        throw new Error(data.errorMessage?.email[0] || 'Unauthorized');
      }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return { register, isLoading, error };
}
