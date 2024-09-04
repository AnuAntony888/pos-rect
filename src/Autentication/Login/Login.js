import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { Toastsucess, TypographyText } from "../../Reusable";
import { Link, useNavigate } from "react-router-dom";
import { useUserLogin } from "../../API/UserApi";
import { useAuthContext } from "../../Context/AuthContext";

import { useZxing } from "react-zxing";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const Navigate = useNavigate();
  const { login, isLoading, error } = useUserLogin();
  const { user, getuserdata } = useAuthContext();
  const { saveUser } = useAuthContext();
  const [showVideoFeed, setShowVideoFeed] = useState(true);
  const { ref } = useZxing({
    onDecodeResult(result) {
  
      setShowVideoFeed(false);
      setEmail(result.getText()); // Automatically populate the text field with the scanned barcode
    },
  });
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
      txt: "Username",
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
      if ( !email || !password) {
        Toastsucess("Please Enter  Email, and Password!");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!emailRegex.test(email)) {
        Toastsucess("Please Enter a Valid Email Address!");
        return;
      }
      const userData = await login({
     
        email,
        password,
      });
      saveUser(userData)
      Toastsucess("Sucessfully Login ! ", "sucess", "light");

      setEmail("");
      setPassword("");
      Navigate("/main");
    } catch (error) {
      if (error.response && error.response.data) {
        Toastsucess(`Error: ${error.response?.data || error.message}`);
      } else {
        Toastsucess(`${error.response?.data || error.message}.`);
      }
    }
  };
// console.log(getuserdata,"anju@email.com")
  return (
    <div>
      <Box sx={{ flexGrow: 1, pl: "12%",pt:'8%' ,pr:'12%',pb:'12%'}}>
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
            sx={{  margin: "auto" }}
          >
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/profile-login-6748762-5574989.png?f=webp"
              alt=""
              width={"85%"}
            />
                 {/* {showVideoFeed && (
            <video
              ref={ref}
              style={{ width: "100%", maxWidth: "100%", height: "auto" }}
              autoPlay
              playsInline
            />
          )} */}
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            sx={{  margin: "auto" ,padding:'8%'}}
          >
            <TypographyText
              Typography={<>Smart Billing</>}
              fontWeight="600"
              variant={"h4"}
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
                    textTransform='lowercase'
                  />
                )}
              </div>
            ))}
            <br/>
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
           Login
            </Button>
          </Grid>
          {/* <Grid item xs={12}><Link to='/signup'>Signup</Link></Grid> */}
        </Grid>

      </Box>
    </div>
  );
};

export default Login;
