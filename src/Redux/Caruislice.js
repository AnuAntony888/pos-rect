import { createSlice } from "@reduxjs/toolkit";

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
      const itemInCart = state.cart_items.some(
        (item) => item.id === action.payload.id
      );

      if (itemInCart) {
        const item = state.cart_items.find(
          (item) => item.id === action.payload.id
        );
        if (state.product_item) {
          item.cartCount = item.cartCount + state.product_item;
        } else if (item.quantity_label !== item.cartCount) {
          item.cartCount++;
        }
      } else {
        state.cart_items.push({
          ...action.payload,
           cartCount: action.payload.cartCount || 1
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
      console.log(action.payload, "list")
       state.products=action.payload.products
     
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
        return total + item.price * item.cartCount;
      }, 0);
      state.cartTotalAmount = cartTotal;
    },
   
  }    
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
