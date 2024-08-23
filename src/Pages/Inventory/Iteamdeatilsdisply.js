import React, { useEffect, useState } from "react";
import { GetAllItem, GetAllItemsBySupplierName, useSearchItem } from "../../API/APiiteam";
import { useAuthContext } from "../../Context/AuthContext";

import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GetAllCategory } from "../../API/APIcategory";
import { Toastsucess } from "../../Reusable";

const Iteamdeatilsdisply = () => {
  const { getuserdata } = useAuthContext();
  const [SupplierDescription, setSupplierDescription] = useState();
  GetAllCategory(getuserdata);
  const { data: allitem, refetch } = GetAllItem(getuserdata,SupplierDescription);
  
  const handlesearch = (e) => {
    setSupplierDescription(e.target.value)
  }
  useEffect(() => {
    refetch(); 
  }, [refetch]);

  const handlegetsupplier = async () => {
    try {
      if (!SupplierDescription) {
        Toastsucess("Please enter a Search.");
        return;
      }
   
      const response = await  refetch ();
      Toastsucess(response.error?.error);

    
    } catch (error) {
      Toastsucess(error.message);
    }
  };
  const columns = [
    {
      headerName: "ItemCode",
      field: "ItemCode",
    },
    {
      headerName: "ItemDescription",
      field: "ItemDescription",
    },
    {
      headerName: "Item Supplier",
      field: "ItemSupplier",
    },
    {
      headerName: "Item Category",
      field: "ItemCategory",
    },
    {
      headerName: "Item Unit",
      field: "ItemUnit",
    },
    {
      headerName: "Item Tax",
      field: "ItemTax",
    },
    {
      headerName: "IteamDiscount",
      field: "IteamDiscount",
    },
    {
      headerName: "Iteam Price",
      field: "IteamPrice",
    },
    {
      headerName: "Iteam Stock",
      field: "Iteamstock",
    },
  ];

 

  const data = [];

  if (allitem) {
    allitem.forEach((item) => {
      const existingItem = data.find((i) => i.ItemCode === item.ItemCode);

      if (!existingItem) {
        data.push({
          ItemCode: item.ItemCode,
          ItemDescription: item.ItemDescription,
          ItemSupplier: item.ItemSupplier,
          ItemCategory: item.ItemCategory,
          ItemUnit: item.ItemUnit,
          ItemTax: item.ItemTax,
          IteamDiscount: item.IteamDiscount,
          IteamPrice: item.IteamPrice,
          Iteamstock: item.Iteamstock,
        });
      } else {
        existingItem.ItemSupplier += `, ${item.ItemSupplier}`;
      }
    });
  }
  const handlereset = async () => {
    setSupplierDescription('')
    await refetch();
  }
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item lg={4} md={4} sm={6} xs={12}>
        <input
              required
              style={{
                height: "35px",
                width: "100%",
                border: "none",
                backgroundColor: "#F7F7F7",
              }}
              value={SupplierDescription}
              onChange={handlesearch}
            />
        </Grid>
        <Grid item lg={1} md={2.4} sm={3} xs={6}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor:
                'darkgreen',

              color: "#fff",
              textAlign: "left",
              width: "100%",
              textTransform: "capitalize",
              margin: "auto",
            }}
             onClick={handlegetsupplier}
          >Search</Button>
        </Grid>
        <Grid item lg={1} md={2.4} sm={3} xs={6}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor:
                'orange',

              color: "#fff",
              textAlign: "left",
              width: "100%",
              textTransform: "capitalize",
              margin: "auto",
            }}
             onClick={handlereset}
          >Reset</Button>
        </Grid>
        <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column.field}>{row[column.field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
          </TableContainer>
          </Grid>
        </Grid>
    </div>
  );
};

export default Iteamdeatilsdisply;
