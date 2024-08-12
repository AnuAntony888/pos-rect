import { useMutation } from "react-query";
import axios from "axios";

export const API_URL = "http://localhost:5000/api"; // Update API URL as needed

const registerHandler = async (params) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, params);
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
        throw new Error(data.errorMessage?.email[0] || "Unauthorized");
      }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return { register, isLoading, error };
}


//Login
const loginHandler = async (params) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, params);
    return response.data;
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || error.message);
  }
};

export function useUserLogin() {
  const {
    mutateAsync: login,
    isLoading,
    error,
  } = useMutation(loginHandler, {
    onSuccess: (data) => {
      if (data.statusCode === 401) {
        console.error("Unauthorized:", data.errorMessage?.email[0] || "Unauthorized");
      } else {
        // Handle successful login
        console.log("Login successful:", data);
        localStorage.setItem("user", JSON.stringify(data));
        
      }
      // localStorage.setItem("user", JSON.stringify(data));
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });

  return { login, isLoading, error };
}

export function useLogout() {
  const logoutHandler = async (params) => {
    const res = await axios.post(`${API_URL}/user/logout`, params);

    return res.data;
  };

  const {
    mutateAsync: logout,
    isLoading,
    error,
  } = useMutation(logoutHandler, {
    onSuccess: (data) => {
      if (data.statusCode === 401) {
        throw new Error("Something went wrong");
      }
      localStorage.removeItem("user");
      window.location.href = "/";
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { logout, isLoading, error };
}

// const logoutHandler = () => {
//   logout({ token: JSON.parse(localStorage.getItem("user"))?.token });
//   googleLogout();
//   setopenpopup(false);
// };