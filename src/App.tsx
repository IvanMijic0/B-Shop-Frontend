import { useState } from 'react'


//import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
//import {About,AdminPanel,Cars,Home,Login,MyGarage,NotFound, Registration} from './pages'

import Navbar from './components/Navbar';
import CheckoutPage from './pages/CheckoutPage';
import PurchaseConfirmationPage from './pages/PurchaseConfimationPage';


const App = () => {
  return (
      
          <><Navbar /><Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/purchase-confirmation" element={<PurchaseConfirmationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
      </Routes></>
     
  );
};

export default App
