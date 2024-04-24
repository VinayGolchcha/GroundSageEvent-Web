import React from "react";
import SplashScreenPage from "./Pages/SplashScreenPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import ForgetPassword from "./Component/Reset/ForgetPassword";
import Verification from "./Component/Verification";
import ShopListing from "./Pages/ShopListing";
import { Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import DescriptionPage from "./Pages/DescriptionPage";
import ReferralCodePage from "./Pages/ReferralCodePage";
import TransactionPage from "./Pages/TransactionPage";
import RentalAgreementPage from "./Pages/RentalAgreementPage";
import EventListPage from "./Pages/EventListPage";
import Navbar from "./Component/Navbar";
import CreateShopPage from "./Pages/CreateShopPage";
import Notes from "./Pages/Notes";
import HomePage from "./Pages/HomePage";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<SplashScreenPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/shops" element={<ShopListing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/description/:shopIndex" element={<DescriptionPage />} />
        <Route path="/refferalcode" element={<ReferralCodePage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/rental-agreement" element={<RentalAgreementPage />} />
        <Route path="/Events" element={<EventListPage />} />
        <Route path="/creatshop" element={<CreateShopPage/>}/>
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </div>
  );
};

export default App;
