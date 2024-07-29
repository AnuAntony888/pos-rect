import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toastsucess, TypographyText } from "../../Reusable";
import { GetAllSupplier } from "../../API/Apisupplier";
import Supplier from "./Supplier";
import { GetItemByCode, useIteamField } from "../../API/APiiteam";

const IteamManagement = () => {
  const { data: allsupplier, refetch  } = GetAllSupplier();
  const { InserItem } = useIteamField();
  const {itembyitemcode } = GetItemByCode();
  const [ItemCode, setItemCode] = useState("");
  const [ItemDescription, setItemDescription] = useState("");
  const [ItemSupplier, setItemSupplier] = useState("");
  const [ItemUnit, setItemUnit] = useState("");
  const [ItemTax, setItemTax] = useState("");
  const [IteamDiscount, setIteamDiscount] = useState("");
  const [IteamPrice, setIteamPrice] = useState("");

  const handlesetItemSupplier = (e) => {
    setItemSupplier(e.target.value);
  };
  const handlesetItemCode = (e) => {
    setItemCode(e.target.value);
  };

  const handlesetItemDescription = (e) => {
    setItemDescription(e.target.value);
  };

  const handlesetItemUnit = (e) => {
    setItemUnit(e.target.value);
  };

  const handlesetItemTax = (e) => {
    setItemTax(e.target.value);
  };
  const handlesetIteamDiscount = (e) => {
    setIteamDiscount(e.target.value);
  };
  const handlesetIteamPrice = (e) => {
    setIteamPrice(e.target.value);
  };

  useEffect(() => {
    refetch(); // Trigger a refetch if needed
  }, [refetch]); // Dependency array includes refetch
  


  const handleinsertItem = async () => {
    if (
      !ItemCode ||
      !ItemDescription ||
      !ItemSupplier ||
      !ItemUnit ||
      !ItemTax ||
      !IteamDiscount ||
      !IteamPrice
    ) {
      Toastsucess("Please fill your Details");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("ItemCode", ItemCode);
      formData.append("ItemDescription", ItemDescription);
      formData.append("ItemSupplier", ItemSupplier);
      formData.append("ItemUnit", ItemUnit);
      formData.append("ItemTax", ItemTax);
      formData.append("IteamDiscount", IteamDiscount);
      formData.append("IteamPrice", IteamPrice);

      const response = await InserItem(formData);
      Toastsucess(response.message, "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
    setItemCode('');
    setIteamDiscount('');
    setItemTax('');
    setItemSupplier('');
    setItemUnit('');
    setItemDescription('');
    setIteamPrice('');
    
    allsupplier();
  };


  const handlegetItemByItemcode = async () => {
    try {
      if (!ItemCode) {
        Toastsucess("Please enter a barcode.");
        return;
      }
      const productData = await itembyitemcode({ ItemCode });
      setIteamDiscount(productData?.[0]?.IteamDiscount);
      setIteamPrice(productData?.[0]?.IteamPrice);
      setItemDescription(productData?.[0]?.ItemDescription)
      setItemDescription(productData?.[0]?.ItemDescription);
      setItemTax(productData?.[0]?.ItemTax);
      setItemUnit(productData?.[0]?.ItemUnit);
      setItemSupplier(productData?.[0]?.ItemSupplier);
      console.log(productData, "consoleget supplier");
      Toastsucess("Product fetched successfully!", "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
 
  };







  const Invoice3 = [
    {
      txt: "ItemCode",
      value: ItemCode,
      onChange: handlesetItemCode,
    },
    {
      txt: "ItemDescription",
      value: ItemDescription,
      onChange: handlesetItemDescription,
    },
    {
      label: "Item Supplier",
      txt: "Item Supplier",
      value: ItemSupplier,
      onChange: handlesetItemSupplier,
      datas: allsupplier
        ? allsupplier.map((supplier) => ({
            emivalue: supplier.SupplierDescription,
            eminame: supplier.SupplierDescription,
          }))
        : [],
    },
    {
      txt: "Item Unit",
      value: ItemUnit,
      onChange: handlesetItemUnit,
    },
    {
      txt: "Item Tax",
      value: ItemTax,
      onChange: handlesetItemTax,
    },
    {
      txt: "IteamDiscount",
      value: IteamDiscount,
      onChange: handlesetIteamDiscount,
    },
    {
      txt: "Iteam Price",
      value: IteamPrice,
      onChange: handlesetIteamPrice,
    },
  ];

  const Buttons = [
    {
      txt: "Check",
      onClick:handlegetItemByItemcode
    },
    {
      txt: "Add",
      onClick: handleinsertItem,
    },
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
          <Grid item lg={1.28} key={index}>
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
                    Item Supplier
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
                    {data.datas.map((datas, index) => (
                      <MenuItem key={index} value={datas.emivalue}>
                        {datas.eminame}
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
                  value={data.value}
                  onChange={data.onChange}
                />
              </>
            )}
          </Grid>
        ))}

        {Buttons.map((data, index) => (
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
        ))}
      </Grid>
    </div>
  );
};

export default IteamManagement;
