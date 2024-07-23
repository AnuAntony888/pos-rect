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
import React, { useState } from "react";
import { Toastsucess, TypographyText } from "../Reusable";
import Paper from "@mui/material/Paper";
import { Singleproduct } from "../API/APIproduct";
import { useDispatch, useSelector } from "react-redux";
import AddToCart from "./AddToCart";
const Billing2 = () => {
  const ite = [
    { txt: "Iteam Description" },
    { txt: "Quantity" },
    { txt: "Unit" },
    { txt: "Unit Price" },
    { txt: "Discount %" },
    { txt: "Tax %" },
    { txt: "Total" },
  ];
  const selec = [
    { txt: "ID" },
    { txt: "Title" },
    { txt: "Price" },
    { txt: "Image" },
    { txt: "Action" },
  ];

  const [barcode, setBarcode] = useState("");
  const [searchBarcode, setSearchBarcode] = useState("");
  const { singleproduct, singleproducterror, singleproductisLoading } =
    Singleproduct();

  const handleBarcodeChange = (e) => {
    setBarcode(e.target.value);
  };
  const handleApi = async () => {
    try {
      if (!barcode) {
        Toastsucess("Please enter a barcode.");
        return;
      }

      const productData = await singleproduct({ barcode });
      setSearchBarcode(productData); // Store the response data    await singleproduct({ barcode });

      Toastsucess("Product fetched successfully!", "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };
  const imge = `http://localhost:5000/${searchBarcode?.images?.[0]
    .replace(/\\/g, "/")
    .replace("C:/Users/VBS/Desktop/POS TESTING/Backend/uploads", "uploads")
    .replace(" ", "%20")}`;

  const dispatch = useDispatch();
  const products = useSelector((state) => state.cartUi.products);
  const selectedProduct = useSelector((state) => state.cartUi.selectedProduct);
  const cartTotalAmount = useSelector((state) => state.cartUi.cartTotalAmount);
  const cartItems = useSelector((state) => state.cartUi.cart_items);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={1.5} md={1.5} sm={9} xs={9}>
          <TypographyText
            Typography={"Item Code"}
            textAlign="left"
            fontSize=".8rem"
          />

          <input
            type="text"
            //   placeholder="Enter Barcode"
            value={barcode}
            onChange={handleBarcodeChange}
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
              handleApi();
            }}
          >
            check
          </Button>
        </Grid>

        {ite.map((data, index) => (
          <>
            <Grid item lg={index === 0 ? 1.5 : 1} md={1.5} sm={9} xs={9}>
              <TypographyText
                Typography={data.txt}
                textAlign="left"
                fontSize=".8rem"
              />

              <input
                //   type={data.type}
                //   name={data.name}
                //   value={data.value}
                //   onChange={data.onChange}
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
            onClick={""}
          >
            check
          </Button>
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
            check
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
                  <TableCell component="th" scope="row">
                    {searchBarcode.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {searchBarcode.description}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {searchBarcode.unit_price}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <img
                      src={imge}
                      alt={searchBarcode.name}
                      style={{ width: "100px" }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row"></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default Billing2;
