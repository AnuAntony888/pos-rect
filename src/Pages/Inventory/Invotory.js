import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { TypographyText } from "../../Reusable";
import Supplier from "./Supplier";
import IteamManagement from "./IteamManagement";
import Category from "./Category";

const Invotory = () => {
 
  const Buttons = [
    { txt: "Check" },
    { txt: "Add" },
    { txt: "Remove" },
    { txt: "Update" },
    ];
    const Invoice2 = [
        { txt: "Category Code" },
        { txt: "Category Description" },
    
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
            <Supplier/>
          </Grid>
          <Grid item lg={12} xs={12}>
          <Category/>
        </Grid>
          
                  
                  <Grid item lg={12} xs={12}>
         <IteamManagement/>
        </Grid>
                 
        </Grid>
      </Box>
    </div>
  );
};

export default Invotory;
