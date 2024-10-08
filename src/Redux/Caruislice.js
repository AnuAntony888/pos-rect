import { createSlice } from "@reduxjs/toolkit";
import { Toastsucess } from "../Reusable";

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
      const { product_id } = action.payload;
      const itemInCart = state.cart_items.find(
        (item) => item.product_id === product_id
      );

      if (itemInCart) {
        if (itemInCart.cartCount < itemInCart.Iteamstock) {
          itemInCart.cartCount += 1;
        } else {
          Toastsucess("Quantity exceeds stock limit.");
        }
      }
      localStorage.setItem("produt_items", JSON.stringify(state.cart_items));
    },
    decreaseCart: (state, action) => {
      const { product_id } = action.payload;
      const itemInCart = state.cart_items.find(
        (item) => item.product_id === product_id
      );

      if (itemInCart) {
        if (itemInCart.cartCount > 1) {
          itemInCart.cartCount -= 1;
        } else {
          state.cart_items = state.cart_items.filter(
            (item) => item.product_id !== product_id
          );
        }
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
      const { product_id } = action.payload;
      state.cart_items = state.cart_items.filter(
        (item) => item.product_id !== product_id
      );
      localStorage.setItem("produt_items", JSON.stringify(state.cart_items));
    },

    calculateCartTotal: (state, action) => {
      const { master = {} } = action.payload || {}; // Provide default values
      // console.log(master,"master")
      let cartTotal = 0;
      let cartActualTotal = 0;
      let totalDiscountAmount = 0;
      let totalTaxAmount = 0;

      state.cart_items.forEach((item) => {
        console.log(master, "master");
        const itemActualTotal = item.IteamPrice * item.cartCount;
        // actual discount
        // const  discount= itemActualTotal * (item.IteamDiscount / 100);
        const masterDiscount = parseFloat(master.discount);
        const discount =
          master.itemDiscount === 1
            ? itemActualTotal * (masterDiscount / 100)
            : itemActualTotal * (item.IteamDiscount / 100);

        console.log(discount, "discount ");
        const itemDiscountedTotal =
          item.IteamDiscount > 0 ? itemActualTotal - discount : itemActualTotal;
        console.log(itemDiscountedTotal, "itemDiscountedTotal ");

        //original
        // const itemTax = itemDiscountedTotal * (item.ItemTax / 100);
        const masterTax = parseFloat(master.tax);
        const itemTax =
          master.itemTax === 1
            ? itemDiscountedTotal * (masterTax / 100)
            : itemDiscountedTotal * (item.ItemTax / 100);

        console.log(itemTax, "itemtax");
        totalTaxAmount += itemTax;
        cartTotal += itemDiscountedTotal;
        cartActualTotal += itemActualTotal;
        totalDiscountAmount += discount;
        item.itemActualTotal = itemActualTotal;
      });

      // const discountPercentage = (totalDiscountAmount / cartActualTotal) * 100;
      const discountin = (totalDiscountAmount / cartActualTotal) * 100;
      const cartGrandTotalAmount = cartTotal + totalTaxAmount;
      
      const discountPercentage = cartActualTotal * (discountin / 100);

      console.log(cartActualTotal, "cartActualTotal");
      console.log(cartTotal, "cartTotal");
      console.log(totalTaxAmount, discountPercentage, "totalTaxAmount");
      state.cartTotalAmount = cartTotal;
      state.cartActualTotal = cartActualTotal;
      state.discountPercentage = discountPercentage;
      state.totalTaxAmount = totalTaxAmount;
      state.cartGrandTotalAmount = cartGrandTotalAmount;
      localStorage.setItem("cartTotal", JSON.stringify(cartTotal));
      localStorage.setItem("cartActualTotal", JSON.stringify(cartActualTotal));
      localStorage.setItem(
        "discountPercentage",
        JSON.stringify(discountPercentage)
      );
      localStorage.setItem("totalTaxAmount", JSON.stringify(totalTaxAmount));
      localStorage.setItem(
        "cartGrandTotalAmount",
        JSON.stringify(cartGrandTotalAmount)
      );
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
