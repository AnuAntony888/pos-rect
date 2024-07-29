import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "./UserApi";
{
  /***************************insert into product************************************** */
}
export function useSupplierField() {
  const supplierForm = async (formData) => {
    const res = await axios.post(
      `${API_URL}/supplier/createsuplier`,
      formData,
      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
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

export function Getsupplier() {
  const getsupplierdisply = async ({ user_id }) => {
    const res = await axios.post(
      `${API_URL}/supplier/getsuplier`,
      { user_id },
      {
        headers: {
          "Content-Type": "application/json", // Ensure the content type is JSON
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
export function Updatesupplier() {
  const updatesupplier = async ({
    user_id,
    SupplierAddress,
    SupplierDescription,
  }) => {
    const res = await axios.put(
      `${API_URL}/supplier/updatesuplier`,
      { user_id, SupplierDescription, SupplierAddress },
      {
        headers: {
          "Content-Type": "application/json", // Ensure the content type is JSON
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
  /****************************update user**************************************** */
}
const deleteSupplier = async ({ user_id }) => {
  const res = await axios.delete(`${API_URL}/supplier/deletesuplier`, {
    data: { user_id }, // Pass data here for a DELETE request
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export function useDeleteSupplier() {
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


export function GetAllSupplier() {
  const getsupplier = async () => {
    const res = await axios.get(`${API_URL}/supplier/getAllsuplier`);
    return res.data;
  };
  const { data, error, isLoading ,refetch} = useQuery("getsupplier", getsupplier);
  return { data, error, isLoading ,refetch };
}