import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "./UserApi";
{
  /***************************insert into product************************************** */
}
export function useIteamField() {
  const ItemForm = async (formData) => {
    const res = await axios.post(`${API_URL}/item/createIteam`, formData, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // console.log(res, "response of profile");
    return res.data;
  };

  const {
    mutateAsync: InserItem,
    error: InserItemerror,
    isLoading: InserItemisLoading,
  } = useMutation(ItemForm, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { InserItem, InserItemerror, InserItemisLoading };
}

{
  /*********************getItem********************************** */
}

export function GetItemByCode() {
  const getitembyitemcode = async ({ ItemCode }) => {
    const res = await axios.post(
      `${API_URL}/item/getitembyitemcode`,
      { ItemCode },
      {
        headers: {
          "Content-Type": "application/json", // Ensure the content type is JSON
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
