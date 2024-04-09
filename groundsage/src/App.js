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

const App = () => {
  return (
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
    </Routes>
  );
};

export default App;
