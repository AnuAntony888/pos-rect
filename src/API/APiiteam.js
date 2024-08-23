import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "./UserApi";
import { Toastsucess } from "../Reusable";
{
  /***************************insert into product************************************** */
}

export function useIteamField(getuserdata) {
  const ItemForm = async (formData) => {
    const res = await axios.post(`${API_URL}/item/createIteam`, formData, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${getuserdata.token}`,
      },
    });
    return res.data;
  };

  const {
    mutateAsync: InserItem,
    error: InserItemerror,
    isLoading: InserItemisLoading,
  } = useMutation(ItemForm, {
    onSuccess: (data) => {},
    onError: (error) => {
      if (error.response) {
        Toastsucess(`${error.response.data.error}`);
      } else {
        Toastsucess(error.message);
      }
    },
  });

  return { InserItem, InserItemerror, InserItemisLoading };
}
{
  /*********************getItem********************************** */
}

export function GetItemByCode(getuserdata) {
  const getitembyitemcode = async ({ ItemCode }) => {
    const res = await axios.post(
      `${API_URL}/item/getitembyitemcode`,
      { ItemCode },
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
    mutateAsync: itembyitemcode,
    error: itembyitemcodeerror,
    isLoading: itembyitemcodeisLoading,
  } = useMutation(getitembyitemcode, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return { itembyitemcode, itembyitemcodeerror, itembyitemcodeisLoading };
}

{
  /****************************update Iteam**************************************** */
}
export function UpdateIteam(getuserdata) {
  const updatesupplier = async ({
    ItemCode,
    ItemDescription,
    ItemSupplier,
    ItemUnit,
    ItemTax,
    IteamDiscount,
    IteamPrice,
    Iteamstock,
    updated_timestamp,
    updated_by,
  }) => {
    const res = await axios.put(
      `${API_URL}/item/updateitem`,
      {
        ItemCode,
        ItemDescription,
        ItemSupplier,
        ItemUnit,
        ItemTax,
        IteamDiscount,
        IteamPrice,
        Iteamstock,
        updated_timestamp,
        updated_by,
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
    mutateAsync: updateitemdetails,
    error: updateitemerror,
    isLoading: updateitemisLoading,
  } = useMutation(updatesupplier, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return {
    updateitemdetails,
    updateitemerror,
    updateitemisLoading,
  };
}

{
  /****************************update user**************************************** */
}

export function useDeleteItem(getuserdata) {
  const deleteItem = async (formData) => {
    const res = await axios.post(
      `${API_URL}/item/deleteitem`,
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
    mutateAsync: deleteItemDetails,
    error: deleteItemDetailsError,
    isLoading: deleteItemDetailsIsLoading,
  } = useMutation(deleteItem, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return {
    deleteItemDetails,
    deleteItemDetailsError,
    deleteItemDetailsIsLoading,
  };
}

{
  /**********************get all Item***************************** */
}
export function GetAllItem(getuserdata,SupplierDescription) {
  const getitem = async () => {
    try {
      console.log(getuserdata, "getuserdata");
      const res = await axios.post(`${API_URL}/item/getAllItems`,
        { "SupplierDescription": SupplierDescription },
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
  const { data, error, isLoading, refetch } = useQuery(
     [ "getitem",SupplierDescription], getitem,{enabled:false});
  return { data, error, isLoading, refetch };
}












