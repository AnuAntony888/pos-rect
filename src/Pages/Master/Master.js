import React, { useEffect, useState } from "react";
import { Toastsucess, TypographyText } from "../../Reusable";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAuthContext } from "../../Context/AuthContext";
import { GetAllMaster, useGetMaster, useMaster, useMasterdetails } from "../../API/APImaster";

const Master = () => {
  const [entityName, setentityName] = useState("");
  const [entityAddress, setentityAddress] = useState("");
  const [tax, settax] = useState("");
  const [discount, setdiscount] = useState("");
  const [itemTax, setitemTax] = useState("");
  const [itemDiscount, setitemDiscount] = useState("");
  const {  getuserdata } = useAuthContext();
  const { insertmaster } = useMaster(getuserdata);
  const { masterdetails, masterdetailsrefetch } = useMasterdetails(getuserdata,
    entityName,false
  );
  const { getmaster, isLoadingrefetch } = GetAllMaster(getuserdata);
  useEffect(() => {
    isLoadingrefetch();
  },[isLoadingrefetch])

  // console.log(getmaster,"getmaster")
  const handleentityName = (e) => {
    setentityName(e.target.value);
  };
  const handleentityAddress = (e) => {
    setentityAddress(e.target.value);
  };
  const handleTax = (e) => {
    settax(e.target.value);
  };
  const handleDiscount = (e) => {
    setdiscount(e.target.value);
  };
  const handleitemTax = (e) => {
    setitemTax(e.target.value);
  };
  const handleitemDiscount = (e) => {
    setitemDiscount(e.target.value);
  };
  const handleinsertSupplier = async () => {
    // console.log(entityName,entityAddress,tax,discount,itemTax,itemDiscount,"all console")
    if (
      !entityName || 
      !entityAddress ||
      !tax ||
      !discount ||
      itemTax === undefined || // Check if itemTax is undefined
      itemDiscount === undefined // Check if itemDiscount is undefined
    ) {
      Toastsucess("Please fill your Details");
      return;
    }
    try {
      // console.log(entityName, entityAddress, tax, discount, itemTax, itemDiscount, "all console");
      const formData = new FormData();
      formData.append("entityName", entityName);
      formData.append("entityAddress", entityAddress);
      formData.append("tax", tax);
      formData.append("discount", discount);
      formData.append("itemTax", itemTax);
      formData.append("itemDiscount", itemDiscount);

      const response = await insertmaster(formData);

      Toastsucess(response.message, "sucess", "light");
      isLoadingrefetch();
      setentityName("");
      setentityAddress("");
      settax("");
      setdiscount("");
      setitemTax("");
      setitemDiscount("");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  
  const fetchMasterDetails = async () => {
    try {
      await masterdetailsrefetch();

      setentityName(masterdetails.masterTabele.entityName);
      setentityAddress(masterdetails.masterTabele.entityAddress);
      settax(masterdetails.masterTabele.tax);
      setdiscount(masterdetails.masterTabele.discount);
      setitemTax(masterdetails.masterTabele.itemTax);
      setitemDiscount(masterdetails.masterTabele.itemDiscount);
      isLoadingrefetch();
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const Reset = () => {
    isLoadingrefetch();
    setentityName("");
    setentityAddress("");
    settax("");
    setdiscount("");
    setitemTax("");
    setitemDiscount("");
    
  }
  const valutax = [
    { emivalue: 1, eminame: "yes" },
    { emivalue: 0, eminame: "No" },

    // Add more units as needed
  ];
  const valudiscount = [
    { emivalue: 1, eminame: "yes" },
    { emivalue: 0, eminame: "No" },

    // Add more units as needed
  ];


  const Invoice = [
    {
      txt: "Entity Name",
      onChange: handleentityName,
      value: entityName,
    },
    {
      txt: "Entity Address",
      onChange: handleentityAddress,
      value: entityAddress,
    },
    {
      txt: "GST",
      onChange: handleTax,
      value: tax,
    },
    {
      txt: "Discount",
      onChange: handleDiscount,
      value: discount,
    },
    {
      txt: "Item GST ",
      onChange: handleitemTax,
      value: itemTax,
      datas: valutax ,
    },
    {
      txt: "Item Discount",
      onChange: handleitemDiscount,
      value: itemDiscount,
      datas: valudiscount ,
    },
  ];

  const Buttn = [
    {
      txt: "Check Master Data",
      onClick: fetchMasterDetails,
    },
    {
      txt: "Add Master Data",
      onClick: handleinsertSupplier ,
    },
    {
      txt: "Update Master Data",
      onClick: handleinsertSupplier ,
    },

    {
      txt: "Reset",
      onClick: Reset ,
    },
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
          <Grid item lg={12} xs={12} md={12}>
            <TypographyText
              Typography={"Heade Information"}
              textAlign="left"
              fontSize=".9rem"
            />{" "}
            <hr />
          </Grid>

          {Invoice.map((data, index) => (
            <>
              <Grid item lg={4} md={6} sm={6} xs={8} key={index}>
                {index === 4 ? (
                  <>
                    <TypographyText
                      Typography={data.txt}
                      textAlign="left"
                      fontSize=".8rem"
                    />
                    <FormControl fullWidth size="small">
                      <InputLabel
                        sx={{
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: ".85rem",
                        }}
                        shrink={false}
                      >
                        {itemTax.length===0?
                        data.label || data.txt:''}
                      </InputLabel>
                      <Select
                        value={data.value}
                        onChange={data.onChange}
                        disabled={data.disabled}
                        sx={{
                          backgroundColor: "#F7F7F7",
                          fontFamily: "'Poppins', sans-serif",
                          fontSize: ".9rem",
                        }}
                      >
                        {data.datas &&
                          data.datas.map((option, index) => (
                            <MenuItem key={index} value={option.emivalue}>
                              {option.eminame}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </>
                ) :index===5?(<>
                  <TypographyText
                    Typography={data.txt}
                    textAlign="left"
                    fontSize=".8rem"
                  />
                  <FormControl fullWidth size="small">
                    <InputLabel
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: ".85rem",
                        }}
                        shrink={false}
                    >
                        {itemDiscount.length===0?
                          data.label || data.txt:''}
                    </InputLabel>
                    <Select
                      value={data.value}
                      onChange={data.onChange}
                      disabled={data.disabled}
                      sx={{
                        backgroundColor: "#F7F7F7",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: ".9rem",
                      }}
                    >
                      {data.datas &&
                        data.datas.map((option, index) => (
                          <MenuItem key={index} value={option.emivalue}>
                            {option.eminame}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </>):
                  (
                  <>
                    <TypographyText
                      Typography={data.txt}
                      textAlign="left"
                      fontSize=".9rem"
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
                  </>
                )}
              </Grid>
            </>
          ))}
          {Buttn.map((data, index) => (
            <Grid item lg={3} xs={6} md={4} sm={6}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  bgcolor:
                index === 0
                ? "purple"
                : index === 1
                ? "darkgreen"
                : index === 2
                ? "#FFCE00"
                    : index === 3?
                    "#FF7400":'#FF7400',
                color: "#fff",
                  textAlign: "left",
                  width: "100%",
                  textTransform: "capitalize",
                  margin: "auto",
                }}
                onClick={data.onClick}
              >
                {data.txt}
              </Button>
            </Grid>
          ))}
          <Grid item lg={12} md={12}>
            <TableContainer component={Paper}>
              <Table  aria-label="caption table">
                <TableHead>
                  <TableRow>
                    {EmployeeDetails.map((data, index) => (
                      <TableCell
                        className="shadow-checkoutCardheading"
                        key={index}
                      >
                        {data.txt}
                      </TableCell>
                    ))}{" "}
                  </TableRow>
                </TableHead>
                <TableBody >
                  {getmaster?.map((data) => (
                    <TableRow key={data.product_id}>
                      <TableCell component="th" scope="row">
                        {data.entityName}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.entityAddress}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.tax}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.discount}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.itemTax ===1?"yes":"No"
                        }
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.itemDiscount
 ===1?"yes":"No"
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Master;
const EmployeeDetails = [
  {
    txt: "Entity Name",
  },
  {
    txt: "Entity Address",
  },
  {
    txt: "GST",
  },
  {
    txt: "Discount",
  },
  {
    txt: "Item GST",
  },
  {
    txt: "Item Discount",
  },
];
