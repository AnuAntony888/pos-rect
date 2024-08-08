import { useMutation } from "react-query";
import { API_URL } from "./UserApi";
import axios from "axios";

export function useInsertInvoice() {
  const invoiceForm = async (formData) => {
    const res = await axios.post(`${API_URL}/invoice/insertinvoice`, formData, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // console.log(res, "response of profile");
    return res.data;
  };

  const {
    mutateAsync: invoice,
    error: invoiceererror,
    isLoading: invoiceisLoading,
  } = useMutation(invoiceForm, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { invoice, invoiceererror, invoiceisLoading };
}
