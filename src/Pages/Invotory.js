import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { TypographyText } from "../Reusable";

const Invotory = () => {
  const Invoice = [
    { txt: "Supplier Code" },
    { txt: "Supplier Description" },
    { txt: "Supplier Address" },
  ];
  const Buttons = [
    { txt: "Check" },
    { txt: "Add" },
    { txt: "Remove" },
    { txt: "Update" },
    ];
    const Invoice2 = [
        { txt: "Category Code" },
        { txt: "Category Description" },
        // {  },
    ];
    const Invoice3 = [
        { txt: "Iteam Code" },
        { txt: "iteam Description" },
        { txt: "iteam Supplier" },
        { txt: "iteam Category" },
        { txt: "iteam Description" },
        { txt: "iteam Supplier" },
        { txt: "iteam Category" },
        // {  },
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
              Typography={"Supplier Management"}
              textAlign="left"
              fontSize=".9rem"
            />  <hr/>
          </Grid>
          {Invoice.map((data, index) => (
            <Grid item lg={index === 0 ? 1.2 : 3.4} xs={12}>
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
          {Buttons.map((data, index) => (
            <>
              <Grid item lg={.75} md={1} sm={6} xs={6} key={index}>
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
          <Grid item lg={12} xs={12}>
   
            <TypographyText
              Typography={"Category Management"}
              textAlign="left"
              fontSize=".9rem"
            />  <hr/>
                  </Grid>
                  {Invoice2.map((data, index) => (
            <Grid item lg={index === 0 ? 1.2 : 3.4} xs={12}>
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
                  <Grid item lg={3.4} xs={12}></Grid>
                  {Buttons.map((data, index) => (
            <>
              <Grid item lg={.75} md={1} sm={6} xs={6} key={index}>
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
                  

                  <Grid item lg={12} xs={12}>

   <TypographyText
     Typography={"Category Management"}
     textAlign="left"
     fontSize=".9rem"
   />   <hr/>
         </Grid>
               
                  {Invoice3.map((data, index) => (
            <Grid item lg={1.28} >
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

          {Buttons.map((data, index) => (
            <>
              <Grid item lg={.75} md={1} sm={6} xs={6} key={index}>
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
        </Grid>
      </Box>
    </div>
  );
};

export default Invotory;
