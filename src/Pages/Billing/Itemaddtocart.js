import { Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/Caruislice';

const Itemaddtocart = (props) => {
    const { count } = props;
    const products = useSelector((state) => state.cartUi.products);
    console.log(count,products,"count");
    const { cart_items } = useSelector((state) => state.cartUi);
    const dispatch = useDispatch();
    const handleAddToCart11 = () => {
        const item = cart_items.find(
          (item) => item?.product_id === products.product_id
        );
        console.log(item, "item");
        if (item && item?.cartCount + count > products?.Iteamstock) {
        }
        dispatch (addToCart({ products }));
    
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
            onClick={handleAddToCart11}
          >
            Add
          </Button>
    </div>
  )
}

export default Itemaddtocart

