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
    const [count, setCount] = useState(1);
  const handlesetItemCode = (e) => {
    setItemCode(e.target.value);
  };
    const handlesetCount = (e) => {
     setCount(e.target.value)
 }
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

  const products = useSelector((state) => state.cartUi.products);

  console.log(products, "products");
  const ite = [
    {
      txt: "Item Description",
      value: products?.ItemDescription || "",
    },
    { txt: "Quantity", value: count || "" ,onChange:handlesetCount},
    { txt: "Unit", value: products?.ItemUnit || "" },
    { txt: "Unit Price", value: products?.IteamPrice || "" },
    { txt: "Discount %", value: products?.IteamDiscount || "" },
    { txt: "Tax %", value: products?.ItemTax || "" },
    { txt: "Stock", value: products?.Iteamstock || "" },
    { txt: "Total", value:  count * products?.IteamPrice || "" },
  ];

  const selec = [
    { txt: "ID" },
    { txt: "Title" },
    { txt: "Price" },
    { txt: "Image" },
    { txt: "Action" },
  ];
 

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
          <Itemaddtocart count={count} />
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
            onClick={""}
          >
           Remove
          </Button>
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
                <TableRow>
                  {/* <TableCell component="th" scope="row">
                {products.Product_id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {products.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {products.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {products.unit_price}
                  </TableCell> */}
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell component="th" scope="row">
                    {/* <CarttoAdd productId={products.Product_id} searchBarcode={products}
                      count={products?.cartCount || 1 } /> */}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemBilling;
