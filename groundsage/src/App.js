import React, { useEffect, useState } from "react";
import SplashScreenPage from "./Pages/SplashScreenPage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import ForgetPassword from "./Component/Reset/ForgetPassword";
import Verification from "./Component/Verification";
import ShopListing from "./Pages/ShopListing";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Pages/Profile";
import DescriptionPage from "./Pages/DescriptionPage";
import ReferralCodePage from "./Pages/ReferralCodePage";
import TransactionPage from "./Pages/TransactionPage";
import RentalAgreementPage from "./Pages/RentalAgreementPage";
import EventListPage from "./Pages/EventListPage";
import Navbar from "./Component/Navbar";
import CreateShopPage from "./Pages/CreateShopPage";
import Notes from "./Pages/Notes";
import TransactionList from "./Pages/TransactionList";
import Reports from "./Pages/Reports";
import IncomeReports from "./Pages/ReportsComponents/IncomeReports";
import OccupancyReport from "./Pages/ReportsComponents/OccupancyReport";
import ExpenseReport from "./Pages/ReportsComponents/ExpenseReport";
import TenantsReport from "./Pages/ReportsComponents/TenantsReport";
import OutStandingReport from "./Pages/ReportsComponents/OutStandingReport";
import NetPaybleReport from "./Pages/ReportsComponents/NetPaybleReport";
import HomePage from "./Pages/HomePage";
import CreateEventPage from "./Pages/CreateEventPage";
import EnterMail from "./Component/EnterMail";
import Footer from "./Component/Footer";
import UpdateShopPage from "./Pages/UpdateShop";
import EditEvent from "./Component/event/EditEvent";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Box, FormControl, MenuItem, Modal, Select } from "@mui/material";
import { AuthContext } from "./ContextApi/AuthContext";
import ReferralCodeScreen from "./Pages/ReferralCodeScreen";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const App = () => {
  const theme = useTheme();
  const {
    eventIds,
    setActiveEvent,
    setActiveEventName,
    activeEvent,
    event,
    user,
    activeEventName,
    activeEventId,
    setActiveEventId,
  } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    console.log("handle Open called");
    setOpen(true);
    console.log(open);
  };
  const handleClose = () => setOpen(false);
  const [personName, setPersonName] = React.useState([]);
  const [eventName, setEventName] = useState();
  useEffect(() => {
    setActiveEventId(activeEvent[0]?.id);
  }, []);
  console.log(activeEventId);
  const handleSelection = (name) => {
    setActiveEventId(name.id);
    setActiveEventName(name.event_name);
  };
  console.log(activeEvent);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div>
      <Navbar
        handleOpen={handleOpen}
        handleClose={handleClose}
        isActive={activeEvent}
        activeEventId={activeEventId}
        activeEventName={activeEventName}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            marginRight: { xs: "0", md: "25%" }, // No margin on right for small screens
            marginTop: { xs: "20px", md: "0" }, // Add top margin for small screens
            textAlign: { xs: "center", md: "right" }, // Center the select box on small screens
          }}
        >
          <FormControl
            sx={{ m: 1, mt: 10, ml: { lg: 140, md: 110, sm: 56, xs: 20 } }}
          >
            <Select
              displayEmpty
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return (
                    <span style={{ fontFamily: "Aoboshi One" }}>
                      Pick an event
                    </span>
                  );
                }

                return selected.join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                backgroundColor: "rgb(255, 255, 255)",
                fontFamily: "Aoboshi One",
                borderRadius: "8px",
                width: "100%", // Ensure select box takes full width on small screens
              }}
            >
              <MenuItem disabled value="">
                <em>
                  {activeEvent?.length === 0 ? (
                    <>Pick an event</>
                  ) : (
                    activeEvent[0].event_name
                  )}
                </em>
              </MenuItem>
              {activeEvent?.slice(0, activeEvent?.length - 1).map((name) => (
                <MenuItem
                  key={name.id}
                  value={name?.event_name}
                  style={getStyles(name, personName, theme)}
                  sx={{ fontFamily: "Aoboshi One" }}
                  onClick={() => handleSelection(name)}
                >
                  {name.event_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Modal>
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
        <Route path="/create-transaction" element={<TransactionPage />} />
        <Route
          path="/rental-agreement/:shopId"
          element={<RentalAgreementPage />}
        />
        <Route path="/Events" element={<EventListPage />} />
        <Route path="/createshop" element={<CreateShopPage />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/transaction" element={<TransactionList />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/incomereport" element={<IncomeReports />} />
        <Route path="/occupancyreport" element={<OccupancyReport />} />
        <Route path="/expensereport" element={<ExpenseReport />} />
        <Route path="/outstandingreport" element={<OutStandingReport />} />
        <Route path="/netpayablereport" element={<NetPaybleReport />} />
        <Route path="/tenantsreport" element={<TenantsReport />} />
        <Route path="/create-event" element={<CreateEventPage />} />
        <Route path="/entermail" element={<EnterMail />} />
        <Route path="/update-shop" element={<UpdateShopPage />} />
        <Route path="/referral-code" element={<ReferralCodeScreen />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
