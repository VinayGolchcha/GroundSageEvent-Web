import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField } from "@mui/material";

const ShopEditPopup = ({ shopDetails, open, onClose }) => {
  const [editedShopDetails, setEditedShopDetails] = useState(shopDetails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedShopDetails({
      ...editedShopDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Edited shop details:", editedShopDetails);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Shop Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TextField
              fullWidth
              id="shop_number"
              name="shop_number"
              label="Shop Number"
              value={editedShopDetails.shop_number}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Shop Description"
              value={editedShopDetails.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TextField
              fullWidth
              id="area"
              name="area"
              label="Shop Area"
              value={editedShopDetails.area}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TextField
              fullWidth
              id="rent"
              name="rent"
              label="Rent"
              value={editedShopDetails.rent}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TextField
              fullWidth
              id="dome"
              name="dome"
              label="Dome"
              value={editedShopDetails.dome}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <TextField
              fullWidth
              id="location"
              name="location"
              label="Shop Location"
              value={editedShopDetails.location}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShopEditPopup;
