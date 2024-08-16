import { useMutation, useQuery } from "react-query";
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
  const logoutHandler = async ({ params, getuserdata }) => {
    // Debugging: log getuserdata to check if it's correctly passed
    console.log("getuserdata:", getuserdata);

    // Check if getuserdata or getuserdata.token is undefined
    if (!getuserdata || !getuserdata.token) {
      throw new Error("User data or token is missing");
    }

    const res = await axios.post(`${API_URL}/users/logout`, params, {
      headers: {
        Authorization: `Bearer ${getuserdata.token}`,
      },
    });
    return res.data;
  };

  const { mutateAsync: logout, isLoading, error } = useMutation(logoutHandler, {
    onSuccess: (data) => {
      // Check if the server returned a 401 status code
      if (data.statusCode === 401) {
        throw new Error("Something went wrong");
      }
      // Remove user data from local storage upon successful logout
      localStorage.removeItem("user");
    },
    onError: (error) => {
      // Log the error for debugging
      console.error("Logout error:", error.response ? error.response.data : error.message);
      throw new Error(error.message);
    },
  });

  return { logout, isLoading, error };
}


//get user details
export function GetEmpolyee(getuserdata) {
  const getemployee = async ({email }) => {
    const res = await axios.post(
      `${API_URL}/users/getuserbyemail`,
      { email },
      {
        headers: {
          "Content-Type": "application/json", // Ensure the content type is JSON
          Authorization: `Bearer ${getuserdata.token}`,
        },
      }
    );

    return res.data;
  };

  const {
    mutateAsync: getemployeedisply,
    error: getemployeeerror,
    isLoading: getemployeeisLoading,
  } = useMutation(getemployee, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return {  getemployeedisply,
 getemployeeerror,
    getemployeeisLoading,};
}

/*********************update user**************************88 */
export function UpdateEmployee(getuserdata) {
  const updateemployee = async ({
    email,
    name,  
    employeeno,
    employeecategory,

  }) => {
    const res = await axios.put(
      `${API_URL}/users/updateuser`,
      {   email,
        name,  
        employeeno,
        employeecategory,
     },
      {
        headers: {
          "Content-Type": "application/json", // Ensure the content type is JSON
          Authorization: `Bearer ${getuserdata.token}`,
        },
      }
    );

    return res.data;
  };

  const {
    mutateAsync: updateemployeedetails,
    error:  updateemployeedetailserror,
    isLoading: updateemployeedetailsisLoading,
  } = useMutation(updateemployee, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return {
    updateemployeedetails,
    updateemployeedetailserror,
    updateemployeedetailsisLoading,
  };
}

/*********************************delete employee********************************** */
export function DeleteEmployee(getuserdata) {
  const deleteeemployee = async (formData) => {
    const res = await axios.post(
      `${API_URL}/users/deleteuser`,
      formData,

      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getuserdata.token}`,
        },
      }
    );

    return res.data;
  };

  const {
    mutateAsync: deleteeemployeedetails,
    error:  deleteeemployeeerror,
    isLoading: deleteeemployeeisLoading,
  } = useMutation(deleteeemployee, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return {
    deleteeemployeedetails,
    deleteeemployeeerror,
    deleteeemployeeisLoading,
  };
}
/***************************get all employee****************************8 */
export function GetAllEmployes(getuserdata) {
  const getemployee = async () => {
    console.log(getuserdata, "getuserdata");
    const res = await axios.get(`${API_URL}/users/getallemployee`, {
      headers: {
        Authorization: `Bearer ${getuserdata.token}`, // Add the Bearer token here
      },
    });
    return res.data;
  };
  const { data, error, isLoading, refetch } = useQuery(
    "getemployee",
    getemployee
  );
  return { data, error, isLoading, refetch };
}