import Footer from "./Components/Footer";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Screens/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductScreen from "./Screens/ProductScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterUser from "./Screens/RegisterUser";
import Cart from "./Screens/Cart";
import { useState } from "react";
import Shipping from "./Screens/Shipping";
import CheckoutSteps from "./Components/CheckoutSteps";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
// import ShippingO from "./Screens/Shipping";


function App() {
  const [cartItems, setcartItems] = useState([]);
  const [token,setToken]=useState()
  const [userInfo,setUserInfo]=useState()
  return (
    <BrowserRouter>
      <div>
        <Header token={token} setToken={setToken} userInfo={userInfo} setUserInfo={setUserInfo}  cartItems={cartItems} setcartItems={setcartItems} />
        <main className="p-2" style={{ minHeight: "89.9vh" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductScreen cartItems={cartItems} setcartItems={setcartItems} />} />
            <Route path="/login" element={<LoginScreen setUserInfo={setUserInfo} setToken={setToken}/>} />
            <Route path="/register" element={<RegisterUser setUserInfo={setUserInfo} setToken={setToken}/>} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setcartItems={setcartItems} />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/checkoutsteps" element={<CheckoutSteps />} />
            <Route path="/placeorder" element={<PlaceOrderScreen cartItems={cartItems} setcartItems={setcartItems}/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
