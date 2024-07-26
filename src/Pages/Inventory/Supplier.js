import React, { useState } from "react";
import { Toastsucess, TypographyText } from "../../Reusable";
import { Button, Grid } from "@mui/material";
import {
  Getsupplier,
  Updatesupplier,
  useDeleteSupplier,
  useSupplierField,
} from "../../API/Apisupplier";

const Supplier = () => {
  const [user_id, setUserId] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const { supplieraddress } = useSupplierField();
  const { supplierdisply } = Getsupplier();
  const { updatesupplierdetails } = Updatesupplier();
  const { deleteSupplierDetails } = useDeleteSupplier();
  const handlesetDescription = (e) => {
    setDescription(e.target.value);
  };
  const handlesetAddress = (e) => {
    setAddress(e.target.value);
  };

  const handlesetUserId = (e) => {
    setUserId(e.target.value);
  };

  const handleinsertSupplier = async () => {
    if (!description || !address) {
      Toastsucess("Please fill your Details");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("SupplierDescription", description);
      formData.append("SupplierAddress", address);

      const response = await supplieraddress(formData);
      // console.log(response.message, "response");
      Toastsucess(response.message, "sucess", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
    setDescription("");
    setAddress("");
  };

  const handlegetsupplier = async () => {
    try {
      if (!user_id) {
        Toastsucess("Please enter a barcode.");
        return;
      }
      const productData = await supplierdisply({ user_id });
      setAddress(productData?.SupplierAddress);
      setDescription(productData?.SupplierDescription);
      console.log(productData, "consoleget supplier");
      Toastsucess("Product fetched successfully!", "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const handleupdatesupplier = async () => {
    try {
      if (!user_id || !description || !address) {
        Toastsucess("Please enter a barcode.");
        return;
      }
      const productData = await updatesupplierdetails({
        user_id,
        SupplierDescription: description,
        SupplierAddress: address,
      });
      setAddress(productData?.SupplierAddress);
      setDescription(productData?.SupplierAddress);
      console.log(productData, "consoleget supplier");
      Toastsucess("Product fetched successfully!", "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
    setUserId("");
    setDescription("");
    setAddress("");
  };

  const handledeletesupplier = async () => {
    try {
      if (!user_id) {
        Toastsucess("Please enter a suppliercode");
        return;
      }

      const productData = await deleteSupplierDetails({ user_id });

      console.log(productData, "consoleget supplier");
      Toastsucess("Product fetched successfully!", "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
    setUserId("");
    setDescription("");
    setAddress("");
  };

  const Invoice = [
    {
      txt: "Supplier Code",
      value: user_id,
      onChange: handlesetUserId,
    },
    {
      txt: "Supplier Description",
      value: description,
      onChange: handlesetDescription,
    },
    {
      txt: "Supplier Address",
      value: address,
      onChange: handlesetAddress,
    },
  ];
  const Buttons = [
    {
      txt: "Check",
      onClick: handlegetsupplier,
    },
    {
      txt: "Add",
      onClick: handleinsertSupplier,
    },
    {
      txt: "Remove",
      onClick: handledeletesupplier,
    },
    {
      txt: "Update",
      onClick: handleupdatesupplier,
    },
  ];
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <TypographyText
            Typography={"Supplier Management"}
            textAlign="left"
            fontSize=".9rem"
          />{" "}
          <hr />
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
              value={data.value}
              onChange={data.onChange}
            />
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
                onClick={data.onClick}
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

export default Supplier;
