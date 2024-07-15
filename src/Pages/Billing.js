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
            />
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
            />
          </Grid>
          <Grid item lg={1.5} md={1.5} sm={9} xs={9}>
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


         
              {selec.map((data, index) => (
                <Grid item xs={index===5?4:2} key={index}>
                  <TypographyText
                    Typography={data.txt}
                    textAlign="left"
                    fontSize=".8rem"
                  />
                </Grid>
              ))}
     

        </Grid>
      </Box>
    </div>
  );
};

export default Billing;
