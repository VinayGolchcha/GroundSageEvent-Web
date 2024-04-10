import React from "react";
import { Box } from "@mui/material";
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
import Popup from "./Component/Popup";

const App = () => {
  return (
    // <Popup />
    <Routes>
      <Route path="/" element={<SplashScreenPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/shoplisting" element={<ShopListing />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/description" element={<DescriptionPage />} />
      <Route path="/refferalcode" element={<ReferralCodePage />} />
      <Route path="/transaction" element={<TransactionPage />} />
      <Route path="/rental-agreement" element={<RentalAgreementPage />} />
      <Route path="/eventlist" element={<EventListPage />} />
    </Routes>
  );
};

export default App;
