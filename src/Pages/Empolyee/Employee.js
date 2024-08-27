import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Toastsucess, TypographyText } from "../../Reusable";
import {
  day,
  DeleteEmployee,
  GetAllEmployes,
  GetEmployeeNumber,
  GetEmpolyee,
  month,
  UpdateEmployee,
  useRegister,
  year,
} from "../../API/UserApi";
import { useAuthContext } from "../../Context/AuthContext";
import { GetAllMaster } from "../../API/APImaster";

const Employee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeno, setemployeeno] = useState();
  const [employeecategory, setemployeecategory] = useState();
  const [employeestatus, setemployeestatus] = useState();
  const [master, setmaster] = useState("");
  const [selectedmaster, setselectedmaster] = useState([]);
  const [errors, setErrors] = useState({});
  const { getuserdata } = useAuthContext();
  const { register } = useRegister();
  const { data, refetch } = GetAllEmployes(getuserdata);
  const { getmaster, isLoadingrefetch } = GetAllMaster(getuserdata);
  const { employeenumber, employeenumberrefetch } = GetEmployeeNumber(
    getuserdata,
    `${year}-${month}-${day}`
  );
  useEffect(() => {
    // Refetch suppliers when component mounts
    refetch();

    setemployeestatus("employee");
  }, [refetch]);

  useEffect(() => {
    const fetchemployeeNumber = async () => {
      try {
        const response = await employeenumberrefetch();
        setemployeeno(response?.data?.EmployeeNumber);
        console.log(response?.data?.EmployeeNumber, "employeeno");
      } catch (error) {
        Toastsucess(error.message, "error", "light");
      }
    };

    fetchemployeeNumber();
  }, [employeenumberrefetch]);

  const { getemployeedisply } = GetEmpolyee(getuserdata);
  const { updateemployeedetails } = UpdateEmployee(getuserdata);
  const { deleteeemployeedetails } = DeleteEmployee(getuserdata);
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
  const handlesetmaster = (e) => {
    setmaster(e.target.value);
  };
  const handleemployeeno = (e) => {
    setemployeeno(e.target.value);
  };
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

  useEffect(() => {
    console.log("getmaster:", getmaster);
    if (Array.isArray(getmaster)) {
      const initialSupplierList = getmaster.map((supplier) => ({
        emivalue: supplier.master_id,
        eminame: supplier.entityName,
      }));

      setselectedmaster(initialSupplierList);
    }
  }, [getmaster]);

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
      onChange: handleemployeeno,
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
    {
      label: "Employee Location",
      txt: "Employee Location",
      value: master,
      onChange: handlesetmaster,
      datas: selectedmaster,
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
        master_id: master,
      });
      Toastsucess(userData.message, "sucess", "light");
      const response = await employeenumberrefetch();
      setemployeeno(response?.data?.EmployeeNumber);
      setName("");
      setEmail("");
      setPassword("");
      setemployeecategory("");
      refetch();
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

      setemployeecategory(productData?.employeecategory);
      setemployeeno(productData?.employeeno);

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
      const response = await employeenumberrefetch();
      setemployeeno(response?.data?.EmployeeNumber);
      setEmail("");
      setName("");
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
      const res = await employeenumberrefetch();
      setemployeeno(res?.data?.EmployeeNumber);
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
      onClick: handledeleteeemployee,
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
            <Grid item lg={3} md={4} sm={6} xs={6} key={index}>
              {index === 5 ? (
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
                      value={data.value}
                      onChange={data.onChange}
                      sx={{
                        backgroundColor: "#F7F7F7",
                        fontFamily: "Poppins !important",
                        fontSize: ".9rem",
                      }}
                    >
                      {Array.isArray(data.datas) &&
                        data.datas.map((datas, i) => (
                          <MenuItem key={datas.id || i} value={datas.emivalue}>
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
                </>
              )}
            </Grid>
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
                  {data?.map((data) => (
                    <TableRow key={data.product_id}>
                      <TableCell component="th" scope="row">
                        {data.employeeno}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {data.employeecategory}
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
const EmployeeDetails = [
  {
    txt: "Employee No",
  },
  {
    txt: "Employee Name",
  },
  {
    txt: "Employee Category",
  },
  {
    txt: "Employee Email",
  },
];
