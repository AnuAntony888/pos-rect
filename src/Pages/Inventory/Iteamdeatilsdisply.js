import React, { useEffect } from 'react'
import { GetAllItem } from '../../API/APiiteam';
import { useAuthContext } from '../../Context/AuthContext';

import { GetAllCategory } from '../../API/APIcategory';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Iteamdeatilsdisply = () => {
    const { getuserdata } = useAuthContext();
  
      GetAllCategory(getuserdata);
    const { data: allitem, refetch } = GetAllItem(getuserdata);
    useEffect(() => {
        refetch(); // Trigger a refetch if needed
       }, [refetch]);
    console.log(allitem, "allitem ");
    const columns = [{
        headerName: "ItemCode",
        field: "ItemCode"

    },
    {
        headerName: "ItemDescription",
        field: "ItemDescription"

    },
    {
      
        headerName: "Item Supplier",
        field: "ItemSupplier"
   
    },
    {
 
        headerName: "Item Category",
        field: "ItemCategory"

    },
    {
        headerName: "Item Unit",
        field: "ItemUnit"
 
    },
    {
        headerName: "Item Tax",
        field: "ItemTax"
  
    },
    {
        headerName: "IteamDiscount",
        field: "IteamDiscount"
 
    },
    {
        headerName: "Iteam Price",
        field: "ItemPrice"

    },
    {
        headerName: "Iteam Stock",
        field: "ItemStock"
          

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
              ItemPrice: item.IteamPrice,
              ItemStock: item.Iteamstock
            });
          } else {
            existingItem.ItemSupplier += `, ${item.ItemSupplier}`;
          }
        });
      }
  return (
      <div>
          
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
    </div>
  )
}

export default Iteamdeatilsdisply
