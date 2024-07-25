// import React from 'react'

// const ToggileCart = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default ToggileCart
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseProduct,
  decreaseProduct,
  setProducts,
} from "../Redux/Caruislice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Typography } from "@mui/material";

const ToggileCart = (props) => {
  const { product_id, productData, count } = props;

  const dispatch = useDispatch();
  const { cart_items } = useSelector((state) => state.cartUi);
  const products = useSelector((state) => state.cartUi.products);
  console.log(count, products, "prodcut");

  const handleIncrease12 = () => {
    const updatedProducts = { ...products };

    console.log(updatedProducts, "updates");
    if (updatedProducts?.product_id === product_id) {
      console.log(updatedProducts.cartCount, "cartCount before");
      updatedProducts["cartCount"] = updatedProducts?.cartCount
        ? updatedProducts.cartCount + 1
        : 2;
      dispatch(setProducts(updatedProducts));

    } else {
      return updatedProducts;
    }
   
  };

  const handleDecrease = () => {
    const updatedProducts = { ...products };

    console.log(updatedProducts, "updates");
    if (updatedProducts?.product_id === product_id) {
      console.log(updatedProducts.cartCount, "cartCount before");
      updatedProducts["cartCount"] = updatedProducts?.cartCount
        ? updatedProducts.cartCount - 1
        : 1;
      dispatch(setProducts(updatedProducts));
    } else {
      return updatedProducts;
      }
      
      };
    
      

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "solid .2px black",
        borderRadius: "5px",
      }}
    >
      <IconButton
        sx={{
          "&:hover": {
            borderRadius: "0",
            backgroundColor: "black",
            "& .remove-icon": {
              color: "white",
            },
          },
        }}
        onClick={handleDecrease}
      >
        <RemoveIcon
          className="remove-icon"
          sx={{ color: "black", fontSize: "1rem" }}
        />
      </IconButton>

      <Typography variant="body1" style={{ margin: "0 8px" }}>
     
        {count}
      </Typography>

      <IconButton
        sx={{
          "&:hover": {
            backgroundColor: "black",
            "& .add-icon": {
              color: "white",
            },
            borderRadius: "0",
          },
        }}
        onClick={handleIncrease12}
      >
        <AddIcon
          className="add-icon"
          sx={{ color: "black", fontSize: "1rem" }}
        />
      </IconButton>
    </Box>
  );
};

export default ToggileCart;
