import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Toastsucess, TypographyText } from "../../Reusable";
import {  calculateCartTotal, decreaseCart, increaseCart, removeProductFromCart, setProducts } from "../../Redux/Caruislice";
import { GetItemByCode } from "../../API/APiiteam";
import Itemaddtocart from "./Itemaddtocart";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useAuthContext } from "../../Context/AuthContext";
const ItemBilling = () => {
  const {  getuserdata } = useAuthContext();
  const [searchBarcode, setSearchBarcode] = useState("");
  const { itembyitemcode } = GetItemByCode(getuserdata);
  const [ItemCode, setItemCode] = useState("");
  const { cart_items, product_item, } = useSelector(
    (state) => state.cartUi
  );
 
  const [count, setCount] = useState(product_item);
  const products = useSelector((state) => state.cartUi.products);
  const handlesetItemCode = (e) => {
    setItemCode(e.target.value);
  };
  const handlesetCount = (e) => {
    const inputValue = e.target.value;
    if (inputValue > products?.Iteamstock) {
      Toastsucess("Product Quantity is Larger than Stock");
    }
    setCount(inputValue);
  };

  console.log(products, "products");
  const handlegetItemByItemcode = async () => {
    try {
      if (!ItemCode) {
        Toastsucess("Please enter a barcode.");
        return;
      }
      const productData = await itembyitemcode({ ItemCode });

      setSearchBarcode(productData?.[0]);

      Toastsucess("Product fetched successfully!", "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (searchBarcode) {
      dispatch(setProducts(searchBarcode));
    }
  }, [searchBarcode, dispatch]);

  const Total = () => {
    if (products?.IteamDiscount > 0) {
      return count * products?.IteamDiscount;
    } else {
      return count * products?.IteamPrice || "";
    }
  };

  const cartTotalAmount = useSelector((state) => state.cartUi.cartTotalAmount);
  useEffect(() => {
    dispatch(calculateCartTotal());
  }, [cart_items]);
  const ite = [
    {
      txt: "Item Description",
      value: products?.ItemDescription || "",
    },
    { txt: "Quantity", value: count || "", onChange: handlesetCount },
    { txt: "Unit", value: products?.ItemUnit || "" },
    { txt: "Unit Price", value: products?.IteamPrice || "" },
    { txt: "Discount %", value: products?.IteamDiscount || "" },
    { txt: "Tax %", value: products?.ItemTax || "" },
    { txt: "Stock", value: products?.Iteamstock || "" },
    { txt: "Total", value: Total() },
  ];

  const selec = [
    { txt: "Item Code" },
    { txt: "Item Description" },
    { txt: "Quantity" },
    { txt: "Unit" },
    { txt: "Unit Price" },
    { txt: "Discount %" },
    { txt: "Tax %" },
    { txt: "Stock" },
    {txt:'Add Item'},
    { txt: "Remove Item" },
    { txt: "Clear Item" },
  ];

  const handleRemove = () => {
    setItemCode("");
    setCount(1);

    dispatch(setProducts({})); // Reset the product details
    Toastsucess("Fields reset successfully!", "success", "light");
  };
  const handleRemoveId = (product_id) => {
    dispatch(removeProductFromCart({ product_id }));
    dispatch(calculateCartTotal());
  };

  const handleIncrease = (product_id) => {
    dispatch(increaseCart({ product_id }));
    dispatch(calculateCartTotal());
  };

  const handleDecrease = (product_id) => {
    dispatch(decreaseCart({ product_id }));
    dispatch(calculateCartTotal());
  };
  return (
 
      <Grid container spacing={2} >
        <Grid item lg={2} md={3} sm={9} xs={12}>
          <TypographyText
            Typography={"Item Code"}
            textAlign="left"
            fontSize=".8rem"
          />

          <input
            type="text"
            value={ItemCode}
            onChange={handlesetItemCode}
            required
            style={{
              height: "35px",
              width: "100%",
              border: "none",
              backgroundColor: "#F7F7F7",
            }}
          />
        </Grid>
        <Grid item lg={1} md={3} sm={3} xs={12}>
          <p></p>{" "}
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
            onClick={(e) => {
              e.preventDefault();
              handlegetItemByItemcode();
            }}
          >
            check
          </Button>
        </Grid>

        {ite.map((data, index) => (
          <>
            <Grid item lg={3} md={3} sm={4} xs={12}>
              <TypographyText
                Typography={data.txt}
                textAlign="left"
                fontSize=".8rem"
              />

              <input
                value={data.value}
                onChange={data.onChange}
                required
                style={{
                  height: "35px",
                  width: "100%",
                  border: "none",
                  backgroundColor: "#F7F7F7",
                }}
              />
            </Grid>
          </>
        ))}

        <Grid item lg={1} md={3} sm={3} xs={12}>
          <p></p>{" "}
          <Itemaddtocart
            count={count}
            product_id={products.product_id}
            setCount={setCount}
          />
        </Grid>

        <Grid item lg={1} md={3} sm={3} xs={12}>
          <p></p>{" "}
          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: "darkred",
              color: "#fff",
              textAlign: "left",
              width: "100%",
              textTransform: "capitalize",
              margin: "auto",
            }}
            onClick={handleRemove}
          >
            Remove
          </Button>
        </Grid>
        <Grid item xs={12}>
          {cartTotalAmount}
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  {selec.map((data, index) => (
                    <TableCell
                      className="shadow-checkoutCardheading"
                      key={index}
                    >
                      {data.txt}
                    </TableCell>
                  ))}{" "}
                </TableRow>
              </TableHead>
              <TableBody>

                {cart_items.map((data) => (
                  <TableRow key={data.product_id}>
                    <TableCell component="th" scope="row">
                      {data.ItemCode}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.ItemDescription}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.cartCount}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.ItemUnit}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.IteamPrice}
                    </TableCell>{" "}
                    <TableCell component="th" scope="row">
                      {data.IteamDiscount}
                    </TableCell>
                
                    <TableCell component="th" scope="row">
                      {data.ItemTax}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.Iteamstock}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <button onClick={() => handleIncrease(data.product_id)}>
                        <AddCircleIcon/>
                    </button>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <button onClick={() => handleDecrease(data.product_id)}>
                        <RemoveCircleIcon/>
                    </button>
                    </TableCell>
                    <TableCell component="th" scope="row">
                    <button onClick={() => handleRemoveId(data.product_id)}><DeleteIcon/></button>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
 
  );
};

export default ItemBilling;
