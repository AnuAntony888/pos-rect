import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toastsucess, TypographyText } from "../Reusable";
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
import ItemBilling from "./Billing/ItemBilling";
import { useCustomerField } from "../API/APICustomer";


const Billing = () => {
  const dispatch = useDispatch();
  const { cart_items } = useSelector((state) => state.cartUi);
  const cartTotalAmount = useSelector((state) => state.cartUi.cartTotalAmount);
  useEffect(() => {
    dispatch(calculateCartTotal());
  }, [cart_items]);
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${day} / ${month} / ${year}`;

  const generateInvoiceNumber = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");
    const randomPart = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number

    return `INV-${year}${month}${day}-${randomPart}`;
  };

  const [invoiceNumber, setInvoiceNumber] = useState("");

  useEffect(() => {
    setInvoiceNumber(generateInvoiceNumber());
  }, []);
  const { InserCustomer } = useCustomerField(); 
  const [customerName, setcustomerName] = useState("");
  const [customerContactNo, setcustomerContactNo] = useState("");
  const [customerTownCity, setcustomerTownCity] = useState("");
  const [customerPin, setcustomerPin] = useState("");
  const [customerGSTN, setcustomerGSTN] = useState("");
  const [customerAddress, setcustomerAddress] = useState("");

  const handlecustomerName = (e) => {
    setcustomerName(e.target.value);
  };

  const handlecustomerContactNo = (e) => {
    setcustomerContactNo(e.target.value);
  };
  const handlecustomerTownCity = (e) => {
    setcustomerTownCity(e.target.value);
  };
  const handlecustomerPin = (e) => {
    setcustomerPin(e.target.value);
  };
  const handlecustomerGSTN = (e) => {
    setcustomerGSTN(e.target.value);
  };
  const handlecustomerAddress = (e) => {
    setcustomerAddress(e.target.value);
  };

  const handleinsertcustomer = async () => {
    if (
      !customerName ||
      !customerContactNo ||
      !customerTownCity ||
      !customerPin ||
      !customerGSTN ||
      !customerAddress
    ) {
      Toastsucess("Please fill Customer Details");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("customerName",customerName);
      formData.append("customerContactNo", customerContactNo);
      formData.append("customerTownCity", customerTownCity);
      formData.append("customerPin", customerPin);
      formData.append("customerGSTN", customerGSTN);
      formData.append("customerAddress",customerAddress);

      const response = await InserCustomer(formData);
      // console.log(response.message, "response");
      Toastsucess(response.message, "sucess", "light");
      setcustomerAddress('');
      setcustomerContactNo('');
      setcustomerName('');
      setcustomerPin('');
      setcustomerTownCity('');
      setcustomerGSTN('');

    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const Invoice = [
    {
      txt: "Invoice No",
      value: invoiceNumber,
    },
    {
      txt: "Invoice Date",
      value: formattedDate,
    },
  ];
  const Customer = [
    {
      txt: "Customer Name",
      type: "text",
      value: customerName,
      onChange:handlecustomerName
    },
    {
      txt: "Customer Contact No",
      value: customerContactNo,
onChange:handlecustomerContactNo,
      type: "text",
    },
  ];
  const Customeraddress = [
    {
      txt: "Town/City",
      value: customerTownCity,
      onChange:handlecustomerTownCity,
    },
    {
      txt: "PIN",
      value: customerPin,
      onChange:handlecustomerPin
    },
    {
      txt: "Customer GSTN",
      value: customerGSTN,
      onChange:handlecustomerGSTN
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
  const last = [
    { txt: "Discount %" },
    { txt: "Total", value: cartTotalAmount },
    { txt: "Net Amount" },
    { txt: "Empolyee" },
  ];

  const selec = [
    { txt: "ID" },
    { txt: "Title" },
    { txt: "Price" },
    { txt: "Image" },
    { txt: "Action" },
  ];
  const lastbutton = [
    {
      text: "Save",
      onClick:handleinsertcustomer
    },
    { text: "Print" },
    { text: "Cancel" },
    { text: "Find" },
    { text: "New" },
    { text: "Exit" },
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
                value={data.value}
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
              onChange={handlecustomerAddress}
              value={customerAddress}
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
          {/* <Grid xs={12}>

            <Billing2/>
          </Grid> */}
          <Grid xs={12}>
            <ItemBilling />
          </Grid>

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
                    value={data.value}
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
                    onClick={data.onClick}
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

const last2 = [
  { txt: "Tax %" },
  { txt: "Total With Tax" },
  { txt: "Round of Amount" },

  { txt: "Remark" },
];

