import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { TypographyText } from "../../Reusable";
import { GetAllSupplier } from "../../API/Apisupplier";
import Supplier from "./Supplier";

const IteamManagement = () => {
  const { data: allsupplier, error, isLoading } = GetAllSupplier();
  console.log(allsupplier, "data");
const [selectedSupplier, setSelectedSupplier] = useState(null);
    
  const Invoice3 = [
    {
      txt: "Field 1",
      value: "", // Add initial value or state variable here
      onChange: () => {}, // Add change handler here
    },
    {
      txt: "Field 2",
      value: "", // Add initial value or state variable here
      onChange: () => {}, // Add change handler here
    },
    {
      txt: "Select Supplier",
      value: "", // Add initial value or state variable here
      onChange: () => {}, // Add change handler here
      datas: allsupplier || [],
    },
    // Add more items as needed
  ];

  const Buttons = [
    { txt: "Check" },
    { txt: "Add" },
    { txt: "Remove" },
    { txt: "Update" },
  ];

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <TypographyText
            Typography={"Category Management"}
            textAlign="left"
            fontSize=".9rem"
          />{" "}
          <hr />
        </Grid>

        {Invoice3.map((data, index) => (
          <Grid item lg={1.28}>
            {index === 2 ? (
              <>
                <TypographyText
                  Typography={data.txt}
                  textAlign="left"
                  fontSize=".8rem"
                />

                <FormControl fullWidth size="small">
                  <InputLabel
                    id="location-select-label"
                    sx={{
                      fontFamily: "Poppins !important",
                      fontSize: ".85rem",
                    }}
                  >
                    Select Gender
                  </InputLabel>
                  <Select
                    labelId="location-select-label"
                    id="location-select"
                    value={data.value}
                    onChange={data.onChange}
                    sx={{
                      backgroundColor: "#F7F7F7",
                      fontFamily: "Poppins !important",
                      fontSize: ".9rem",
                    }}
                  >
                    {data?.datas?.map((datas, index) => (
                      <MenuItem key={index} value={datas.SupplierDescription}>
                        {datas.SupplierDescription}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            ) : (
              <>
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
              </>
            )}
          </Grid>
        ))}

        {Buttons.map((data, index) => (
          <>
            <Grid item lg={0.75} md={1} sm={6} xs={6} key={index}>
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
    </div>
  );
};

export default IteamManagement;
