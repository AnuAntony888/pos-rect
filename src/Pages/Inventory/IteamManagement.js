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
import {
  GetAllItem,
  GetItemByCode,
  UpdateIteam,
  useDeleteItem,
  useIteamField,
} from "../../API/APiiteam";
import { useAuthContext } from "../../Context/AuthContext";
import { currentTimestamp, GetAllCategory } from "../../API/APIcategory";
import Iteamdeatilsdisply from "./Iteamdeatilsdisply";

const IteamManagement = () => {
  const { getuserdata } = useAuthContext();

  const { data: allsupplier, refetch: refetchSuppliers } = GetAllSupplier(
    getuserdata,
    getuserdata?.master?.master_id
  );
  const { data: allcategorylist, refetch: categoryrefec } = GetAllCategory(
    getuserdata,
    getuserdata?.master?.master_id
  );
  const { refetch: allitemrefech } = GetAllItem(
    getuserdata,
    getuserdata?.master?.master_id
  );

  const { InserItem } = useIteamField(getuserdata);
  const { itembyitemcode } = GetItemByCode(getuserdata);
  const { updateitemdetails } = UpdateIteam(getuserdata);
  const { deleteItemDetails } = useDeleteItem(getuserdata);
  const [ItemCode, setItemCode] = useState("");
  const [ItemDescription, setItemDescription] = useState("");
  const [ItemSupplier, setItemSupplier] = useState([]);
  const [ItemUnit, setItemUnit] = useState("");
  const [ItemTax, setItemTax] = useState("");
  const [IteamDiscount, setIteamDiscount] = useState("");
  const [IteamPrice, setIteamPrice] = useState("");
  const [ItemCategory, setItemCategory] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState([]);
  const [selectedcategory, setselectedcategory] = useState([]);
  const [Iteamstock, setIteamstock] = useState("");
  useEffect(() => {
    if (allsupplier) {
      const initialSupplierList = allsupplier.map((supplier) => ({
        emivalue: supplier.SupplierDescription,
        eminame: supplier.SupplierDescription,
      }));
      setSelectedSupplier(initialSupplierList);
    }
  }, [allsupplier]);

  useEffect(() => {
    if (allcategorylist) {
      const initialSupplierList = allcategorylist.map((supplier) => ({
        emivalue: supplier.CategoryDescription,
        eminame: supplier.CategoryDescription,
      }));
      setselectedcategory(initialSupplierList);
    }
  }, [allcategorylist]);

  // List of unit options
  const unitOptions = [
    { emivalue: "kg", eminame: "Kilogram (kg)" },
    { emivalue: "l", eminame: "Liter (L)" },
    { emivalue: "g", eminame: "Gram (g)" },
    { emivalue: "ml", eminame: "Milliliter (mL)" },
    { emivalue: "pc", eminame: "Piece (pc)" },
    { emivalue: "box", eminame: "Box" },
    // Add more units as needed
  ];

  // console.log(selectedSupplier, "selectedSupplier");
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
  };
  const handleCategory = (e) => {
    setItemCategory(e.target.value);
  };

  const handleinsertItem = async () => {
    if (
      !ItemCode ||
      !ItemDescription ||
      !ItemSupplier ||
      !ItemCategory ||
      !ItemUnit ||
      !ItemTax ||
      !IteamDiscount ||
      !IteamPrice ||
      !Iteamstock
    ) {
      Toastsucess("Please fill your Details");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("ItemCode", ItemCode);
      formData.append("ItemDescription", ItemDescription);
      formData.append("ItemSupplier", ItemSupplier);
      formData.append("ItemCategory", ItemCategory);
      formData.append("ItemUnit", ItemUnit);
      formData.append("ItemTax", ItemTax);
      formData.append("IteamDiscount", IteamDiscount);
      formData.append("IteamPrice", IteamPrice);
      formData.append("Iteamstock", Iteamstock);
      formData.append("created_timestamp", currentTimestamp);
      formData.append("created_by", getuserdata?.name);
      formData.append("master_id", getuserdata?.master?.master_id);

      const response = await InserItem(formData);
      Toastsucess(response.message, "success", "light");
      setItemCode("");
      setIteamDiscount("");
      setItemTax("");
      setItemSupplier("");
      setItemUnit("");
      setItemDescription("");
      setIteamPrice("");
      setIteamstock("");
      allitemrefech();
    } catch (error) {}

    refetchSuppliers();
  };

  const handlegetItemByItemcode = async () => {
    try {
      if (!ItemCode) {
        Toastsucess("Please enter a IteamCode.");
        return;
      }
      const productData = await itembyitemcode({
        ItemCode,
        master_id: getuserdata?.master?.master_id,
      });
      // console.log(productData, "prduct");

      // Extract the item data
      const item = productData?.[0];
      if (item) {
        setIteamDiscount(item.IteamDiscount);
        setIteamPrice(item.IteamPrice);
        setItemDescription(item.ItemDescription);
        setItemTax(item.ItemTax);
        setItemUnit(item.ItemUnit);
        setIteamstock(item.Iteamstock);

        const fetchedSuppliers = productData.map((item) => item.ItemSupplier);

        // console.log(fetchedSuppliers, "fetchedSuppliers");

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

        const fetchedCategory = productData.map((item) => item.ItemCategory);

        // console.log(fetchedSuppliers, "fetchedSuppliers");

        // Handle empty fetchedSuppliers
        if (fetchedCategory.length === 0) {
          console.log("No suppliers found.");
          setItemCategory("");
          return;
        }

        const initialCategoryList = fetchedCategory.map((category) => ({
          emivalue: category,
          eminame: category,
        }));

        setselectedcategory(initialCategoryList);

        // console.log(initialSupplierList, "initialSupplierList");
      }

      Toastsucess("Product fetched successfully!", "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };
  console.log(Iteamstock, selectedSupplier, "itemsupplier");
  const handleupdatesupplier = async () => {
    try {
      if (
        !ItemCode ||
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
      const initialSupplierList = selectedSupplier.map(
        (supplier) => supplier.emivalue
      );

      console.log(initialSupplierList, "initialSupplierList");
      // console.log(initialSupplierList,Iteamstock,"initalsupplierlist")
      const productData = await updateitemdetails({
        ItemCode: ItemCode,
        ItemDescription: ItemDescription,
        ItemSupplier: initialSupplierList,
        ItemUnit: ItemUnit,
        ItemTax: ItemTax,
        IteamDiscount: IteamDiscount,
        IteamPrice: IteamPrice,
        Iteamstock: Iteamstock,
        updated_timestamp: currentTimestamp,
        updated_by: getuserdata?.name,
        master_id: getuserdata?.master?.master_id,
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
      allitemrefech();
      refetchSuppliers();
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
    setIteamstock("");
    refetchSuppliers();
  };

  const handledeletItem = async () => {
    if (!ItemCode) {
      Toastsucess("Please enter a suppliercode");
      return;
    }
    try {
      const formData = new FormData();

      formData.append("ItemCode ", ItemCode);
      formData.append(" deleted_timestamp ", currentTimestamp);
      formData.append(" deleted_by", getuserdata?.name);

      const response = await deleteItemDetails(formData);
      // console.log(response.message, "response");

      Toastsucess(response.message, "sucess", "light");
      setItemCode("");
      setIteamDiscount("");
      setItemTax("");
      setItemSupplier("");
      setItemUnit("");
      setItemDescription("");
      setIteamPrice("");
      setIteamstock("");
      refetchSuppliers();
      allitemrefech();
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const handleResetFields = async () => {
    setItemCode("");
    setIteamDiscount("");
    setItemTax("");
    setItemSupplier("");
    setItemUnit("");
    setItemDescription("");
    setIteamPrice("");
    setIteamstock("");
    await refetchSuppliers(); // Await refetching all suppliers
    const initialSupplierList = allsupplier.map((supplier) => ({
      emivalue: supplier.SupplierDescription,
      eminame: supplier.SupplierDescription,
    }));
    setSelectedSupplier(initialSupplierList);
    await categoryrefec(); // Await refetching all categories
    const initialcategoryList = allcategorylist.map((supplier) => ({
      emivalue: supplier.CategoryDescription,
      eminame: supplier.CategoryDescription,
    }));
    setselectedcategory(initialcategoryList);
  };

  const Invoice3 = [
    {
      txt: "Item Code",
      value: ItemCode,
      onChange: handlesetItemCode,
    },
    {
      txt: "Item Description",
      value: ItemDescription,
      onChange: handlesetItemDescription,
    },
    {
      label: "Item Supplier",
      txt: "Item Supplier",
      value: ItemSupplier,
      onChange: handlesetItemSupplier,
      datas: selectedSupplier,
    },
    {
      label: "Item Category",
      txt: "Item Category",
      value: ItemCategory,
      onChange: handleCategory,
      datas: selectedcategory,
    },
    {
      txt: "Item Unit",
      value: ItemUnit,
      onChange: handlesetItemUnit,
      datas: unitOptions,
    },
    {
      txt: "Item GST",
      value: ItemTax,
      onChange: handlesetItemTax,
    },
    {
      txt: "Item Discount",
      value: IteamDiscount,
      onChange: handlesetIteamDiscount,
    },
    {
      txt: "Item Price",
      value: IteamPrice,
      onChange: handlesetIteamPrice,
    },
    {
      txt: "Item Stock",
      value: Iteamstock,
      onChange: handlIteamstock,
    },
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
      onClick: handledeletItem,
    },
    {
      txt: "Update",
      onClick: handleupdatesupplier,
    },
    {
      txt: "Reset",
      onClick: handleResetFields,
    },
  ];
  console.log(ItemSupplier.length, "handlesetItem");
  
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={12} xs={12}>
          <TypographyText
            Typography={"Iteam Management"}
            textAlign="left"
            fontSize=".9rem"
          />{" "}
          <hr />
        </Grid>

        {Invoice3.map((data, index) => {
          
          console.log(data.value,"data.value"); // Log data to console
          return (
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
                         shrink={false}
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: ".85rem",
                      }}
                    >
{ItemSupplier.length=== 0?'Item Supplier':''}
                    </InputLabel>
                    <Select
                      value={data.value}
                      onChange={data.onChange}
                      disabled={data.disabled}
                      sx={{
                        backgroundColor: "#F7F7F7",
                        fontFamily: "'Poppins', sans-serif",
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
              ) : index === 3 ? (
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
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: ".85rem",
                      }}
                    >
                        {ItemCategory.length === 0 ? 'Item Category' : ''}
                    </InputLabel>
                    <Select
                      value={data.value}
                      onChange={data.onChange}
                      sx={{
                        backgroundColor: "#F7F7F7",
                        fontFamily: "'Poppins', sans-serif",
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
              ) : index === 4 ? (
                <>
                  <TypographyText
                    Typography={data.txt}
                    textAlign="left"
                    fontSize=".8rem"
                  />
                  <FormControl fullWidth size="small">
                    <InputLabel
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: ".85rem",
                      }}
                    >
                      {ItemUnit.length === 0? data.label || data.txt:''}
                    </InputLabel>
                    <Select
                      value={data.value}
                        
                      onChange={data.onChange}
                      disabled={data.disabled}
                      sx={{
                        backgroundColor: "#F7F7F7",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: ".9rem",
                      }}
                    >
                      {data.datas &&
                        data.datas.map((option, index) => (
                          <MenuItem key={index} value={option.emivalue}>
                            {option.eminame}
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
          )
        })}

        {Buttons.map((data, index) => (
          <Grid item lg={1} md={2.4} sm={6} xs={6} key={index}>
            <p></p>
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor:
                  index === 0
                    ? "purple"
                    : index === 1
                    ? "darkgreen"
                    : index === 2
                    ? "darkred"
                    : index === 3
                    ? "#FFCE00"
                    : "#FF7400",
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
        <Grid item xs={12}>
          <Iteamdeatilsdisply />
        </Grid>
      </Grid>
    </div>
  );
};

export default IteamManagement;
