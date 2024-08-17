import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API_URL } from "./UserApi";

{
  /***************************insert into product************************************** */
}

export function useCategoryField(getuserdata) {
  const categoryForm = async (formData) => {
    const res = await axios.post(
      `${API_URL}/category/createcategory`,
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
    mutateAsync: category,
    error: categoryerror,
    isLoading: categoryisLoading,
  } = useMutation(categoryForm, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
    return { 
         category,
   categoryerror,
categoryisLoading,
   };
}

{
  /*********************getsuppiler********************************** */
}

export function GetCategory(getuserdata) {
  const getcategory = async (formData) => {
    const res = await axios.post(
      `${API_URL}/category/getcategorybyid`,
      formData,
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
    mutateAsync: getcategorydisply,
    error: getcategoryerror,
    isLoading: getcategoryisLoading,
  } = useMutation(getcategory, {
    onError: (error) => {
      console.error("API error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    },
  });

  return {      getcategorydisply,
getcategoryerror,
  getcategoryisLoading,};
}

// Checkcategory function
export function Checkcategory(getuserdata) {
    const checkcategory = async (categoryData) => {
      const res = await axios.post(
        `${API_URL}/category/checkcategory`,
        categoryData,
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
      mutateAsync: categorycheck,
      error: categoryerror,
      isLoading: categoryisLoading,
    } = useMutation(checkcategory, {
      onError: (error) => {
        console.error("API error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || error.message);
      },
    });
  
    return { categorycheck, categoryerror, categoryisLoading };
}
  
{
    /****************************delete user**************************************** */
  }
  
  export function useDeleteCategory(getuserdata) {
    const deleteCategory = async (formData) => {
      const res = await axios.post(
        `${API_URL}/category/deletecategory`,
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
      mutateAsync: deletecategoryDetails,
      error: deletecategoryError,
      isLoading: deletecategorylsIsLoading,
    } = useMutation(deleteCategory, {
      onError: (error) => {
        console.error("API error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || error.message);
      },
    });
  
    return {
 deletecategoryDetails,
    deletecategoryError,
 deletecategorylsIsLoading,
    };
}
  
{
    /****************************update user**************************************** */
  }
  export function UpdateCategory(getuserdata) {
    const updatecategory = async (formData) => {
      const res = await axios.put(
        `${API_URL}/category/updatecategory`,
        formData,
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
      mutateAsync: updatecategorydetails,
      error:updatecategoryerror,
      isLoading: updatecategoryisLoading,
    } = useMutation(updatecategory , {
      onError: (error) => {
        console.error("API error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error || error.message);
      },
    });
  
    return {
      updatecategorydetails,
     updatecategoryerror,
         updatecategoryisLoading,
    };
  }