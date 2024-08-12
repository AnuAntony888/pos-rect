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
    IteamPrice,Iteamstock
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
        IteamPrice,Iteamstock
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
const deleteItem = async ({ ItemCode}) => {
  const res = await axios.delete(`${API_URL}/item/deleteitem`, {
    data: { ItemCode }, // Pass data here for a DELETE request
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};

export function useDeleteItem() {
  const {
    mutateAsync: deleteItemDetails,
    error: deleteItemDetailsError,
    isLoading: deleteItemDetailsIsLoading,
  } = useMutation(deleteItem , {
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
