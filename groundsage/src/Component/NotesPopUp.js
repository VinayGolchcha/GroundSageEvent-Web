import React, { useState } from "react";
import { Button, Dialog, DialogTitle, TextField, Box } from "@mui/material";

const AddNotes = ({ open, onClose, onSave }) => {
  const [data, setData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
  });

  const handleSave = () => {
    const formattedDate = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const newData = {
      ...data,
      date: formattedDate,
    };

    onSave(newData);
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <Box
          sx={{
            background: "rgb(65, 93, 91)",
            padding: "0px 60px 20px 60px",
            position: "relative",
            borderRadius:"4px"
          }}
        >
          <img
            src="../../Images/icons8-cross-96 2 (1).png"
            alt="add"
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
              marginTop: "10px",
              textAlign: "center",
              fontFamily:"Aoboshi One"
            }}
          >
            Add Notes
          </DialogTitle>
          <TextField
            margin="dense"
            variant="standard"
            fullWidth
            placeholder="EventType"
            InputProps={{
              disableUnderline: true,
              style: {
                color: "white",
                borderBottom: "2px solid rgb(247, 230, 173)",
              },
              placeholderTextColor: "rgba(255, 255, 255, 0.7)",
            }}
            value={data.field1}
            onChange={(e) => setData({ ...data, field1: e.target.value })}
          />
          <TextField
            margin="dense"
            variant="standard"
            fullWidth
            placeholder="EventDes"
            InputProps={{
              disableUnderline: true,
              style: {
                color: "white",
                borderBottom: "2px solid rgb(247, 230, 173)",
              },
              placeholderTextColor: "rgba(255, 255, 255, 0.7)",
            }}
            value={data.field2}
            onChange={(e) => setData({ ...data, field2: e.target.value })}
          />
          <TextField
            margin="dense"
            variant="standard"
            fullWidth
            placeholder="Field 3"
            InputProps={{
              disableUnderline: true,
              style: {
                color: "white",
                borderBottom: "2px solid rgb(247, 230, 173)",
              },
              placeholderTextColor: "rgba(255, 255, 255, 0.7)",
            }}
            value={data.field3}
            onChange={(e) => setData({ ...data, field3: e.target.value })}
          />
          <TextField
            margin="dense"
            variant="standard"
            fullWidth
            placeholder="Field 4"
            InputProps={{
              disableUnderline: true,
              style: {
                color: "white",
                borderBottom: "2px solid rgb(247, 230, 173)",
              },
              placeholderTextColor: "rgba(255, 255, 255, 0.7)",
            }}
            value={data.field4}
            onChange={(e) => setData({ ...data, field4: e.target.value })}
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
                padding: "5px 40px 5px 40px",
                display: "flex",
                // margin: "10px 0px 0px 2%",
                fontWeight: "600",
                alignItems: "center",
                borderRadius: "1px",
                fontSize: "16px",
                fontFamily:"Poppins",
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

export default AddNotes;
