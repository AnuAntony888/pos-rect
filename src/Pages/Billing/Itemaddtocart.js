import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  setProducts,

} from "../../Redux/Caruislice";

import { Toastsucess } from "../../Reusable";

const Itemaddtocart = (props) => {
  const { count, product_id, setCount } = props;
  const products = useSelector((state) => state.cartUi.products);
  console.log(count, products, product_id, "count");
  // const { cart_items } = useSelector((state) => state.cartUi);
  const dispatch = useDispatch();


  const handleAddToCart = () => {
    if (count > products?.Iteamstock) {
      Toastsucess("Quantity exceeds stock limit.");
      return;
    }
    if (products?.Iteamstock <= 0 ) {
      Toastsucess("Product is out of stock");
      return;
    }
    const updatedProducts = { ...products };    // updatedProducts["cartCount"] = Number(count); 
    
    updatedProducts["cartCount"] = JSON.parse(count); 
      // count;
    dispatch(setProducts(updatedProducts));
    // console.log(updatedProducts,"12222")
    dispatch(addToCart(updatedProducts));
    setCount(1);
  };
  return (
    <div>
      <Button
        variant="contained"
        type="submit"
        sx={{
          bgcolor: "darkgreen",
          color: "#fff",
          textAlign: "left",
          width: "100%",
          textTransform: "capitalize",
          margin: "auto",
        }}
        onClick={handleAddToCart}
      >
        Add
      </Button>
    </div>
  );
};

export default Itemaddtocart;

