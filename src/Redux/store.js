
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import Caruislice from "./Caruislice";


const store = configureStore({
  reducer: {
  
    cartUi: Caruislice,
    carttoggle: cartSlice.reducer,

  },
});

export default store;