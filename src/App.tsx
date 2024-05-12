

//import './App.css'
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
//import {About,AdminPanel,Cars,Home,Login,MyGarage,NotFound, Registration} from './pages'

import Navbar from './components/Navbar';
import CheckoutPage from './pages/CheckoutPage';
import PurchaseConfirmationPage from './pages/PurchaseConfimationPage';
import ProtectedRoute from './utils/ProtectedRoute'
import RegistrationPage from './pages/RegistrationPage';



const App = () => {
  return (
      
          <><Navbar />
          <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/purchase-confirmation" element={<PurchaseConfirmationPage />} />
          
          <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        {/* add any other protected routes here */}
        </Route>
      </Routes>
      
      </>
     
  );
};

export default App
