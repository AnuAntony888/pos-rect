import axios from "axios";
import { API_URL } from "./UserApi";
import { useMutation, useQuery } from "react-query";
import { Toastsucess } from "../Reusable";

export function useMaster(getuserdata) {
    const masterForm = async (formData) => {
      const res = await axios.post(`${API_URL}/master/createmaster`, formData, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getuserdata.token}`,
        },
      });
      return res.data;
    };
  
    const {
      mutateAsync: insertmaster,
      error: insertmastererror,
      isLoading: insertmasterisLoading,
    } = useMutation(masterForm, {
      onSuccess: (data) => {
        
      },
      onError: (error) => {
        if (error.response) {
          Toastsucess(`${error.response.data.error}`);
        } else {
          Toastsucess(error.message, );
        }
      
      },
    });
  
    return {    insertmaster,
       insertmastererror,
       insertmasterisLoading, };
}
  

//get all master
export function GetAllMaster(getuserdata) {
  const getmasterdata = async () => {
    console.log(getuserdata, "getuserdata");
    const res = await axios.get(`${API_URL}/master/getAllMaster`, {
      headers: {
        Authorization: `Bearer ${getuserdata.token}`, // Add the Bearer token here
      },
    });
    return res.data;
  };
  const { data:getmaster, error:getmastererror, isLoading:getmasterisLoading, refetch:isLoadingrefetch } = useQuery(
    "getmasterdata",
    getmasterdata
  );
  return { getmaster, getmastererror, getmasterisLoading, isLoadingrefetch };
}

/*******************get master**************************** */
// export function useGetMaster(getuserdata) {
//   const masterGet = async (formData) => {
//     const res = await axios.post(`${API_URL}/master/getmasterbyname`, formData, {
//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//         Authorization: `Bearer ${getuserdata.token}`,
//       },
//     });
//     return res.data;
//   };

//   const {
//     mutateAsync: getmaster,
//     error: getmasterererror,
//     isLoading: getmasterisLoading,
//   } = useMutation(masterGet, {
//     onSuccess: (data) => {
      
//     },
//     onError: (error) => {
//       if (error.response) {
//         Toastsucess(`${error.response.data.error}`);
//       } else {
//         Toastsucess(error.message, );
//       }
    
//     },
//   });

//   return {    getmaster,
//     getmasterererror,
//     getmasterisLoading, };
// }


export function useGetMaster(getuserdata, entityName) {
  const getmasterGet = async () => {
    try {
      console.log(getuserdata, "getuserdata");
      const res = await axios.post(
        `${API_URL}/users/generate-employee-number`,
        { entityName: entityName },
        {
          headers: {
            Authorization: `Bearer ${getuserdata.token}`, // Add the Bearer token here
          },
        }
      );
      return res.data;
    } catch (error) {
      if (error.response?.error) {
        // Return the error response data
        return Promise.reject(error.response.data);
      } else {
        // Handle other errors (e.g., network issues)
        return Promise.reject({ error: "An unexpected error occurred." });
      }
    }
  };
  const {
    data: getmaster,
    error: getmastererrerror,
    isLoading: getmasterisLoading,
    refetch: getmasterrefetch,
  } = useQuery(["getmasterGet", entityName], getmasterGet);
  return {
    getmaster,
    getmastererrerror,
    getmasterisLoading,
    getmasterrefetch,
  };
}
