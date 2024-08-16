import React, { useState } from "react";
import { Toastsucess, TypographyText } from "../../Reusable";
import { Box, Button, Grid } from "@mui/material";
import { useAuthContext } from "../../Context/AuthContext";
import { useGetMaster, useMaster } from "../../API/APImaster";


const Master = () => {
  const [entityName, setentityName] = useState(''); 
  const [entityAddress, setentityAddress] = useState('');
  const [tax, settax] = useState('');
  const [discount, setdiscount] = useState('');
  const [itemTax, setitemTax] = useState('');
  const [itemDiscount, setitemDiscount] = useState('');
  const { user, getuserdata } = useAuthContext();
  const { insertmaster } = useMaster(getuserdata)
  const { getmaster } = useGetMaster(getuserdata);
  const handleentityName=(e) => {
     setentityName(e.target.value);
  }
  const handleentityAddress = (e) => {
    setentityAddress(e.target.value);
  }
  const handleTax = (e) => {
    settax(e.target.value);
  }
  const handleDiscount = (e) => {
    setdiscount(e.target.value);
  }
  const handleitemTax = (e) => {
 setitemTax(e.target.value);
  }
   const handleitemDiscount = (e) => {
     setitemDiscount(e.target.value);
     }
 const handleinsertSupplier = async () => {
   if (!entityName || !entityAddress 
      || !tax || !discount || !itemTax || !itemDiscount) 
     {
      Toastsucess("Please fill your Details");
      return;
    }
 
    try {
      const formData = new FormData();
      formData.append("entityName", entityName);
      formData.append("entityAddress", entityAddress);
      formData.append("tax", tax);
      formData.append("discount", discount);
      formData.append("itemTax", itemTax);
      formData.append("itemDiscount", itemDiscount);

   

      const response = await insertmaster(formData);

      Toastsucess(response.message, "sucess", "light");
      setentityName('');
      setentityAddress('');
      settax('');
      setdiscount('');
      setitemTax('');
      setitemDiscount('');

    } catch (error) {
      Toastsucess(error.message);
    }
  };
 
  const handlegetmaster = async () => {
    if (!entityName ) 
      {
       Toastsucess("Please fill your Details");
       return;
     }
  
     try {
       const formData = new FormData();
       formData.append("entityName", entityName);

 
    
 
       const response = await getmaster(formData);
    
       setentityName(response?.masterTabele?.entityName);
       setentityAddress(response?.masterTabele?.entityAddress);
       settax(response?.masterTabele?.tax);
       setdiscount(response?.masterTabele?.discount);
       setitemTax(response?.masterTabele?.itemTax);
       setitemDiscount(response?.masterTabele?.itemDiscount);
       Toastsucess(response?.message, "sucess", "light");
    
 
     } catch (error) {
       Toastsucess(error.message);
     }
   };
  const Invoice = [
    {
      txt: "Entity Name",
      onChange: handleentityName,
      value:entityName
    },
    {
      txt: "Entity Address"
      , onChange: handleentityAddress,
      value: entityAddress
    },
    {
      txt: "tax",
      onChange: handleTax,
      value: tax
    },
    {
      txt: "Discount",
      onChange: handleDiscount,
      value: discount
      },
    {
      txt: "Item Tax ",
      onChange: handleitemTax,
      value: itemTax
    },
    {
      txt: "Item Discount",
      onChange: handleitemDiscount,
      value: itemDiscount
    }
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
            /> <hr />
          </Grid>
          <Grid item lg={4} xs={12} md={12}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: "#48DBE8",
                color: "#fff",
                textAlign: "left",
                width: "100%",
                textTransform: "capitalize",
                margin: "auto",
              }}
              onClick={handlegetmaster}
            >
              Check Master Data
            </Button>
          </Grid>
          
          <Grid item lg={4} xs={12} md={12}>
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
              onClick={handleinsertSupplier}
            >
              Add Master Data
            </Button>
          </Grid>
          <Grid item lg={4} xs={12} md={12}></Grid>

          {Invoice.map((data, index) => (
            <>
              <Grid item lg={4} md={6} sm={6} xs={8} key={index}>
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
              </Grid>
              <Grid item lg={2} md={3} sm={3} xs={3}>
                <p></p>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    bgcolor: "orange",
                    color: "#fff",
                    textAlign: "left",
                    width: "100%",
                    textTransform: "capitalize",
                    margin: "auto",
                  }}
                >
                  Update
                </Button>
              </Grid>
              <Grid item lg={6} md={3} sm={3} xs={1}></Grid>
            </>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Master;
