import React, { useContext, useState } from "react";
import { Button, Dialog, DialogTitle, TextField, Box } from "@mui/material";
import { AuthContext } from "../ContextApi/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SimplePopup = ({ open, onClose, onSave }) => {
  const [referralCode, setReferralCode] = useState('');
  const { user } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URI;

  const handleSave = async () => {
    try {
      const response = await axios.post(`${apiUrl}/event/join-team-with-referral-code`, {
        user_id: user?.user_id,
        referral_code: referralCode
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": user?.token,
          role_id: user?.role_id,
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        onSave && onSave(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while trying to join the team.");
      console.error("Error joining team with referral code:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
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
            alt="close"
            style={{
              cursor: "pointer",
              paddingTop: "10px",
              position: "absolute",
              right: "10px",
            }}
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
            placeholder="Add referral code"
            InputProps={{
              disableUnderline: true,
              style: {
                color: "white",
                borderBottom: "2px solid rgb(247, 230, 173)",
              },
            }}
            onChange={(e) => setReferralCode(e.target.value)}
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
                padding: "10px 40px",
                fontWeight: "600",
                borderRadius: "1px",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "rgb(247, 230, 173)",
                  color: "rgb(50, 50, 50)",
                },
              }}
              onClick={handleSave}
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
