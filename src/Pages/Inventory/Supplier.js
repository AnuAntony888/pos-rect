import React, { useState } from 'react'
import { TypographyText } from '../../Reusable'
import { Button, Grid } from '@mui/material'

const Supplier = () => {
    const [userId, setUserId] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');

    const Invoice = [
        {
            txt: "Supplier Code",
            value: '',
            onChange:''

            
         },
        {
            txt: "Supplier Description",
            value: '',
                 onChange:''
        },
        {
            txt: "Supplier Address",
                    value: '',
                 onChange:''
         },
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
                      value={data.value}
                      onChange={data.onChange}
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
    </div>
  )
}

export default Supplier

