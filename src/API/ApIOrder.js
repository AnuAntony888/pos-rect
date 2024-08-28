import { useMutation, useQuery } from "react-query";
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
  const getinvoice = async ({ invoice_no ,master_id}) => {
    const res = await axios.post(
      `${API_URL}/invoice/getinvoice`,
      {
        invoice_no,
        master_id
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

{/**********************************Get invoice next number****************************************/}

export function GetInvoiceNumber(getuserdata,date) {
  const getinvoice = async () => {
    try {
      console.log(getuserdata, "getuserdata");
      const res = await axios.post(`${API_URL}/invoice/generate-invoice-number`,
        { "date": date},
        {
          headers: {
            Authorization: `Bearer ${getuserdata.token}`, // Add the Bearer token here
          },
        });
      return res.data;
    }
    catch (error) {
      if (error.response?.error) {
        // Return the error response data
        return Promise.reject(error.response.data);
      } else {
        // Handle other errors (e.g., network issues)
        return Promise.reject({ error: "An unexpected error occurred." });
      }
    }
  };
  const { data:invoicenumber, error:invoicenumbererror, isLoading: invoicenumberisLoading, refetch } = useQuery(
     [ "getinvoice",date], getinvoice,);
  return {invoicenumber,invoicenumbererror,  invoicenumberisLoading, refetch };
}

{/******************************delete invoice details  ************************************** */ }


export function useDeleteinvoice(getuserdata) {
  const deleteinvoice = async (formData) => {
    const res = await axios.post(
      `${API_URL}/invoice/deleteinvoice`,
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
    mutateAsync: deleteinvoiceDetails,
    error: deleteinvoiceError,
    isLoading: deleteinvoiceIsLoading,
  } = useMutation(deleteinvoice, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return {
    deleteinvoiceDetails,
    deleteinvoiceError,
    deleteinvoiceIsLoading,
  };
}


{/*************************update invoice*********************************** */ }
export function useUpdateInvoice(getuserdata) {
  const invoiceUpdate = async (formData) => {
    const res = await axios.post(`${API_URL}/invoice/updateinvoice`, formData, {
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
    mutateAsync: invoiceupdate,
    error: invoiceupdateerror,
    isLoading: invoiceupdateisLoading,
  } = useMutation(invoiceUpdate, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { invoiceupdate, invoiceupdateerror, invoiceupdateisLoading };
}