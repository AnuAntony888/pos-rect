import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { API_URL } from "./UserApi";

export function Singleproduct() {

  const singleproductdisply = async ({ barcode }) => {
    const res = await axios.post(
      `${API_URL}/products/getsingleproduct`,
      { barcode }, // Sending JSON payload
      {
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is JSON
        },
      }
    );

    return res.data;
  };

  const {
    mutateAsync: singleproduct,
    error: singleproducterror,
    isLoading: singleproductisLoading,
  } = useMutation(singleproductdisply, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return { singleproduct, singleproducterror, singleproductisLoading };
}