import { createContext, useContext,  useReducer } from "react";

import reducer from "../reducer/Authreducer";


const AuthContext = createContext();


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

  // console.log(localStorage.getItem("user"), "hai how are you");

  const saveUser = (payload) => {
    if (payload) {
      dispatch({ type: "LOGIN_SUCESS", payload: payload });
    }
  };

  // console.log(state, "state ....");

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
