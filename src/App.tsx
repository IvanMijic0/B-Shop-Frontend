import { useState } from 'react'


//import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
//import {About,AdminPanel,Cars,Home,Login,MyGarage,NotFound, Registration} from './pages'

import Navbar from './components/Navbar';

const App = () => {
  return (
      
          <><Navbar /><Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
      </Routes></>
     
  );
};

export default App
