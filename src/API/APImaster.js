import axios from "axios";
import { API_URL } from "./UserApi";
import { useMutation } from "react-query";
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
  
/*******************get master**************************** */
export function useGetMaster(getuserdata) {
  const masterGet = async (formData) => {
    const res = await axios.post(`${API_URL}/master/getmasterbyname`, formData, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${getuserdata.token}`,
      },
    });
    return res.data;
  };

  const {
    mutateAsync: getmaster,
    error: getmasterererror,
    isLoading: getmasterisLoading,
  } = useMutation(masterGet, {
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

  return {    getmaster,
    getmasterererror,
    getmasterisLoading, };
}