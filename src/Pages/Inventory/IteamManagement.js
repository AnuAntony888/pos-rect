import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toastsucess, TypographyText } from "../../Reusable";
import { GetAllSupplier } from "../../API/Apisupplier";
import Supplier from "./Supplier";
import { GetItemByCode, UpdateIteam, useDeleteItem, useIteamField } from "../../API/APiiteam";

const IteamManagement = () => {
  const { data: allsupplier, refetch } = GetAllSupplier();
  const { InserItem } = useIteamField();
  const { itembyitemcode } = GetItemByCode();
  const { updateitemdetails } = UpdateIteam();
  const{ deleteItemDetails}=useDeleteItem()
  const [ItemCode, setItemCode] = useState("");
  const [ItemDescription, setItemDescription] = useState("");
  const [ItemSupplier, setItemSupplier] = useState([]);
  const [ItemUnit, setItemUnit] = useState("");
  const [ItemTax, setItemTax] = useState("");
  const [IteamDiscount, setIteamDiscount] = useState("");
  const [IteamPrice, setIteamPrice] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState([]);
  const [Iteamstock, setIteamstock] = useState('');
  console.log(allsupplier, "allsupplier");
  useEffect(() => {
    if (allsupplier) {
      const initialSupplierList = allsupplier.map((supplier) => ({
        emivalue: supplier.SupplierDescription,
        eminame: supplier.SupplierDescription,
      }));
      setSelectedSupplier(initialSupplierList);
    }
  }, [allsupplier]);

  console.log(selectedSupplier, "selectedSupplier");
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
  const handlIteamstock = (e) => {
    setIteamstock(e.target.value);
}
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
      !IteamPrice || !Iteamstock
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
      formData.append("Iteamstock",Iteamstock)

      const response = await InserItem(formData);
      Toastsucess(response.message, "success", "light");
      setItemCode("");
      setIteamDiscount("");
      setItemTax("");
      setItemSupplier("");
      setItemUnit("");
      setItemDescription("");
      setIteamPrice("");
      setIteamstock("")
    } catch (error) {
      console.log(error)
      Toastsucess(error.message);
    }

    refetch();
  };

  // const handlegetItemByItemcode = async () => {
  //   try {
  //     if (!ItemCode) {
  //       Toastsucess("Please enter a barcode.");
  //       return;
  //     }
  //     const productData = await itembyitemcode({ ItemCode });
  //     console.log(productData, "prduct");
  //     setIteamDiscount(productData?.[0]?.IteamDiscount);
  //     setIteamPrice(productData?.[0]?.IteamPrice);
  //     setItemDescription(productData?.[0]?.ItemDescription);
  //     setItemDescription(productData?.[0]?.ItemDescription);
  //     setItemTax(productData?.[0]?.ItemTax);
  //     setItemUnit(productData?.[0]?.ItemUnit);
  //     setIteamstock(productData?.[0]?.Iteamstock)

  //     // const fetchedSuppliers = productData?.[0]?.ItemSupplier
  //     //   ? JSON.parse(productData?.[0]?.ItemSupplier)
  //     //   : [];

  
  //     // Handle empty fetchedSuppliers
  //     if (fetchedSuppliers.length === 0) {
  //       console.log("No suppliers found.");
  //       setItemSupplier("");
  //       return;
  //     }

  //     const initialSupplierList = fetchedSuppliers.map((supplier) => ({
  //       emivalue: supplier,
  //       eminame: supplier,
  //     }));
  //     setSelectedSupplier(initialSupplierList);

  //     // console.log(fetchedSuppliers, "fetchedSuppliers");

  //     Toastsucess("Product fetched successfully!", "success", "light");
  //   } catch (error) {
  //     Toastsucess(error.message);
  //   }
  // };
  const handlegetItemByItemcode = async () => {
    try {
      if (!ItemCode) {
        Toastsucess("Please enter a barcode.");
        return;
      }
      const productData = await itembyitemcode({ ItemCode });
      console.log(productData, "prduct");
  
      // Extract the item data
      const item = productData?.[0];
      if (item) {
        setIteamDiscount(item.IteamDiscount);
        setIteamPrice(item.IteamPrice);
        setItemDescription(item.ItemDescription);
        setItemTax(item.ItemTax);
        setItemUnit(item.ItemUnit);
        setIteamstock(item.Iteamstock);
  
       
              const fetchedSuppliers = productData?.ItemSupplier
        ? productData?.ItemSupplier
        : [];

        console.log(productData?.map(item => item.ItemSupplier),"Itemsupplier");

      // Handle empty fetchedSuppliers
      if (fetchedSuppliers.length === 0) {
        console.log("No suppliers found.");
        setItemSupplier("");
        return;
      }

      const initialSupplierList = fetchedSuppliers.map((supplier) => ({
        emivalue: supplier,
        eminame: supplier,
      }));
      setSelectedSupplier(initialSupplierList);

      // console.log(fetchedSuppliers, "fetchedSuppliers");
      
  
        // setSelectedSupplier(initialSupplierList);
      }
  
      Toastsucess("Product fetched successfully!", "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };
console.log(Iteamstock,selectedSupplier,"itemsupplier")
  const handleupdatesupplier = async () => {
    try {
      if ( !ItemCode ||
        !ItemDescription ||
        !selectedSupplier.length || 
        !ItemUnit ||
        !ItemTax ||
        !IteamDiscount ||
        !IteamPrice ||
        !Iteamstock
      ) {
        Toastsucess("Please fill your Details");
  
        return;
      }
      
    // Convert selectedSupplier to the appropriate format
    const initialSupplierList = selectedSupplier.map((supplier) => supplier.emivalue);

    console.log(initialSupplierList, "initialSupplierList");
      // console.log(initialSupplierList,Iteamstock,"initalsupplierlist")
      const productData = await updateitemdetails({
        ItemCode:ItemCode,
        ItemDescription:ItemDescription,
        ItemSupplier:initialSupplierList,
        ItemUnit:ItemUnit,
        ItemTax:ItemTax,
        IteamDiscount:IteamDiscount,
        IteamPrice:IteamPrice,
        Iteamstock:Iteamstock
      });
      setIteamDiscount(productData?.ItemDescription);
      setIteamPrice(productData?.IteamPrice);
      setItemDescription(productData?.ItemDescription);
      setItemTax(productData?.ItemTax);
      setItemUnit(productData?.ItemUnit);
      setItemSupplier(productData?.ItemSupplier);
      setIteamstock(productData?.Iteamstock);
      console.log(productData, "consoleget supplier");
      Toastsucess(productData?.message, "success", "light");

      refetch();
    } catch (error) {
      Toastsucess(error.message);
    }
    setItemCode("");
    setIteamDiscount("");
    setItemTax("");
    setItemSupplier("");
    setItemUnit("");
    setItemDescription("");
    setIteamPrice("");
    setIteamstock("")
    refetch();
 
  };

  const handledeletItem = async () => {
    try {
      if (!ItemCode) {
        Toastsucess("Please enter a suppliercode");
        return;
      }

      const productData = await deleteItemDetails({ ItemCode });

      console.log(productData, "consoleget supplier");
      Toastsucess(productData?.message, "success", "light");
  
  
    } catch (error) {
      Toastsucess(error.message);
    }
    setItemCode("");
    setIteamDiscount("");
    setItemTax("");
    setItemSupplier("");
    setItemUnit("");
    setItemDescription("");
    setIteamPrice("");
    // refetch();
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
      datas: selectedSupplier,
      //   allsupplier
      // ? allsupplier.map((supplier) => ({
      //     emivalue: supplier.SupplierDescription,
      //     eminame: supplier.SupplierDescription,
      //   }))
      // : []
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
    {
      txt: "Iteam Stock",
      value: Iteamstock,
      onChange:handlIteamstock
    }
  ];

  const Buttons = [
    {
      txt: "Check",
      onClick: handlegetItemByItemcode,
    },
    {
      txt: "Add",
      onClick: handleinsertItem,
    },
    {
      txt: "Remove",
      onClick: handledeletItem
    },
    {
      txt: "Update",
      onClick:handleupdatesupplier
    },
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
          <Grid item lg={3} xs={12} sm={6} md={3} key={index}>
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
                    {Array.isArray(data.datas) &&
                      data.datas.map((datas, index) => (
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
