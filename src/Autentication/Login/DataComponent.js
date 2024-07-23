// import React from 'react'

// const DataComponent = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default DataComponent
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";
import ProductList from "../../Pages/ProductList";

const DataComponent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
  
    const handlesignup = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://localhost:5000/api/users/signup", {
          name,
          email,
          password
        });
        setMessage(`User created successfully: ${response.data.name}`);
      } catch (error) {
        if (error.response && error.response.data) {
          setMessage(`Error: ${error.response.data.error}`);
        } else {
          setMessage("An error occurred during signup.");
        }
      }
    };

    const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/allusers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  


 
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handlesignup}>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Sign Up</button>
        </form>
            {message && <p>{message}</p>}
            
            <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password (Hashed)</th>
          </tr>
        </thead>
        <tbody>
          {/* {users.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))} */}
            
        </tbody>
        </table>
        




<AddProduct/>


<ProductList/>

        {/**************************************************************/}

      </div>
  );
};

export default DataComponent;

