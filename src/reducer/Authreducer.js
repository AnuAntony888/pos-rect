const Authreducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          ...state,
          isLoading: true,
        };
      case "LOGIN_SUCESS":
        // console.log(action.payload, "actionpayload");
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
        //console.log(action.payload, "actionpayload");
        return {
          ...state,
          isremoveLoading: false,
          removeuserdata: action.payload,
        };
      case "LOGIN_FAILURE":
        return {
          ...state,
          isremoveLoading: false,
          isError: true,
        };
  
      default:
        return state;
    }
  };
  
  export default Authreducer;
  