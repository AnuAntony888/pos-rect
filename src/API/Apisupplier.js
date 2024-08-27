import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "./UserApi";

{
  /***************************insert into product************************************** */
}

export function useSupplierField(getuserdata) {
  const supplierForm = async (formData) => {
    const res = await axios.post(
      `${API_URL}/supplier/createsuplier`,
      formData,
      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getuserdata.token}`,
        },
      }
    );
    // console.log(res, "response of profile");
    return res.data;
  };

  const {
    mutateAsync: supplieraddress,
    error: supplieraddresserror,
    isLoading: supplieraddressisLoading,
  } = useMutation(supplierForm, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { supplieraddress, supplieraddresserror, supplieraddressisLoading };
}

{
  /*********************getsuppiler********************************** */
}

export function Getsupplier(getuserdata) {
  const getsupplierdisply = async ({ SupplierCode, master_id }) => {
    const res = await axios.post(
      `${API_URL}/supplier/getsuplier`,
      { SupplierCode, master_id },
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
    mutateAsync: supplierdisply,
    error: supplierdisplyerror,
    isLoading: supplierdisplyisLoading,
  } = useMutation(getsupplierdisply, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return { supplierdisply, supplierdisplyerror, supplierdisplyisLoading };
}

{
  /****************************update user**************************************** */
}
export function Updatesupplier(getuserdata) {
  const updatesupplier = async ({
    SupplierCode,
    SupplierAddress,
    SupplierDescription,
    updated_timestamp,
    updated_by,
    master_id,
  }) => {
    const res = await axios.put(
      `${API_URL}/supplier/updatesuplier`,
      {
        SupplierCode,
        SupplierDescription,
        SupplierAddress,
        updated_timestamp,
        updated_by,
        master_id,
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
    mutateAsync: updatesupplierdetails,
    error: updatesupplierdetailserror,
    isLoading: updatesupplierdetailsisLoading,
  } = useMutation(updatesupplier, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return {
    updatesupplierdetails,
    updatesupplierdetailserror,
    updatesupplierdetailsisLoading,
  };
}

{
  /****************************delete user**************************************** */
}

export function useDeleteSupplier(getuserdata) {
  const deleteSupplier = async (formData) => {
    const res = await axios.post(
      `${API_URL}/supplier/deletesuplier`,
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
    mutateAsync: deleteSupplierDetails,
    error: deleteSupplierDetailsError,
    isLoading: deleteSupplierDetailsIsLoading,
  } = useMutation(deleteSupplier, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return {
    deleteSupplierDetails,
    deleteSupplierDetailsError,
    deleteSupplierDetailsIsLoading,
  };
}

{
  /*****************************ceck alluser****************************** */
}

export function GetAllSupplier(getuserdata, master_id) {
  const getallsupplier = async () => {
    try {
      console.log(getuserdata, "getuserdata");
      const res = await axios.post(
        `${API_URL}/supplier/getAllsuplier`,
        { master_id: master_id },
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
  const { data, error, isLoading, refetch } = useQuery(
    ["getallsupplier", master_id],
    getallsupplier
  );
  return { data, error, isLoading, refetch };
}

//check perticular suppier is existing or not
export function Checksupplier(getuserdata) {
  const checksupplier = async ({ SupplierDescription }) => {
    const res = await axios.post(
      `${API_URL}/supplier/check-supplier`,
      { SupplierDescription },
      {
        headers: {
          // "Content-Type": "application/json", // Ensure the content type is JSON
          Authorization: `Bearer ${getuserdata.token}`,
        },
      }
    );

    return res.data;
  };

  const {
    mutateAsync: suppliercheck,
    error: suppliercheckerror,
    isLoading: suppliercheckisLoading,
  } = useMutation(checksupplier, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return { suppliercheck, suppliercheckerror, suppliercheckisLoading };
}
