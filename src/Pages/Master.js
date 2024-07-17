import React from "react";
import { TypographyText } from "../Reusable";
import { Box, Button, Grid } from "@mui/material";

const Master = () => {
  const Invoice = [
    { txt: "Entity Name" },
    { txt: "Entity Address" },
    { txt: "Discount" },
    { txt: "Iteam Tax " },
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
          <Grid item lg={6} xs={12} md={12}>
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
            >
              Check Master Data
            </Button>
          </Grid>
          <Grid item lg={6} xs={12} md={12}></Grid>
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
