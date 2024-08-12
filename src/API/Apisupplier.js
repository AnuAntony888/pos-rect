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
  const getsupplierdisply = async ({SupplierCode }) => {
    const res = await axios.post(
      `${API_URL}/supplier/getsuplier`,
      { SupplierCode },
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
  }) => {
    const res = await axios.put(
      `${API_URL}/supplier/updatesuplier`,
      { SupplierCode, SupplierDescription, SupplierAddress },
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
const deleteSupplier = async ({ SupplierCode }) => {
  const res = await axios.delete(`${API_URL}/supplier/deletesuplier`, {
    data: { SupplierCode },
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



{/*****************************ceck alluser****************************** */}
export function GetAllSupplier(getuserdata) {
  const getsupplier = async () => {
    console.log(getuserdata,"getuserdata")
    const res = await axios.get(`${API_URL}/supplier/getAllsuplier`,
      {
        headers: {
          Authorization: `Bearer ${getuserdata.token}`, // Add the Bearer token here
        }
      }
    );
    return res.data;
  };
  const { data, error, isLoading ,refetch} = useQuery("getsupplier", getsupplier);
  return { data, error, isLoading ,refetch };
}

//check perticular suppier is existing or not 
export function Checksupplier(getuserdata) {
  const checksupplier = async ({SupplierDescription }) => {
    const res = await axios.post(
      `${API_URL}/supplier/check-supplier`,
      {SupplierDescription},
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

  return { suppliercheck, suppliercheckerror, suppliercheckisLoading, };
}