import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import {
  addToCart,
  decreaseProduct,
  increaseProduct,
} from "../Redux/Caruislice";
import { useDispatch, useSelector } from "react-redux";
import { Toastsucess } from "../Reusable";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ToggileCart from "./ToggileCart";
const CarttoAdd = (props) => {
  const { productId, searchBarcode, count } = props;
  const dispatch = useDispatch();
  console.log(count, searchBarcode, "count");
  const { cart_items } = useSelector((state) => state.cartUi);

  const handleAddToCart11 = () => {
    const item = cart_items.find(
      (item) => item?.product_id === searchBarcode.product_id
    );
    console.log(item, "item");
    if (item && item?.cartCount + count > searchBarcode?.stock) {
      // Handle the case where item quantity exceeds available stock
      // return;
    }
    dispatch(addToCart(searchBarcode));
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          {/* <CartAmountToggle2
            product_id={addToCartData.id}
            productData={addToCartData}
            count={count}
          /> */}
          <ToggileCart
            product_id={searchBarcode.product_id}
            productData={searchBarcode}
            count={count}
          />
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            className="popViewbtn"
            size="large"
            id="addtocart"
            onClick={handleAddToCart11}
          >
            A
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CarttoAdd;
