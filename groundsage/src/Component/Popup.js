import React, { useState } from "react";
import { Button, Dialog, DialogTitle, TextField, Box } from "@mui/material";

const SimplePopup = ({ open, onClose, onSave }) => {
  const [data, setData] = useState();

  const handleSave = () => {

    // Call the onSave function with the data
    onSave(data);
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <Box
          sx={{
            background: "rgb(65, 93, 91)",
            padding: "0px 60px 60px 60px",
            position: "relative",
          }}
        >
          <img
            src="../../Images/icons8-cross-96 2 (1).png"
            alt="add"
            style={{
              // width: "20px",
              cursor: "pointer",
              paddingTop: "10px",
              position: "absolute",
              right: "10px",
            }}
            // onClick={handleOpenPopup} // Add onClick event to open the popup
            onClick={onClose}
          />
          <DialogTitle
            sx={{
              color: "rgb(155, 181, 199)",
              fontWeight: "400",
              fontSize: "35px",
              marginTop: "70px",
            }}
          >
            Join an existing team
          </DialogTitle>
          <TextField
            autoFocus
            margin="dense"
            variant="standard"
            fullWidth
            placeholder="add referral code "
            InputProps={{
              disableUnderline: true,
              style: {
                color: "white",
                borderBottom: "2px solid rgb(247, 230, 173)",
                "&:focus": {
                  borderBottomColor: "rgb(0, 150, 136)",
                },
              },
              placeholderTextColor: "rgba(255, 255, 255, 0.7)",
            }}
            onChange={(e) => setData(e.target.value)}
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
                fontWeight: "600",
                alignItems: "center",
                borderRadius: "1px",
                // boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.25)",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "rgb(247, 230, 173)",
                  color: "rgb(50, 50, 50)",
                  // boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.5)",
                },
              }}
              onClick={handleSave} // Call handleSave function when Save button is clicked
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
