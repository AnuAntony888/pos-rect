import { createSlice } from "@reduxjs/toolkit";
import { Toastsucess } from "../Reusable";
import { json } from "react-router-dom";

const initialState = {
  cart_items: localStorage.getItem("produt_items")
    ? JSON.parse(localStorage.getItem("produt_items"))
    : [],
  products: [],
  selectedProduct: null,
  product_item: 1,
  cartTotalAmount: 0,
};

const Caruislice = createSlice({
  name: "cartUi",
  initialState,

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    addToCart: (state, action) => {
      const { product_id, cartCount } = action.payload;
      const itemInCart = state.cart_items.find(
        (item) => item.product_id === product_id
      );

      if (itemInCart) {
        const newCartCount = +itemInCart.cartCount + cartCount;

        if (newCartCount > itemInCart.Iteamstock) {
          // Prevent adding more than stock available
          Toastsucess("Quantity exceeds stock limit.");
          return;
        }
        itemInCart.cartCount = newCartCount;
      } else {
        state.cart_items.push({
          ...action.payload,

          cartCount: +cartCount || 1,
        });
      }
      localStorage.setItem("produt_items", JSON.stringify(state.cart_items));
    },
    increaseCart: (state, action) => {
      const item = state.cart_items.find(
        (item) => item.id === action.payload.id
      );
      if (item.quantity_label === item.cartCount) {
        return;
      }
      item.cartCount++;
      localStorage.setItem("produt_items", JSON.stringify(state.cart_items));
    },
    decreaseCart: (state, action) => {
      const item = state.cart_items.find(
        (item) => item.id === action.payload.id
      );

      if (item.cartCount > 1) {
        item.cartCount--;
      } else if (item.cartCount === 1) {
        state.cart_items = state.cart_items.filter(
          (item) => item.id !== action.payload.id
        );
      }
      localStorage.setItem("produt_items", JSON.stringify(state.cart_items));
    },
    increaseProduct: (state, action) => {
      console.log(action.payload, "list");
      state.products = action.payload.products;
    },

    decreaseProduct: (state) => {
      if (state.product_item > 1) {
        state.product_item--;
      }
    },
    resetProduct: (state) => {
      state.product_item = 1;
    },
    removeProductFromCart: (state, action) => {
      state.cart_items = state.cart_items.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("produt_items", JSON.stringify(state.cart_items));
    },

    calculateCartTotal: (state) => {
      const cartTotal = state.cart_items.reduce((total, item) => {
        // Calculate the item total based on discount or price
        const itemTotal = item.IteamDiscount > 0
          ? item.IteamDiscount * item.cartCount
          : item.IteamPrice * item.cartCount;
    
        // Accumulate the total
        return total + itemTotal;
      }, 0);
    
      // Update the cartTotalAmount in the state
      state.cartTotalAmount = cartTotal;
    
      // Update localStorage
      if (cartTotal !== 0) {
        localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
      } else {
        localStorage.removeItem("cartTotal");
      }
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  addToCart,
  increaseCart,
  decreaseCart,
  removeProductFromCart,
  increaseProduct,
  decreaseProduct,
  resetProduct,
  calculateCartTotal,
} = Caruislice.actions;

export default Caruislice.reducer;
