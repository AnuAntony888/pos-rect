import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Toastsucess, TypographyText } from "../Reusable";
import { useDispatch, useSelector } from "react-redux";

import { calculateCartTotal } from "../Redux/Caruislice";

import ItemBilling from "./Billing/ItemBilling";
import { useCustomerField } from "../API/APICustomer";

const Billing = () => {
  const dispatch = useDispatch();
  const { cart_items ,cartTotalAmount,cartActualTotal,discountPercentage,totalTaxAmount} = useSelector((state) => state.cartUi);
  // const cartTotalAmount = useSelector((state) => state.cartUi.cartTotalAmount);
  useEffect(() => {
    dispatch(calculateCartTotal());
  }, [cart_items, dispatch]);


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

      formData.append("customerName", customerName);
      formData.append("customerContactNo", customerContactNo);
      formData.append("customerTownCity", customerTownCity);
      formData.append("customerPin", customerPin);
      formData.append("customerGSTN", customerGSTN);
      formData.append("customerAddress", customerAddress);

      const response = await InserCustomer(formData);
      // console.log(response.message, "response");
      Toastsucess(response.message, "sucess", "light");
      setcustomerAddress("");
      setcustomerContactNo("");
      setcustomerName("");
      setcustomerPin("");
      setcustomerTownCity("");
      setcustomerGSTN("");
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
      onChange: handlecustomerName,
    },
    {
      txt: "Customer Contact No",
      value: customerContactNo,
      onChange: handlecustomerContactNo,
      type: "text",
    },
  ];
  const Customeraddress = [
    {
      txt: "Town/City",
      value: customerTownCity,
      onChange: handlecustomerTownCity,
    },
    {
      txt: "PIN",
      value: customerPin,
      onChange: handlecustomerPin,
    },
    {
      txt: "Customer GSTN",
      value: customerGSTN,
      onChange: handlecustomerGSTN,
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
    { txt: "Net Amount" ,value:cartActualTotal},
    { txt: "Discount %" ,value:discountPercentage},
    { txt: "Total", value: cartTotalAmount },

    { txt: "Empolyee" },
  ];

  const selec = [
    { txt: "ID" },
    { txt: "Title" },
    { txt: "Price" },
    { txt: "Image" },
    { txt: "Action" },
  ];
  const printRef = useRef(null);

  const handlePrintClick = () => {
    if (printRef.current) {
      const originalContents = document.body.innerHTML;
      const printContents = printRef.current.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload the page to restore original content
    }
  };
  const lastbutton = [
    {
      text: "Save",
      onClick: handleinsertcustomer,
    },
    { text: "Print" ,onClick:handlePrintClick},
    { text: "Cancel" },
    { text: "Find" },
    { text: "New" },
    { text: "Exit" },
  ];

  const last2 = [
    { txt: "Tax %" ,value:totalTaxAmount},
    { txt: "Total With Tax" },
    { txt: "Round of Amount" },

    { txt: "Remark" },
  ];

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          p: "3%",
        }}
        ref={printRef}
      >
        <Grid container spacing={2} sx={{ padding: "10px" }}>
          <Grid item lg={12} xs={12}>
            <TypographyText
              Typography={"Heade Information"}
              textAlign="left"
              fontSize=".9rem"
            />{" "}
            <hr />{" "}
          </Grid>
          {Invoice.map((data, index) => (
            <Grid item lg={3.5} md={4} sm={6} xs={12}>
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

          <Grid item lg={7} xs={12} md={8} sm={12}>
            <Grid container spacing={2}>
              {Customer.map((data, index) => (
                <Grid item lg={5} xs={12} md={4} sm={4.5}  key={index}>
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
              <Grid item lg={2} md={4} xs={12} sm={3} sx={{ margin: "auto" }}>
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
                <Grid item lg={4} xs={12} md={4} key={index} sm={6}>
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
          <Grid item lg={5} xs={12} md={4} sm={12}>
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

          <Grid item xs={12}>
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
          <Grid item xs={12} lg={7} md={12}>
            <Grid container spacing={2}>
              {last.map((data, index) => (
                <Grid item lg={3} md={3} sm={6} xs={12} key={index}>
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
              <Grid item lg={3} md={3} sm={6} xs={12} >
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
                  <Grid item lg={3} md={3} sm={6} xs={12}>
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
                </>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={5} md={12} sx={{ margin: "auto" }}>
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
