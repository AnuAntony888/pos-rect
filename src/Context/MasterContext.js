import { createContext, useContext,  useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useGetMaster } from "../API/APImaster";


const MasterContext = createContext();

const MasterProvider = ({ children }) => {
    const { getuserdata } = useAuthContext();
    const { getmaster, getmasterrefetch, } = useGetMaster(getuserdata,
        getuserdata.master_id);
  const [master, setMaster] = useState({
    // first_name: "",
    // last_name: "",
    // email: "",
    // phone: "",
    // address: "",
    // country: "",
    // city: "",
    // pincode: "",
    // address2: "",
    // city2: "",
    // pincode2: "",
    // type: "",
    // addresstype: "",
    // flagperson: "",
    // flagphone: "",
  });


 


//   useEffect(() => {


//     const guestData = JSON.parse(localStorage.getItem("guestuserData")) || {};

//     setUser({
//       first_name: userdat?.profile?.first_name || guestData.first_name || "",
//       last_name: userdat?.profile?.last_name || guestData.last_name || "",
//       email: userdat?.profile?.email || guestData.email || "",
//       phone: userdat?.profile?.phone || guestData.phone || "",
//       address: userdat?.address?.[0]?.address || guestData.address || "",
//       country: userdat?.address?.[0]?.country || guestData.country || "",
//       city: userdat?.address?.[0]?.city || guestData.city || "",
//       pincode: userdat?.address?.[0]?.pincode || guestData.pincode || "",
//       address2: userdat?.address?.[0]?.address2 || guestData.address2 || "",
//       city2: userdat?.address?.[0]?.city2 || guestData.city2 || "",
//       pincode2: userdat?.address?.[0]?.pincode2 || guestData.pincode2 || "",
//     });
//   }, [userdat]);
//   console.log(user, "user");
  return (
    <MasterContext.Provider
      value={{
   master,setMaster
      }}
    >
      {children}
    </MasterContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(MasterContext);
};

export { MasterContext, useUserContext, MasterProvider };