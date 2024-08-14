import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Toastsucess, TypographyText } from "../Reusable";
import { useRegister } from "../API/UserApi";

const Singup = () => {
  const generateInvoiceNumber = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");
    const randomPart = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
    return `ADMIN-${year}${month}${day}-${randomPart}`;
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [employeeno, setemployeeno] = useState();
  const [employeecategory, setemployeecategory] = useState();
  const [employeestatus, setemployeestatus] = useState();
  const { register } = useRegister();


  useEffect(() => {
    setemployeecategory("admin");
    setemployeeno(generateInvoiceNumber())
    setemployeestatus("admin")
  },[])

  const handleName = (e) => {
    if (!e.target.value) {
      setErrors((prev) => ({ ...prev, name: "name is required!" }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
    setName(e.target.value);
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

  const Data = [
    {
      txt: "Name",
      name: "name",
      type: "text",
      onChange: handleName,
      value: name,
    },
    {
      txt: "Email",
      name: "email",
      type: "text",
      onChange: handleEmail,
      value: email,
    },
    {
      txt: "Password",
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
        employeestatus,
        employeecategory
      });
      Toastsucess("Sucessfully Registered ! ", "sucess", "light");
      setName("");
      setEmail("");
      setPassword("");
      // Navigate("/main");
    } catch (error) {
      if (error.response && error.response.data) {
        Toastsucess(`Error: ${error.response?.data || error.message}`);
      } else {
        Toastsucess(`${error.response?.data || error.message}.`);
      }
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, p: "8%" }}>
        <Grid
          container
          spacing={2}
          sx={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }}
        >
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            sx={{ pb: "16px", pr: "15px", margin: "auto" }}
          >
            <img
              src="https://ondemandhomecare.com/wp-content/uploads/2022/11/More-Features-1024x711.png"
              alt=""
              width={"100%"}
            />
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            sx={{ pb: "15px", pr: "16px", margin: "auto" }}
          >
            <TypographyText
              Typography={<>Smart Billing</>}
              fontWeight="500"
              variant={"h4"}
            />
            <TypographyText
              Typography={<>Vedaham Business Solutions</>}
              fontWeight="500"
              variant={"h5"}
            />
            {Data.map((data, index) => (
              <div key={index} style={{ marginBottom: "16px" }}>
                <TypographyText Typography={data.txt} textAlign="left" />

                <input
                  type={data.type}
                  name={data.name}
                  value={data.value}
                  onChange={data.onChange}
                  required
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
              </div>
            ))}
            <Button
              variant="contained"
              type="submit"
              sx={{
                bgcolor: "black",
                color: "#fff",
                textAlign: "left",
                width: "100%",
                textTransform: "capitalize",
              }}
              onClick={handleApi}
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Singup;
