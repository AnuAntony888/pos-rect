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

import Paper from "@mui/material/Paper";

import { useDispatch, useSelector } from "react-redux";

import { Toastsucess, TypographyText } from "../../Reusable";

import { addToCart, setProducts } from "../../Redux/Caruislice";
import { GetItemByCode } from "../../API/APiiteam";
import Itemaddtocart from "./Itemaddtocart";

const ItemBilling = () => {
  const [searchBarcode, setSearchBarcode] = useState("");
  const { itembyitemcode } = GetItemByCode();
  const [ItemCode, setItemCode] = useState("");
  const { cart_items, product_item ,cartTotalAmount } = useSelector((state) => state.cartUi);
  // const cartTotalAmount = useSelector((state) => state.cartUi.cartTotalAmount);
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
      //   console.log(productData?.[0], "prduct");
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
    {txt: "Discount %",},
    { txt: "Tax %", },
    { txt: "Stock", },
    {txt: 'Remove Item'}
  ];

  const handleRemove = () => {
    setItemCode("");
    setCount(1);

    dispatch(setProducts({})); // Reset the product details
    Toastsucess("Fields reset successfully!", "success", "light");
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={2} md={3} sm={9} xs={9}>
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
        <Grid item lg={1} md={1} sm={3} xs={3}>
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
            <Grid item lg={3} md={3} sm={4} xs={4}>
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

        <Grid item lg={1} md={1} sm={3} xs={3}>
          <p></p>{" "}
          <Itemaddtocart
            count={count}
            product_id={products.product_id}
            setCount={setCount}
          />
        </Grid>

        <Grid item lg={1} md={1} sm={3} xs={3}>
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
                    </TableCell>  <TableCell component="th" scope="row">
                      {data.IteamDiscount}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.Iteamstock}
                    </TableCell>               
                   
                    <TableCell component="th" scope="row">
                      {data.ItemTax}
                    </TableCell>
             
                
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemBilling;
