import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { PaymentButton, Toastsucess, TypographyText } from "../../Reusable";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  calculateCartTotal,
  setProducts,
} from "../../Redux/Caruislice";
import ItemBilling from "./ItemBilling";
import { Getcustomer, useCustomerField } from "../../API/APICustomer";
import {
  GetInvoice,
  GetInvoiceNumber,
  useDeleteinvoice,
  useInsertInvoice,
  useUpdateInvoice,
} from "../../API/ApIOrder";
import { useAuthContext } from "../../Context/AuthContext";
import { day, month, useLogout, year } from "../../API/UserApi";
import { useNavigate } from "react-router-dom";
import { currentTimestamp } from "../../API/APIcategory";
import { useMasterdetails } from "../../API/APImaster";

const Billing = () => {
  const { getuserdata } = useAuthContext();
  const dispatch = useDispatch();
  const { masterdetails } = useMasterdetails(
    getuserdata,
    getuserdata.master.entityName,
    true
  );

  const { invoice } = useInsertInvoice(getuserdata);
  const { invoiceupdate } = useUpdateInvoice(getuserdata);
  const { InserCustomer } = useCustomerField(getuserdata);
  const { customerdisply } = Getcustomer(getuserdata);
  const { invoicedisply } = GetInvoice(getuserdata);
  const [customerName, setcustomerName] = useState("");
  const [customerContactNo, setcustomerContactNo] = useState("");
  const [customerTownCity, setcustomerTownCity] = useState("");
  const [customerPin, setcustomerPin] = useState("");
  const [customerGSTN, setcustomerGSTN] = useState("");
  const [customerAddress, setcustomerAddress] = useState("");
  const [customerid, setcustomerid] = useState("");
  const [paymentmethod, setpaymentmethod] = useState("");
  const [status, setstatus] = useState("");
  const [empname, setempname] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const { invoicenumber, refetch } = GetInvoiceNumber(
    getuserdata,
    `${year}-${month}-${day}`
  );
  const { deleteinvoiceDetails } = useDeleteinvoice(getuserdata);

  // useEffect(() => {
  //     dispatch(calculateCartTotal({ master: getuserdata.master }));
  // }, [dispatch, getuserdata?.master]);

  useEffect(() => {
    const fetchInvoiceNumber = async () => {
      try {
        const response = await refetch();
        setInvoiceNumber(response?.data?.invoiceNumber); // Adjust if your API returns a different field
      } catch (error) {
        Toastsucess(error.message, "error", "light");
      }
    };

    fetchInvoiceNumber();
  }, [invoicenumber]);

  const {
    cart_items,
    cartTotalAmount,
    cartActualTotal,
    discountPercentage,
    totalTaxAmount,
    cartGrandTotalAmount,
  } = useSelector((state) => state.cartUi);
  console.log(totalTaxAmount);
  useEffect(() => {
    dispatch(calculateCartTotal({ master: masterdetails?.masterTabele }));
  }, [dispatch, cart_items, masterdetails?.masterTabele]);

  //   dispatch(calculateCartTotal());
  // }, [cart_items, dispatch]);

  const genratedate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const [todaydate, settodaydate] = useState("");
  useEffect(() => {
    // setInvoiceNumber(generateInvoiceNumber());
    settodaydate(genratedate());
    setempname(getuserdata?.name);
  }, []);

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
      !customerContactNo
  
    ) {
      Toastsucess("Please fill Customer Details");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("customerName", customerName);
      formData.append("customerContactNo", customerContactNo);
      formData.append("customerTownCity", customerTownCity?customerTownCity:null);
      formData.append("customerPin", customerPin?customerPin:null);
      formData.append("customerGSTN", customerGSTN?customerGSTN:null);
      formData.append("customerAddress", customerAddress?customerAddress:null);
      const response = await InserCustomer(formData);
      setcustomerid(response.customer_id);
      localStorage.setItem("customer_id", response.customer_id);
      Toastsucess(response.message, "sucess", "light");
      return response;
    } catch (error) {
      Toastsucess(error.message);
    }
  };
  const handlegetsupplier = async () => {
    try {
      if (!customerContactNo) {
        Toastsucess("Please enter a ContactNo");
        return;
      }
      const productData = await customerdisply({ customerContactNo });
      setcustomerName(productData?.customerTabele?.SupplierAddress);
      setcustomerGSTN(productData?.customerTabele?.customerGSTN);
      setcustomerTownCity(productData?.customerTabele?.customerTownCity);
      setcustomerPin(productData?.customerTabele?.customerPin);
      setcustomerName(productData?.customerTabele?.customerName);
      setcustomerAddress(productData?.customerTabele?.customerAddress);

      console.log(productData, "consoleget supplier");
      Toastsucess(productData?.message, "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const handleInvoicenumber = (e) => {
    setInvoiceNumber(e.target.value);
  };

  const Invoice = [
    {
      txt: "Invoice No",
      value: invoiceNumber,
      onChange: handleInvoicenumber,
    },
    {
      txt: "Invoice Date",
      value: todaydate,
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

  const [actual_total, set_actual_total] = useState("");
  const [actual_discount, set_actual_discount] = useState("");
  const [total, settotal] = useState("");
  const [totaltax, settax] = useState("");
  const [totalgrand, settotalgrand] = useState("");
  const { logout } = useLogout(getuserdata);
  const navigate = useNavigate();

  useEffect(() => {
    set_actual_total(cartActualTotal);
    set_actual_discount(discountPercentage);
    settotal(cartTotalAmount);
    settax(totalTaxAmount);
    settotalgrand(cartGrandTotalAmount);
  }, [
    cartActualTotal,
    discountPercentage,
    cartTotalAmount,
    totalTaxAmount,
    cartGrandTotalAmount,
  ]);
  const roundAmount = (value) => {
    const decimalPart = value % 1;
    const integerPart = Math.floor(value);
    return decimalPart > 0.5 ? integerPart + 1 : integerPart;
  };

  const last = [
    { txt: "Net Amount", value: actual_total },
    {
      txt: "Discount ",
      value: actual_discount ? `${actual_discount.toFixed(2)} ` : 0,
    },
    { txt: "Total", value: total },

    { txt: "Empolyee", value: empname },
  ];
  const last2 = [
    { txt: "Total GST", value: totaltax ? `${totaltax.toFixed(2)}` : 0 },
    { txt: "CGST", value: totaltax ? (totaltax / 2).toFixed(2) : "0" },

    { txt: "SGST", value: totaltax ? (totaltax / 2).toFixed(2) : "0" },
    {
      txt: "Total With Tax",
      value: totalgrand ? `${totalgrand.toFixed(2)}` : 0,
    },
    {
      txt: "Round of Amount",
      value: totalgrand ? roundAmount(totalgrand) : 0,
    },
  ];
  const printRef = useRef(null);
       // Preparing separate customer data
       const customerData = {
        customer_name: customerName,
        customer_contact_no: customerContactNo,
        customer_town_city: customerTownCity,
        customer_pin: customerPin,
         customer_gstn: customerGSTN,
        customer_address: customerAddress,
      };
  const handlePrintClick = async () => {
    setstatus("print");
    try {
      if (!invoiceNumber || !cartActualTotal || !todaydate || !paymentmethod) {
        Toastsucess("Please fill Customer Details");
        return;
      }
      try {
        const res = await handleinsertcustomer();
        const formData = new FormData();

        formData.append("employee_id", getuserdata?.userId);
        formData.append("invoice_no", invoiceNumber);
        formData.append("invoice_date", todaydate);
        formData.append("customer_id", res.customer_id);
        formData.append(
          "product_id",
          JSON.stringify(cart_items.map((item) => item.product_id))
        );

        formData.append(
          "cartCount",
          JSON.stringify(cart_items.map((item) => item.cartCount))
        );
        formData.append("product_actual_total", cartActualTotal);
        formData.append("orderstatus", "print");
        formData.append("product_discounted_total", discountPercentage);
        formData.append("product_total", `${cartTotalAmount.toFixed(2)}`);
        formData.append("paymentmethod", paymentmethod);
        formData.append("created_by", getuserdata?.name);
        formData.append("updated_by", getuserdata?.name);
        formData.append("master_id", getuserdata?.master?.master_id);
        const response = await invoice(formData);
        Toastsucess(response.message, "sucess", "light");
    
        // Pass formData to /print page via the navigate 
        
        navigate("/print", {
          state: {
            formData: Object.fromEntries(formData),
            customerData: customerData,
       } });
        // window.print();
      } catch (error) {
        Toastsucess(error.message);
      }
    } catch (error) {
      console.error("Error during print process:", error);
      Toastsucess("An error occurred while processing your request.");
    }
  };

  const handlesaveinvoice = async () => {
    if (!invoiceNumber || !cartActualTotal || !todaydate || !paymentmethod) {
      Toastsucess("Please fill Customer Details");
      return;
    }
    try {
      await refetch();
      const res = await handleinsertcustomer();
      const formData = new FormData();

      formData.append("employee_id", getuserdata?.userId);
      formData.append("invoice_no", invoiceNumber);
      formData.append("invoice_date", todaydate);
      formData.append("customer_id", res.customer_id);
      formData.append(
        "product_id",
        JSON.stringify(cart_items.map((item) => item.product_id))
      );

      formData.append(
        "cartCount",
        JSON.stringify(cart_items.map((item) => item.cartCount))
      );
      formData.append("product_actual_total", cartActualTotal);
      formData.append("orderstatus", "save");
      formData.append("product_discounted_total", discountPercentage);
      formData.append("product_total", `${cartTotalAmount.toFixed(2)}`);
      formData.append("paymentmethod", paymentmethod);
      formData.append("created_by", getuserdata?.name);

      formData.append("master_id", getuserdata?.master?.master_id);

      formData.append("tax", `${totaltax.toFixed(2)}`);
      formData.append("totalWithTax", `${totalgrand.toFixed(2)}`);
      formData.append("roundAmount", roundAmount(totalgrand));
      const response = await invoice(formData);

      Toastsucess(response.message, "sucess", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  /****************************cancel*************************************888 */
  const handlecancelinvoice = async () => {
    if (!invoiceNumber) {
      Toastsucess("Please enter a invoice_no");
      return;
    }
    try {
      const formData = new FormData();

      formData.append("invoice_no", invoiceNumber);
      formData.append("orderstatus", "cancel");

      formData.append(" deleted_by", getuserdata?.name);
      const response = await deleteinvoiceDetails(formData);
      Toastsucess(response.message, "sucess", "light");
      await handleresetinvoice();
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const handleresetinvoice = async () => {
    setcustomerAddress("");
    setcustomerContactNo("");
    setcustomerName("");
    setcustomerPin("");
    setcustomerTownCity("");
    setcustomerGSTN("");
    setpaymentmethod("");
    // Remove individual items
    localStorage.removeItem("totalTaxPercentage");
    localStorage.removeItem("cartTotal");
    localStorage.removeItem("produt_items");
    localStorage.removeItem("lastExternalReferrer");
    localStorage.removeItem("cartActualTotal");
    localStorage.removeItem("customer_id");
    localStorage.removeItem("invoicedetails");
    localStorage.removeItem("cartGrandTotalAmount");
    localStorage.removeItem("discountPercentage");
 // Redirect to /main
 window.location.reload();
  };

  const handlegetinvoice = async () => {
    try {
      if (!invoiceNumber) {
        Toastsucess("Please enter a invoiceNumber.");
        return;
      }
      const productData = await invoicedisply({
        invoice_no: invoiceNumber,
        master_id: getuserdata?.master?.master_id,
      });
      setInvoiceNumber(productData?.invoiceDetails?.[0]?.invoice_no);
      settodaydate(productData?.invoiceDetails?.[0].invoice_date);
      setcustomerName(productData?.customerDetails?.[0]?.customerName);
      setcustomerContactNo(productData?.customerDetails?.[0]?.customerName);
      setcustomerTownCity(productData?.customerDetails?.[0]?.customerTownCity);

      setcustomerPin(productData?.customerDetails?.[0]?.customerPin);
      setcustomerGSTN(productData?.customerDetails?.[0]?.customerGSTN);
      setcustomerAddress(productData?.customerDetails?.[0]?.customerContactNo);
      setpaymentmethod(productData?.invoiceDetails?.[0]?.paymentmethod);
      setempname(productData?.employeeDetails?.[0]?.name);
      localStorage.setItem("invoicedetails", JSON.stringify(productData));

      set_actual_total(productData?.invoiceDetails?.[0]?.product_actual_total);
      set_actual_discount(
        productData?.invoiceDetails?.[0]?.product_discounted_total
      );

      const productfectchdatils = JSON.parse(
        localStorage.getItem("invoicedetails")
      ) || { invoiceDetails: [], productDetails: [] };

      if (
        productfectchdatils.invoiceDetails.length > 0 &&
        productfectchdatils.productDetails.length > 0
      ) {
        const updatedCombinedDetails =
          productfectchdatils.invoiceDetails.map((invoice) => {
            const product = productfectchdatils.productDetails.find(
              (prod) => prod.product_id === invoice.product_id
            );

            return {
              ...invoice, // Include all invoice details
              ...product, // Include all matching product details
            };
          }) || [];

        console.log(updatedCombinedDetails, "updatedCombinedDetails");

        // Dispatch each object separately
        updatedCombinedDetails.forEach((item, index) => {
          console.log(`Dispatching item at position ${index}:`, item);
          dispatch(addToCart(item)); // Pass each object individually to the action
        });
      }

      setstatus(productData?.invoiceDetails?.[0]?.paymentmethod);
      settotal(productData?.invoiceDetails?.[0]?.product_total);

      Toastsucess(productData?.message, "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };
  const handleLogout = async () => {
    try {
      const params = {}; // Replace with any params you need to pass

      // Clear local state
      setcustomerAddress("");
      setcustomerContactNo("");
      setcustomerName("");
      setcustomerPin("");
      setcustomerTownCity("");
      setcustomerGSTN("");
      setpaymentmethod("");

      // Clear local storage
      localStorage.removeItem("totalTaxPercentage");
      localStorage.removeItem("cartTotal");
      localStorage.removeItem("produt_items");
      localStorage.removeItem("lastExternalReferrer");
      localStorage.removeItem("cartActualTotal");
      localStorage.removeItem("customer_id");
      localStorage.removeItem("invoicedetails");

      // Perform the logout API call
      const response = await logout({ params, getuserdata });
      console.log(response?.message, "response")
      
      if (response?.message) {
        console.log(response,"response")
        Toastsucess(response.message, "success", "light");
      } else {

        throw new Error("Logout failed");
      }

    } catch (error) {
      console.log(error.response?.data || error.message);
      Toastsucess(`${error.response?.data || error.message}.`);
    }
  };

  {
    /**********************update invoice*****************************/
  }
  const handleupdateinvoice = async () => {
    if (!invoiceNumber || !cartActualTotal || !todaydate || !paymentmethod) {
      Toastsucess("Please fill Customer Details");
      return;
    }
    try {
      const res = await handleinsertcustomer();
      const formData = new FormData();

      formData.append("employee_id", getuserdata?.userId);
      formData.append("invoice_no", invoiceNumber);
      formData.append("invoice_date", todaydate);
      formData.append("customer_id", res.customer_id);
      formData.append(
        "product_id",
        JSON.stringify(cart_items.map((item) => item.product_id))
      );

      formData.append(
        "cartCount",
        JSON.stringify(cart_items.map((item) => item.cartCount))
      );
      formData.append("product_actual_total", cartActualTotal);
      formData.append("orderstatus", "update");
      formData.append("product_discounted_total", discountPercentage);
      formData.append("product_total", `${cartTotalAmount.toFixed(2)}`);
      formData.append("paymentmethod", paymentmethod);
      formData.append("updated_timestamp", currentTimestamp);
      formData.append("updated_by", getuserdata?.name);
      formData.append("master_id", getuserdata?.master?.master_id);
      formData.append("tax", `${totaltax.toFixed(2)}`);
      formData.append("totalWithTax", `${totalgrand.toFixed(2)}`);
      formData.append("roundAmount", roundAmount(totalgrand));
      const response = await invoiceupdate(formData);

      Toastsucess(response.message, "sucess", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const lastbutton = [
    {
      text: "Save",
      onClick: handlesaveinvoice,
    },
    {
      text: "Update",
      onClick: handleupdateinvoice,
    },
    {
      text: "Print",
      onClick: handlePrintClick,
    },
    {
      text: "Cancel",
      onClick: handlecancelinvoice,
    },
    { text: "Find", onClick: handlegetinvoice },
    {
      text: "New",
      onClick: handleresetinvoice,
    },
    { text: "Exit", onClick: handleLogout },
  ];

  const handleMethodChange = (method) => () => {
    setpaymentmethod(method);
  };

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
                onChange={data.onChange}
              />
            </Grid>
          ))}

          {/**********************second section***************************/}

          <Grid item lg={7} xs={12} md={8} sm={12}>
            <Grid container spacing={2}>
              {Customer.map((data, index) => (
                <Grid item lg={5} xs={12} md={4} sm={4.5} key={index}>
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
                      backgroundColor: "#ECECEC",
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
                  onClick={handlegetsupplier}
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
                      backgroundColor: "#ECECEC",
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
                backgroundColor: "#ECECEC",
              }}
              onChange={handlecustomerAddress}
              value={customerAddress}
            />
          </Grid>
          {/*********************section 3************************ */}
          <Grid item lg={12} xs={12}>
            <TypographyText
              Typography={"Item Information"}
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
                      backgroundColor: "#ECECEC",
                    }}
                  />
                </Grid>
              ))}
              <Grid item lg={3} md={3} sm={6} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    pb: "10px",
                    pt: "10px",
                  }}
                >
                  <PaymentButton
                    method="cash"
                    label="Cash"
                    currentMethod={paymentmethod}
                    onClick={handleMethodChange("cash")}
                  />
                  <PaymentButton
                    method="card"
                    label="Card"
                    currentMethod={paymentmethod}
                    onClick={handleMethodChange("card")}
                  />
                  <PaymentButton
                    method="UPI"
                    label="UPI"
                    currentMethod={paymentmethod}
                    onClick={handleMethodChange("UPI")}
                  />
                </Box>
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
                        backgroundColor: "#ECECEC",
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
                <Grid item lg={2} md={2} sm={4} xs={6}>
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
