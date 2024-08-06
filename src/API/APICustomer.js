import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "./UserApi";



export function useCustomerField() {
  const customerForm = async (formData) => {
    const res = await axios.post(`${API_URL}/customer/createcustomer`, formData, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // console.log(res, "response of profile");
    return res.data;
  };

  const {
    mutateAsync: InserCustomer,
    error: InserCustomererror,
    isLoading: InserCustomerisLoading,
  } = useMutation(customerForm, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return {     InserCustomer,
    InserCustomererror,
 InserCustomerisLoading, };
}


