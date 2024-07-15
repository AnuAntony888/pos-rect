import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Redux/Caruislice";
import CartAmountToggle2 from "./CartAmountToggle2";

const AddToCart = (props) => {
  const { productId ,count} = props;

  const dispatch = useDispatch();
  const { cart_items, product_item } = useSelector((state) => state.cartUi);

  const addToCartData = useSelector((state) =>
    state.cartUi.products.find((product) => product.id === productId)
  );
  console.log(addToCartData.id, addToCartData,productId, "add to cart");
  const handleAddToCart = () => {
    const item = cart_items.find((item) => item?.id === addToCartData.id);
    console.log(item,"item")
    if (item && item?.cartCount  + count > addToCartData?.stock) {
      // Handle the case where item quantity exceeds available stock
      return;
    }

    dispatch(addToCart(addToCartData));
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <CartAmountToggle2
            product_id={addToCartData.id}
            productData={addToCartData}
            count={count}
          />
          {/* <CartAmountToggle2 product_id={addToCartData.id} /> */}
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            className="popViewbtn"
            size="large"
            id="addtocart"
            onClick={handleAddToCart}
          >
            Add 
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddToCart;
