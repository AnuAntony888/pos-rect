import { useMutation } from "react-query";
import { API_URL } from "./UserApi";
import axios from "axios";

export function useInsertInvoice(getuserdata) {
  const invoiceForm = async (formData) => {
    const res = await axios.post(`${API_URL}/invoice/insertinvoice`, formData, {
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

{
  /*********************getInvoice********************************** */
}

export function GetInvoice(getuserdata) {
  const getinvoice = async ({ invoice_no }) => {
    const res = await axios.post(
      `${API_URL}/invoice/getinvoice`,
      { invoice_no },
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
    mutateAsync: invoicedisply,
    error: invoicedisplyerror,
    isLoading: invoicedisplyisLoading,
  } = useMutation(getinvoice, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return { invoicedisply, invoicedisplyerror, invoicedisplyisLoading };
}


//invoicenumber 
export function GetInvoiceNumber() {
  const getinvoice = async (params) => {
    const res = await axios.post(
      `${API_URL}/invoice/generate-invoice-number`,
      params,
      {
        headers: {
          "Content-Type": "application/json", // Ensure the content type is JSON
          // Authorization: `Bearer ${getuserdata.token}`,
        },
      }
    );

    return res.data;
  };

  const {
    mutateAsync: invoicenumber,
    error: invoicenumbererror,
    isLoading: invoicenumberisLoading,
  } = useMutation(getinvoice, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return { 
  invoicenumber,
  invoicenumbererror,
    invoicenumberisLoading,
   };
}