import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "./UserApi";



export function useCustomerField( getuserdata) {
  const customerForm = async (formData) => {
    const res = await axios.post(`${API_URL}/customer/createcustomer`, formData, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${getuserdata.token}`,
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

export function Getcustomer(getuserdata) {
  const getcustomerdisply = async ({customerContactNo}) => {
    const res = await axios.post(
      `${API_URL}/customer/getcustomerbycontact_no`,
      { customerContactNo},
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
    mutateAsync: customerdisply,
    error: customerdisplyerror,
    isLoading: customerdisplyisLoading,
  } = useMutation(getcustomerdisply, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return {    customerdisply,
  customerdisplyerror,
     customerdisplyisLoading,};
}
