import React, { useEffect, useState } from "react";
import { Toastsucess, TypographyText } from "../../Reusable";
import { Button, Grid } from "@mui/material";

import { useAuthContext } from "../../Context/AuthContext";
import {
  Checkcategory,
  currentTimestamp,
  GetAllCategory,
  GetCategory,
  UpdateCategory,
  useCategoryField,
  useDeleteCategory,
} from "../../API/APIcategory";
import ReusableDialog from "../../Reuse/ReusableDialog";
import { Tabledisply } from "../../Reuse/Reuse";

const Category = () => {
  const { getuserdata } = useAuthContext();
  const [CategoryCode, setCategoryCode] = useState("");
  const [CategoryDescription, setCategoryDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const { category } = useCategoryField(getuserdata);
  const { getcategorydisply } = GetCategory(getuserdata);
  const { categorycheck } = Checkcategory(getuserdata);
  const { deletecategoryDetails } = useDeleteCategory(getuserdata);
  const { updatecategorydetails } = UpdateCategory(getuserdata);
  const { data: allcategorylist, refetch } = GetAllCategory(
    getuserdata,
    getuserdata?.master?.master_id
  );
  useEffect(() => {
    // Refetch suppliers when component mounts
    refetch();
  }, [refetch]);
  const handleCategoryCode = (e) => {
    setCategoryCode(e.target.value);
  };
  const handleCategoryDescription = (e) => {
    setCategoryDescription(e.target.value);
  };

  const handleinsertcategory = async () => {
    if (!CategoryDescription) {
      Toastsucess("Please fill your Details");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("CategoryDescription", CategoryDescription);
      formData.append("created_timestamp", currentTimestamp);
      formData.append("created_by", getuserdata?.name);
      formData.append("master_id", getuserdata?.master?.master_id);
      const response = await category(formData);
      refetch();
      Toastsucess(response.message, "sucess", "light");
      setDialogOpen(false);
      setCategoryCode("");
      setCategoryDescription("");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const handlegetcategory = async () => {
    if (!CategoryCode) {
      Toastsucess("Please fill your Details");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("CategoryCode", CategoryCode);
      formData.append("master_id", getuserdata?.master?.master_id);
      const response = await getcategorydisply(formData);
      setCategoryCode(response?.category?.CategoryCode);
      setCategoryDescription(response?.category?.CategoryDescription);
      Toastsucess(response.message, "sucess", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const handledeletecategory = async () => {
    if (!CategoryCode) {
      Toastsucess("Please fill your Details");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("CategoryCode", CategoryCode);

      formData.append(" deleted_timestamp ", currentTimestamp);
      formData.append(" deleted_by", getuserdata?.name);
      const response = await deletecategoryDetails(formData);
      Toastsucess(response.message, "sucess", "light");
      refetch();
      setCategoryCode("");
      setCategoryDescription("");
    } catch (error) {
      Toastsucess(error.message);
    }
  };
  const handleCheckcategory = async () => {
    if (!CategoryDescription) {
      Toastsucess("Please fill in all required details.");
      return;
    }
    try {
      // Call suppliercheck API
      const formData = new FormData();
      formData.append("CategoryDescription", CategoryDescription);

      const checkResponse = await categorycheck(formData);
      if (checkResponse.exists) {
        setDialogContent(
          "Category Name already exists. Do you want to proceed?"
        );
        setDialogOpen(true);
      } else {
        await handleinsertcategory();
        setDialogOpen(false);
      }
    } catch (error) {
      Toastsucess(
        error.message || "An error occurred while checking the supplier."
      );
    }
  };

  const handleupdatecategory = async () => {
    if (!CategoryCode) {
      Toastsucess("Please fill your Details");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("CategoryCode", CategoryCode);
      formData.append("CategoryDescription", CategoryDescription);
      formData.append("updated_timestamp", currentTimestamp);
      formData.append("updated_by", getuserdata?.name);
      formData.append("master_id", getuserdata?.master?.master_id);
      const response = await updatecategorydetails(formData);
      Toastsucess(response.message, "sucess", "light");
      refetch();
      setCategoryCode("");
      setCategoryDescription("");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const handleCancelDialog = () => {
    setDialogOpen(false);
  };
  const Invoice = [
    {
      txt: "Category Code",
      value: CategoryCode,
      onChange: handleCategoryCode,
    },
    {
      txt: "Category  Description",
      value: CategoryDescription,
      onChange: handleCategoryDescription,
    },
  ];
  const Buttons = [
    {
      txt: "Check",
      onClick: handlegetcategory,
    },
    {
      txt: "Add",
      onClick: handleCheckcategory,
    },
    {
      txt: "Remove",
      onClick: handledeletecategory,
    },
    {
      txt: "Update",
      onClick: handleupdatecategory,
    },
  ];
  const columns = [
    {
      headerName: "Category Code",
      field: "categorycode",
    },
    {
      headerName: "Category Description",
      field: "categorydescription",
    },
  ];

  const data = allcategorylist
    ? allcategorylist.map((data) => ({
        categorycode: `00000${data.CategoryCode}`,
        categorydescription: data.CategoryDescription,
      }))
    : [];
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
          <Tabledisply columns={columns} data={data} />
        </Grid>
      </Grid>
      <ReusableDialog
        open={dialogOpen}
        onClose={handleCancelDialog}
        title="Confirm Action"
        actions={
          <>
            <Button onClick={handleinsertcategory} color="primary">
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

export default Category;
