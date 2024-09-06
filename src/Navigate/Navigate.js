import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

import Login from '../Autentication/Login/Login';
import Main from '../Pages/Main';
import DataComponent from '../Autentication/Login/DataComponent';
import Singup from '../Autentication/Singup';
import Printpage from '../Pages/Billing/Printpage';

const Navigate = () => {
  return (
    <div>

      <Routes>
    
      <Route path="/print" element={<Printpage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/Test" element={<DataComponent/>} />
        </Routes>
    </div>
  )
}

export default Navigate
