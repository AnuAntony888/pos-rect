import React, { useEffect, useState } from "react";
import { Toastsucess, TypographyText } from "../../Reusable";
import { Button, Grid } from "@mui/material";
import {
  Checksupplier,
  GetAllSupplier,
  Getsupplier,
  Updatesupplier,
  useAllsupplierlist,
  useDeleteSupplier,
  useSupplierField,
} from "../../API/Apisupplier";
import ReusableDialog from "../../Reuse/ReusableDialog";
import { useAuthContext } from "../../Context/AuthContext";
import { Tabledisply } from "../../Reuse/Reuse";

const Supplier = () => {
  const { user, getuserdata } = useAuthContext();
  const [SupplierCode, setSupplierCode] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
 
  const { supplieraddress } = useSupplierField(getuserdata);
  const { supplierdisply } = Getsupplier(getuserdata);
  const { updatesupplierdetails } = Updatesupplier(getuserdata);
  const { deleteSupplierDetails } = useDeleteSupplier(getuserdata);

  const { suppliercheck } = Checksupplier(getuserdata);

  const { data: supplierlist, refetch } = GetAllSupplier(getuserdata);

  const handlesetDescription = (e) => {
    setDescription(e.target.value);
  };
  const handlesetAddress = (e) => {
    setAddress(e.target.value);
  };

  const handlesetSupplierCode = (e) => {
    setSupplierCode(e.target.value);
  };

  useEffect(() => {
    // Refetch suppliers when component mounts
    refetch();
  }, [refetch]);

  const currentTimestamp = new Date().toISOString();
  const handleCheckSupplier = async () => {
    if (!description || !address) {
      Toastsucess("Please fill in all required details.");
      return;
    }

    try {
      // Call suppliercheck API
      const checkResponse = await suppliercheck({
        SupplierDescription: description,
      });
      console.log(checkResponse.exists, "checkResponse.exists");

      if (checkResponse.exists) {
        // Display popup if the supplier exists
        setDialogContent(
          "Supplier Name already exists. Do you want to proceed?"
        );
        setDialogOpen(true);
      } else {
        // If supplier does not exist, call handleinsertSupplier
        await handleinsertSupplier();
        setDialogOpen(false);
      }
    } catch (error) {
      Toastsucess(
        error.message || "An error occurred while checking the supplier."
      );
    }
  };

  const handleCancelDialog = () => {
    setDialogOpen(false);
  };

  const handleinsertSupplier = async () => {
    if (!description || !address) {
      Toastsucess("Please fill your Details");
      return;
    }

    try {
      const formData = new FormData();
      // Get the current timestamp

      formData.append("SupplierDescription", description);
      formData.append("SupplierAddress", address);
      formData.append("created_timestamp", currentTimestamp);
      formData.append("created_by", getuserdata?.name);

      const response = await supplieraddress(formData);
      // console.log(response.message, "response");
      refetch();
      Toastsucess(response.message, "sucess", "light");
      setDescription("");
      setAddress("");
      // Refetch supplier list after adding a new item
      // refetch();
      setDialogOpen(false);
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const handlegetsupplier = async () => {
    try {
      if (!SupplierCode) {
        Toastsucess("Please enter a barcode.");
        return;
      }
      const productData = await supplierdisply({ SupplierCode });
      setAddress(productData?.supplier?.SupplierAddress);
      setDescription(productData?.supplier?.SupplierDescription);

      console.log(productData, "consoleget supplier");
      Toastsucess(productData?.message, "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const handleupdatesupplier = async () => {
    try {
      if (!SupplierCode || !description || !address) {
        Toastsucess("Please fill your Details");

        return;
      }
      const productData = await updatesupplierdetails({
        SupplierCode,
        SupplierDescription: description,
        SupplierAddress: address,
        updated_timestamp: currentTimestamp,
        updated_by: getuserdata?.name,
      });
      setAddress(productData?.SupplierAddress);
      setDescription(productData?.SupplierAddress);
      // console.log(productData, "consoleget supplier");
      Toastsucess(productData.message, "success", "light");
      // Refetch supplier list after adding a new item
      refetch();
    } catch (error) {
      Toastsucess(error.message);
    }
    setSupplierCode("");
    setDescription("");
    setAddress("");
  };

  const handledeletesupplier = async () => {
    if (!SupplierCode) {
      Toastsucess("Please enter a suppliercode");
      return;
    }
    try {
      const formData = new FormData();

      formData.append("SupplierCode ", SupplierCode);

      formData.append(" deleted_timestamp ", currentTimestamp);
      formData.append(" deleted_by", getuserdata?.name);
      const response = await deleteSupplierDetails(formData);
      // console.log(response.message, "response");

      Toastsucess(response.message, "sucess", "light");
      setSupplierCode("");
      setDescription("");
      setAddress("");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const Invoice = [
    {
      txt: "Supplier Code",
      value: SupplierCode,
      onChange: handlesetSupplierCode,
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
      // onClick: handleinsertSupplier,
      onClick: handleCheckSupplier,
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
  const columns = [
    {
      headerName: "Supplier Code",
      field: "suppliercode"
    },
    {
      headerName: "Supplier Description",
      field: "supplierdescription",
    },
    {
      headerName: "Supplier Address",
      field: "supplieraddress"
    },
  ];

  const data = supplierlist ? supplierlist.map((data) => ({
    suppliercode: `00000${ data.SupplierCode }`,
    supplierdescription: data.SupplierDescription,
    supplieraddress: data.SupplierAddress,
  })) : [];

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
          <Grid item lg={index === 0 ? 1.2 : 3.4} md={4} xs={12}>
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
            <Grid item lg={0.75} md={3} sm={6} xs={6} key={index}>
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
                      ? "darkred"
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
        <Grid item xs={12}>
          <br />
          <Tabledisply
            columns={columns}
            data={data}
          />
        </Grid>
      </Grid>

      <ReusableDialog
        open={dialogOpen}
        onClose={handleCancelDialog}
        title="Confirm Action"
        actions={
          <>
            <Button onClick={handleinsertSupplier} color="primary">
              Confirm
            </Button>
            <Button onClick={handleCancelDialog} color="secondary">
              Cancel
            </Button>
          </>
        }
      >
        <p>{dialogContent}</p>
      </ReusableDialog>
    </div>
  );
};

export default Supplier;
