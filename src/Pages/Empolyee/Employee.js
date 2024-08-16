import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toastsucess, TypographyText } from "../../Reusable";
import { DeleteEmployee, GetAllEmployes, GetEmpolyee, UpdateEmployee, useRegister } from "../../API/UserApi";
import { useAuthContext } from "../../Context/AuthContext";

const Employee = () => {
  const generateInvoiceNumber = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");
    const randomPart = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
    return `EMP-${year}${month}${day}-${randomPart}`;
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeno, setemployeeno] = useState();
  const [employeecategory, setemployeecategory] = useState();
  const [employeestatus, setemployeestatus] = useState();
  const [errors, setErrors] = useState({});
  const { getuserdata } = useAuthContext();
  const { register } = useRegister();
  const { data ,refetch} = GetAllEmployes(getuserdata)
  useEffect(() => {
    // Refetch suppliers when component mounts
    refetch();
  }, [refetch]);
  const { getemployeedisply } = GetEmpolyee(getuserdata);
  const { updateemployeedetails } = UpdateEmployee(getuserdata);
  const { deleteeemployeedetails }= DeleteEmployee(getuserdata)
  const handleName = (e) => {
    if (!e.target.value) {
      setErrors((prev) => ({ ...prev, name: "name is required!" }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
    setName(e.target.value);
  };

  const handlemployeecategory = (e) => {
    setemployeecategory(e.target.value);
  };
  useEffect(() => {
    setemployeestatus("employee");
    setemployeeno(generateInvoiceNumber());
  }, []);

  const handleEmail = (e) => {
    const value = e.target.value;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    let errorMsg = "";

    if (!value) {
      errorMsg = "Email is required!";
    } else if (!regex.test(value)) {
      errorMsg = "This is not a valid email format!";
    }

    setErrors((prev) => ({ ...prev, email: errorMsg }));
    setEmail(value);
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    let errorMsg = "";

    if (!value) {
      errorMsg = "Password is required";
    }

    setErrors((prev) => ({ ...prev, password: errorMsg }));
    setPassword(value);
  };

  const Data = [
    {
      txt: "Employee Name",
      name: "name",
      type: "text",
      onChange: handleName,
      value: name,
    },
    {
      txt: "Employee No",

      value: employeeno,
    },
    {
      txt: "Employee Category",
      type: "text",
      onChange: handlemployeecategory,
      value: employeecategory,
    },
    {
      txt: "Employee Email",
      name: "email",
      type: "text",
      onChange: handleEmail,
      value: email,
    },
    {
      txt: "Employee Password",
      name: "password",
      type: "password",
      onChange: handlePassword,
      value: password,
    },
  ];
  const handleApi = async () => {
    try {
      if (!name || !email || !password) {
        Toastsucess("Please Enter Name, Email, and Password!");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!emailRegex.test(email)) {
        Toastsucess("Please Enter a Valid Email Address!");
        return;
      }
      const userData = await register({
        name,
        email,
        password,
        employeeno,
        employeecategory,
        employeestatus,
      });
      Toastsucess("Sucessfully Registered ! ", "sucess", "light");
      setName("");
      setEmail("");
      setPassword("");
      setemployeecategory("");
      refetch();
      // setemployeeno("");
    } catch (error) {
      if (error.response && error.response.data) {
        Toastsucess(`Error: ${error.response?.data || error.message}`);
      } else {
        Toastsucess(`${error.response?.data || error.message}.`);
      }
    }
  };
  const handlegetsupplier = async () => {
    try {
      if (!email) {
        Toastsucess("Please enter a email");
        return;
      }
      const productData = await getemployeedisply({ email });
      setName(productData?.name);
      setEmail(productData?.email);
      // setPassword(productData?.password);
      setemployeecategory(productData?.employeecategory);
      setemployeeno(productData?.employeeno);
      console.log(productData, "consoleget supplier");
      Toastsucess(productData?.message, "success", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const handleupdatesupplier = async () => {
    try {
      if (!name || !email || !employeecategory || !employeeno) {
        Toastsucess("Please fill your Details");

        return;
      }
      const productData = await updateemployeedetails({
        email,
        name,
        employeeno,
        employeecategory,
        employeestatus,
      });

      // console.log(productData, "consoleget supplier");
      Toastsucess(productData.message, "success", "light");
      setEmail("");
      setName("");
      setemployeeno("");
      setemployeecategory("");
      refetch();
    } catch (error) {
      Toastsucess(error.message);
    }
  };
  const handledeleteeemployee = async () => {
    if (!email) {
      Toastsucess("Please fill your Details");
      return;
    } 
    try {
      const formData = new FormData();

      formData.append("email", email);


      const response = await deleteeemployeedetails(formData);
      // console.log(response.message, "response");
 
      Toastsucess(response.message, "sucess", "light");
      setName("");
      setEmail("");
      setPassword("");
      setemployeecategory("");
      refetch();
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const Buttons = [
    {
      txt: "Check",
      onClick: handlegetsupplier,
    },
    {
      txt: "Add",
      onClick: handleApi,
    },
    {
      txt: "Remove",
      onClick:handledeleteeemployee
    },
    {
      txt: "Update",
      onClick: handleupdatesupplier,
    },
  ];

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          p: "3%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={12} xs={12} md={12}>
            <TypographyText
              Typography={"Employee Updation"}
              textAlign="left"
              fontSize=".9rem"
            />{" "}
            <hr />
          </Grid>
          {Data.map((data, index) => (
            <>
              <Grid item lg={3} md={4} sm={6} xs={6} key={index}>
                <TypographyText
                  Typography={data.txt}
                  textAlign="left"
                  fontSize=".9rem"
                />

                <input
                  required
                  type={data.type}
                  name={data.name}
                  value={data.value}
                  onChange={data.onChange}
                  style={{
                    height: "35px",
                    width: "100%",
                    border: "none",
                    backgroundColor: "#F7F7F7",
                  }}
                />
                {errors[data.name] && (
                  <TypographyText
                    Typography={errors[data.name]}
                    color="red"
                    textAlign="left"
                    textTransform="lowercase"
                  />
                )}
              </Grid>
            </>
          ))}

          {Buttons.map((data, index) => (
            <>
              <Grid item lg={2} md={2} sm={3} xs={6} key={index}>
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
          <Grid item lg={12} xs={12} md={12}>
            <TypographyText
              Typography={"Employee Updation"}
              textAlign="left"
              fontSize=".9rem"
            />{" "}
            <hr />
          </Grid>
          <Grid item lg={12} md={12}>

          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                {EmployeeDetails.map((data, index) => (
                  <TableCell
                    className="shadow-checkoutCardheading"
                    key={index}
                  >
                    {data.txt}
                  </TableCell>
                ))}{" "}
              </TableRow>
            </TableHead>
            <TableBody>
       {
          data?.map((data) => (
                  <TableRow key={data.product_id}>
                    <TableCell component="th" scope="row">
                      {data.employeeno}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {data.email}
                    </TableCell>
                   
                    
                  </TableRow>
                ))}  
              
               
            </TableBody>
          </Table>
        </TableContainer> 
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Employee;
const EmployeeDetails = [{
  txt:"Employee No"
},
{
txt:"Employee Name"
  },
  {
    txt:"Employee Email"
    }]