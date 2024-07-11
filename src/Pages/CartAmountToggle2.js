import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseProduct, decreaseProduct } from "../Redux/Caruislice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Typography } from "@mui/material";

const CartAmountToggle2 = ({ product_id }) => {
  const dispatch = useDispatch();
  const { cart_items } = useSelector((state) => state.cartUi);

  const handleIncrease = () => {
    const product = cart_items.find((item) => item.id === product_id);
    if (product && product.cartCount < product.quantity_label) {
      dispatch(increaseProduct(product_id));
    }
  };

  const handleDecrease = () => {
    dispatch(decreaseProduct(product_id));
  };

  const product = cart_items.find((item) => item.id === product_id);

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
          sx={{ color: "black", fontSize: "1.5rem" }}
        />
      </IconButton>

      <Typography variant="body1" style={{ margin: "0 8px" }}>
        {product?.cartCount || 1}
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
          sx={{ color: "black", fontSize: "1.5rem" }}
        />
      </IconButton>
    </Box>
  );
};

export default CartAmountToggle2;
