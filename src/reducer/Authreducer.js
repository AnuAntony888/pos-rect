const Authreducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_SUCESS":
      // Save the user data to localStorage
    //  localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        getuserdata: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case "LOGOUT_SUCESS":

      return {
        ...state,
        getuserdata: null,
      };

    default:
      return state;
  }
};

export default Authreducer;

  