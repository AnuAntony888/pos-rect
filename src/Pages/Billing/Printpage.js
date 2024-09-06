import React, { useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import { TypographyText } from "../../Reusable";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateCartTotal } from "../../Redux/Caruislice";
import { useAuthContext } from "../../Context/AuthContext";
import { useMasterdetails } from "../../API/APImaster";

const Printpage = () => {
  const { getuserdata } = useAuthContext();
  const dispatch = useDispatch();
  const { masterdetails } = useMasterdetails(
    getuserdata,
    getuserdata.master.entityName,
    true
  );
  const location = useLocation();
  const { formData, customerData } = location.state; // Access the passed formData
  console.log(formData, customerData);
  // useEffect(() => {
  //   // Automatically trigger print when the component is rendered
  //   window.print();
  // }, []);
  const {
    cart_items,
    cartTotalAmount,
    cartActualTotal,
    discountPercentage,
    totalTaxAmount,
    cartGrandTotalAmount,
  } = useSelector((state) => state.cartUi);
  console.log(totalTaxAmount, cart_items, "cart");
  useEffect(() => {
    dispatch(calculateCartTotal({ master: masterdetails?.masterTabele }));
  }, [dispatch, cart_items, masterdetails?.masterTabele]);


  const Data = [
    {
      txt: "Invoice",

      company1: "Smart Billing",
      company2: "123 Company St, City, State, ZIP",
      company3: "(123) 456-7890",
      company4: "info@yourcompany.com",
      company5: "info@yourcompany.com",
      invoiceNo: formData?.invoice_no,
      invoiceDate: formData?.invoice_date,
      customerName: customerData?.customer_name,
      customerContactNo: customerData?.customer_contact_no,
      customerAddress: customerData?.customer_address,
      customerTownCity: customerData?.customer_town_city,
      customerPin: customerData?.customer_pin,
      customerGSTN: customerData?.customer_gstn,
      totalTaxAmount:totalTaxAmount
    }, // Include rows here
  ];

  return (
    <Box sx={{ padding: "5%" }}>
      {Data.map((data, index) => (
        <Grid
          container
          spacing={2}
          key={index}
          sx={{
            border: "solid .5px black",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              borderBottom: ".5px solid black",
            }}
          >
            <TypographyText
              Typography={data.txt}
              fontWeight="600"
              variant="h4"
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              borderBottom: ".5px solid black",
            }}
          >
            <TypographyText
              Typography={data.company1}
              fontWeight="600"
              textAlign="left"
              fontSize="1.3rem"
            />
            <TypographyText
              Typography={data.company2}
              textAlign="left"
              fontSize=".8rem"
            />
            <TypographyText
              Typography={data.company3}
              textAlign="left"
              fontSize=".8rem"
            />
            <TypographyText
              Typography={data.company4}
              textAlign="left"
              fontSize=".8rem"
            />

            <br />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              borderBottom: ".5px solid black",
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={6} >
              <TypographyText
              Typography={"Invoice No"}
              textAlign="left"
              fontSize=".8rem"
            />
  
  </Grid>
              <Grid item xs={6}>
              <TypographyText
              Typography= {data.invoiceNo}
              textAlign="left"
              fontSize=".8rem"
            />
 
              </Grid>
              <Grid item xs={6} >
              <TypographyText
              Typography={" Invoice Date"}
              textAlign="left"
              fontSize=".8rem"
            />
  
  </Grid>
              <Grid item xs={6}>
              <TypographyText
              Typography= {data.invoiceDate}
              textAlign="left"
              fontSize=".8rem"
            />
  
  </Grid>

</Grid>
         
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
           
              borderBottom: ".5px solid black",
            }}
          >
          
<Grid container spacing={0}>
  <Grid item xs={6}>
    <TypographyText
      Typography="Customer Name"
      textAlign="left"
      fontSize=".8rem"
    />
  </Grid>
  <Grid item xs={6}>
    <TypographyText
      Typography={data.customerName}
      textAlign="left"
      fontSize=".8rem"
    />
  </Grid>

  <Grid item xs={6}>
    <TypographyText
      Typography="Customer Contact No"
      textAlign="left"
      fontSize=".8rem"
    />
  </Grid>
  <Grid item xs={6}>
    <TypographyText
      Typography={data.customerContactNo}
      textAlign="left"
      fontSize=".8rem"
    />
  </Grid>

  <Grid item xs={6}>
    <TypographyText
      Typography="Town/City"
      textAlign="left"
      fontSize=".8rem"
    />
  </Grid>
  <Grid item xs={6}>
    <TypographyText
      Typography={data.customerTownCity}
      textAlign="left"
      fontSize=".8rem"
    />
  </Grid>

  <Grid item xs={6}>
    <TypographyText Typography="PIN" textAlign="left" fontSize=".8rem" />
  </Grid>
  <Grid item xs={6}>
    <TypographyText
      Typography={data.customerPin}
      textAlign="left"
      fontSize=".8rem"
    />
  </Grid>

  <Grid item xs={6}>
    <TypographyText
      Typography="Address"
      textAlign="left"
      fontSize=".8rem"
    />
  </Grid>
  <Grid item xs={6}>
    <TypographyText
      Typography={data.customerAddress}
      textAlign="left"
      fontSize=".8rem"
    />
  </Grid>

  <Grid item xs={6}>
    <TypographyText
      Typography="Customer GSTN"
      textAlign="left"
      fontSize=".8rem"
    />
  </Grid>
  <Grid item xs={6}>
    <TypographyText
      Typography={data.customerGSTN}
      textAlign="left"
      fontSize=".8rem"
    />
  </Grid>
</Grid>


            <br />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ paddingLeft: "0 !important", paddingTop: "0 !important" }}
          >
            <Paper style={{ width: "100%", overflow: "hidden" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ItemCode</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell> Quntity</TableCell>
                    <TableCell>Unit Price</TableCell>
                    {/* <TableCell>Item Unit</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart_items?.length > 0 ? (
                    cart_items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.ItemCode}</TableCell>
                        <TableCell>{item.ItemDescription}</TableCell>
                        <TableCell>{item.cartCount}</TableCell>
                        <TableCell>{item.IteamPrice}</TableCell>
                        {/* <TableCell>{item.ItemUnit}</TableCell> */}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No items in the cart
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
           
              borderTop: ".5px solid black",
            }}
          ><Grid container spacing={0}>
                <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <TypographyText
              Typography="Net Total"
              textAlign="left"
              fontSize=".8rem"
            />
              </Grid>
              <Grid item xs={3}>
            <TypographyText
                  Typography={data.totalTaxAmount}
              textAlign="left"
              fontSize=".8rem"
            />
              </Grid>
              <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <TypographyText
              Typography="Net Total"
              textAlign="left"
              fontSize=".8rem"
            />
              </Grid>
              <Grid item xs={3}>
            <TypographyText
                  Typography={data.totalTaxAmount}
              textAlign="left"
              fontSize=".8rem"
            />
              </Grid>
              </Grid>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default Printpage;
