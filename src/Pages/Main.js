import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import Master from "./Master/Master";

import Invotory from "./Inventory/Invotory";
import Employee from "./Empolyee/Employee";
import { Button } from "@mui/material";
import { useLogout } from "../API/UserApi";
import { useAuthContext } from "../Context/AuthContext";
import { Toastsucess } from "../Reusable";
import { useNavigate } from "react-router-dom";
import Billing from "./Billing/Billing";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Main() {
  const { getuserdata } = useAuthContext();
  const { logout } = useLogout(getuserdata);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogout = async () => {
    try {
      const params = {}; // Replace with any params you need to pass

      const response = logout({ params, getuserdata }).catch((err) => {
        console.error("Failed to logout:", err.message);
      });
      Toastsucess(response.message, "sucess", "light");
      
      navigate("/");
    } catch (error) {
      Toastsucess(`${error.response?.data || error.message}.`);
    }
  };

  const tabs = [
    { label: "Billing", content: <Billing /> },
    { label: "Inventory", content: <Invotory /> },
    
      // Conditional rendering for the "Master" tab
  ...(getuserdata?.employeestatus === "admin"
    ? [{ label: "Empolyee", content: <Employee /> },{ label: "Master", content: <Master /> },]
    : []),
    { label: <Button onClick={handleLogout}>Logout</Button> },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              {...a11yProps(index)}
              sx={{
                fontSize: ".8rem",
                fontFamily: "'Poppins', sans-serif",
                textTransform: "capitalize",
              }}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
