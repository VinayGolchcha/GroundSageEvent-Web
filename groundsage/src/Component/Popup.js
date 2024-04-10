import React, { useState } from "react";
import { Button, Dialog, DialogTitle, TextField, Box } from "@mui/material";

const SimplePopup = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open Popup
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ background: "rgb(65, 93, 91)", padding: "60px" }}>
          <DialogTitle
            sx={{
              color: "rgb(155, 181, 199)",
              fontWeight: "400",
              fontSize: "35px",
            }}
          >
            Join an existing team
          </DialogTitle>
          <TextField
            autoFocus
            margin="dense"
            variant="standard"
            fullWidth
            placeholder="Your text here"
            InputProps={{
                disableUnderline: true,
              style: {
                color: "white",
                borderBottom: "2px solid rgb(247, 230, 173)",
                "&:focus": {
                  borderBottomColor: "rgb(0, 150, 136)"
                }
              },
              placeholderTextColor: "rgba(255, 255, 255, 0.7)"
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                background: "rgb(247, 230, 173)",
                color: "rgb(91, 94, 97)",
                padding: "10px 40px 10px 40px",
                display: "flex",
                margin: "10px 0px 0px 2%",
                // fontFamily:"Aoboshi One",
                fontWeight: "600",
                alignItems: "center",
                borderRadius: "1px", // Add border radius
                boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.25)", // Add box shadow
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                  color: "rgb(50, 50, 50)", // Change text color on hover
                  boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.5)", // Change box shadow on hover
                },
              }}
            >
              SAVE
            </Button>
          </div>
        </Box>
      </Dialog>
    </div>
  );
};

export default SimplePopup;
