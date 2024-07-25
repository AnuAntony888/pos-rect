import { useQueryClient } from "react-query";

// export function UserAdress(getuserdata) {
//     const QueryClient = useQueryClient();
//     const formData = new FormData();
  
//     const AddressField = async ({
  
//     }) => {
//       formData.append("address", address);
//       formData.append("country", country);

//       const res = await axios.post(`${API}/user/address`, formData, {
//         method: "POST",
  
//         headers: {
//           Authorization: `Bearer ${getuserdata.token}`,
//         },
//       });
  
//       return res.data.data;
//     };
  
//     const {
//       mutateAsync: addressofuser,
//       error: addressofusererror,
//       isLoading: addressofuserisLoading,
//     } = useMutation(AddressField, {
//       onSuccess: (data) => {
//         QueryClient.invalidateQueries("addressFielduser");
//         QueryClient.invalidateQueries("profile");
//         // if (data.statusCode === 401) {
//         //   throw new Error(data.errorMessage?.password[0]);
//         // }
//       },
//       onError: (error) => {
//         throw new Error(error.message);
//       },
//     });
//     return { addressofuser, addressofusererror, addressofuserisLoading };
//   }
  