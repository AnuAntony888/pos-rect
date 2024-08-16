import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseProduct, decreaseProduct } from "../../Redux/Caruislice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Typography } from "@mui/material";

const CartAmountToggle2 = (props) => {
  // const{productId}=props
  // const dispatch = useDispatch();
  // const { cart_items } = useSelector((state) => state.cartUi);

  // const handleIncrease = () => {
  //   const product = cart_items.find((item) => item.id === product_id);
  //   if (product && product.cartCount < product.stock) {
  //     dispatch(increaseProduct(product_id));
  //   }
  // };

  // const handleDecrease = () => {
  //   dispatch(decreaseProduct(product_id));
  // };

  const { product_id, productData ,count} = props;

  const dispatch = useDispatch();
  const { cart_items, product_item } = useSelector((state) => state.cartUi);
  const products = useSelector((state) => state.cartUi.products);
  const addToCartData = useSelector((state) =>
    state.cartUi.products.find((product) => product.id === product_id)
  );
console.log(count,"count")
  const handleIncrease = () => {
    console.log(product_id,"pro")
    // Find the cart item with matching product_id and get its cartCount
    const cartItemCount = cart_items.find(
      (ct) => ct.product_id ===addToCartData?.product_id)?.cartCount;
  
    const updtatedproducts = [...products]
    console.log(updtatedproducts,"dddddddddp")
    dispatch(increaseProduct({
      products: updtatedproducts.map((p) => {
        const obj = { ...p }
        if (obj.id === product_id) {
          console.log(obj.cartCount, "cartcount")
          
            obj["cartCount"] = obj?.cartCount  ? obj.cartCount + 1 : 2;   
          console.log(obj,"obj")
          return obj;            // ...p, cartCount:p?.cartCount ? p.cartCount++:2
        
          
        }
        else {
          return obj;
        }
      
    }) })); // Dispatch the action to increase product quantity
  };


  const handleDecrease = () => {
    dispatch(decreaseProduct()); // Dispatch the action to decrease product quantity
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
        {/* {product?.cartCount || 1} */}
        {/* {product_item || 1} */}{count}
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
        onClick={handleIncrease}
      >
        <AddIcon
          className="add-icon"
          sx={{ color: "black", fontSize: "1rem" }}
        />
      </IconButton>
    </Box>
  );
};

export default CartAmountToggle2;
