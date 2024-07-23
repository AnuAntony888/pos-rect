import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { TypographyText } from "../Reusable";
import { useDispatch, useSelector } from "react-redux";
import { useZxing } from "react-zxing";
import axios from "axios";
import {
  calculateCartTotal,
  setProducts,
  setSelectedProduct,
} from "../Redux/Caruislice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Billing2 from "./Billing2";

const Billing = () => {
  const Invoice = [{ txt: "Invoice No" }, { txt: "Invoice Date" }];
  const Customer = [
    {
      txt: "Customer Name",
      name: "customername",
      type: "text",
    },
    {
      txt: "Customer Contact No",
      name: "customername",
      type: "text",
    },
  ];
  const Customeraddress = [
    {
      txt: "Town/City",
    },
    {
      txt: "PIN",
    },
    {
      txt: "Customer GSTN",
    },
  ];
  const ite = [
    { txt: "Iteam Description" },
    { txt: "Quantity" },
    { txt: "Unit" },
    { txt: "Unit Price" },
    { txt: "Discount %" },
    { txt: "Tax %" },
    { txt: "Total" },
  ];
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cartUi.products);
  const selectedProduct = useSelector((state) => state.cartUi.selectedProduct);
  const cartTotalAmount = useSelector((state) => state.cartUi.cartTotalAmount);
  const cartItems = useSelector((state) => state.cartUi.cart_items);
  const [searchBarcode, setSearchBarcode] = useState("");
  const [result, setResult] = useState("");
  const [showVideoFeed, setShowVideoFeed] = useState(true);
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
      setShowVideoFeed(false);
      setSearchBarcode(result.getText()); // Automatically search when barcode is scanned
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        dispatch(setProducts(response.data.products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);
  useEffect(() => {
    if (searchBarcode) {
      const product = products.find(
        (product) => product.meta.barcode === searchBarcode
      );
      dispatch(setSelectedProduct(product ? product.id : null));
    } else if (result) {
      const product = products.find(
        (product) => product.meta.barcode === result
      );
      dispatch(setSelectedProduct(product ? product.id : null));
    }
  }, [searchBarcode, products, result, dispatch]);

  const handleSearch = () => {
    const product = products.find(
      (product) =>
        product.meta.barcode.toLowerCase() ===
        searchBarcode.trim().toLowerCase()
    );
    dispatch(setSelectedProduct(product ? product.id : null));
  };
  useEffect(() => {
    dispatch(calculateCartTotal());
  }, [dispatch, cartItems]);
  const selectedProductDetails = selectedProduct
    ? products.find((product) => product.id === selectedProduct)
    : null;

  console.log(selectedProductDetails, "selectedProductDetails");

  const selec = [
    { txt: "ID" },
    { txt: "Title" },
    { txt: "Price" },
    { txt: "Image" },
    { txt: "Action" },
  ];

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          p: "3%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={12} xs={12}>
            <TypographyText
              Typography={"Heade Information"}
              textAlign="left"
              fontSize=".9rem"
            />{" "}
            <hr />{" "}
          </Grid>
          {Invoice.map((data, index) => (
            <Grid item lg={3.5} xs={12}>
              <TypographyText
                Typography={data.txt}
                textAlign="left"
                fontSize=".8rem"
              />

              <input
                required
                style={{
                  height: "35px",
                  width: "100%",
                  border: "none",
                  backgroundColor: "#F7F7F7",
                }}
              />
            </Grid>
          ))}

          {/**********************second section***************************/}

          <Grid item lg={7} xs={12} md={7} sm={12}>
            <Grid container spacing={2}>
              {Customer.map((data, index) => (
                <Grid item lg={5} xs={12} md={5} sm={12} key={index}>
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
              ))}
              <Grid item lg={2} md={2} xs={12} sm={12} sx={{ margin: "auto" }}>
                <p></p>
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
                >
                  check
                </Button>
              </Grid>
              {Customeraddress.map((data, index) => (
                <Grid item lg={4} xs={12} md={4} key={index}>
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
              ))}
            </Grid>
          </Grid>
          <Grid item lg={5} xs={12} md={5} sm={12}>
            <TypographyText
              Typography={"Address"}
              textAlign="left"
              fontSize=".8rem"
            />
            <textarea
              name="message"
              rows="10"
              required
              style={{
                border: "none",
                width: "100%",
                backgroundColor: "#F7F7F7",
              }}
            />
          </Grid>
          {/*********************section 3************************ */}
          <Grid item lg={12} xs={12}>
            <TypographyText
              Typography={"Iteam Information"}
              textAlign="left"
              fontSize=".9rem"
            />{" "}
            <hr />
          </Grid>
          <Grid xs={12}>
            <Billing2/>
          </Grid>
          {/* <Grid item lg={1.5} md={1.5} sm={9} xs={9}>
            <TypographyText
              Typography={"Item Code"}
              textAlign="left"
              fontSize=".8rem"
            />

            <input
              type="text"
              //   placeholder="Enter Barcode"
              value={searchBarcode}
              onChange={(e) => setSearchBarcode(e.target.value)}
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
              onClick={handleSearch}
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
              onClick={handleSearch}
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
              onClick={handleSearch}
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
             sssssssssss
                    </TableCell>
      
           
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid> */}
          {/***********************/}

          <Grid item lg={12} xs={12}>
            <TypographyText
              Typography={"Summary"}
              textAlign="left"
              fontSize=".9rem"
            />{" "}
            <hr />
          </Grid>
          {/*********************last section******************************888 */}
          <Grid item xs={12} lg={7} md={7}>
            <Grid container spacing={2}>
              {last.map((data, index) => (
                <Grid item lg={2.5} md={2.2} sm={9} xs={9} key={index}>
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
              ))}
              <Grid item lg={2} md={2}>
                <Box sx={{ pb: "10px" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      bgcolor: "#F7F7F7",
                      color: "black",
                      textAlign: "left",
                      width: "100%",
                      textTransform: "capitalize",
                      margin: "auto",
                      p: "2px",
                    }}
                  >
                    Cash
                  </Button>
                </Box>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    bgcolor: "#F7F7F7",
                    color: "black",
                    textAlign: "left",
                    width: "100%",
                    textTransform: "capitalize",
                    margin: "auto",
                    p: "2px",
                  }}
                >
                  Card
                </Button>
              </Grid>
              {last2.map((data, index) => (
                <>
                  <Grid item lg={index === 3 ? 4 : 2.6} md={2} sm={9} xs={9}>
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
            </Grid>
          </Grid>
          <Grid item xs={12} lg={5} md={5} sx={{ margin: "auto" }}>
            <Grid container spacing={2}>
              {lastbutton.map((data, index) => (
                <Grid item lg={2} md={2} sm={3} xs={3}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      bgcolor: "#F7F7F7",
                      color: "black",
                      textAlign: "left",
                      width: "100%",
                      textTransform: "capitalize",
                      margin: "auto",
                      pt: "25px",
                      pb: "25px",
                    }}
                  >
                    {data.text}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Billing;
const last = [
  { txt: "Discount %" },
  { txt: "Total" },
  { txt: "Net Amount" },
  { txt: "Empolyee" },
];

const last2 = [
  { txt: "Tax %" },
  { txt: "Total With Tax" },
  { txt: "Round of Amount" },

  { txt: "Remark" },
];
const lastbutton = [
  { text: "Save" },
  { text: "Print" },
  { text: "Cancel" },
  { text: "Find" },
  { text: "New" },
  { text: "Exit" },
];
{
  /* <Grid item xs={12} lg={5} md={6}>
            <Grid container spacing={2}>
              {lastbutton.map((data, index) => (
                <Grid item lg={2} md={2} sm={9} xs={9}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      bgcolor: "#F7F7F7",
                      color: "black",
                      textAlign: "left",
                      width: "100%",
                      textTransform: "capitalize",
                      margin: "auto",
                      pt: "10px",
                      pb: "10px",
                    }}
                  >
                    {data.text}
                  </Button>
                </Grid>
              ))}
          
          </Grid> 
      
        </Grid>*/
}
