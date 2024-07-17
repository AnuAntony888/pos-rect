import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { TypographyText } from "../Reusable";

const Employee = () => {
  const Invoice = [
    { txt: "Entity Name" },
    { txt: "Entity Address" },
    { txt: "Discount" },
    { txt: "Iteam Tax " },
  ];
  const Buttons = [
    { txt: "Check" },
    { txt: "Add" },
    { txt: "Remove" },
    { txt: "Update" },
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
              Typography={"Employee Updation"}
              textAlign="left"
              fontSize=".9rem"
            /> <hr />
          </Grid>
          {Invoice.map((data, index) => (
            <>
              <Grid item lg={2} md={2} sm={6} xs={8} key={index}>
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
            </>
          ))}

          {Buttons.map((data, index) => (
            <>
              <Grid item lg={1} md={1} sm={6} xs={8} key={index}>
                <p></p>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    bgcolor:
                      index === 0
                        ? "#48DBE8"
                        : index === 1
                        ? "darkgreen"
                        : index === 2
                        ? "red"
                        : "yellow",

                    color: "#fff",
                    textAlign: "left",
                    width: "100%",
                    textTransform: "capitalize",
                    margin: "auto",
                  }}
                >
                  {data.txt}
                </Button>
              </Grid>
            </>
          ))}
          <Grid item lg={12} xs={12} md={12}>
            <TypographyText
              Typography={"Employee Updation"}
              textAlign="left"
              fontSize=".9rem"
            /> <hr />
          </Grid>
          <Grid item lg={12} md={12}>
            <Box sx={{ pb: "50px", border: "solid gray .5px" }}></Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Employee;
