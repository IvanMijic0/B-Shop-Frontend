import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';
//import {About,AdminPanel,Cars,Home,Login,MyGarage,NotFound, Registration} from './pages'

import Navbar from './components/Navbar';

const App = () => {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
      </Router>
  );
};

export default App
