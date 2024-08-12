import { createContext, useContext, useEffect, useReducer } from "react";
// import axios from "axios";
import reducer from "../reducer/Authreducer";
// import { Password } from "@mui/icons-material";

const AuthContext = createContext();

// const API = "https://myfamilyfitness.com/api/v1";
const initialState = {
  isLoading: false,
  isError: false,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,

  register: null,

  getuserdata: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);



  const saveUser = (payload) => {
    if (payload) {
      dispatch({ type: "LOGIN_SUCESS", payload: payload });
    }
  };



  return (
    <AuthContext.Provider
      value={{
        ...state,

        saveUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hooks
const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, AuthContext, useAuthContext };
