import React, { useRef, useState } from "react";
import { Button, Dialog, DialogTitle, TextField, Box } from "@mui/material";
import { toast } from "react-toastify";

const AddNotes = ({ open, onClose, onSave , user , activeEventId }) => {
  const currentDate = new Date();
  const now = currentDate.toISOString().split('T')[0];
  const [data, setData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
  });
  const eventIdElement = useRef(null);
  const notesHeadingElement = useRef(null);
  const notesDescriptionElement = useRef(null);


  const handleSave = () => {
    const body = {
     event_id : activeEventId,
     user_id : user?.user_id,
     notes_heading : notesHeadingElement.current.value,
     notes_description : notesDescriptionElement.current.value,
     date : now
    };
    // const formattedDate = new Date().toLocaleDateString("en-US", {
    //   day: "numeric",
    //   month: "short",
    //   year: "numeric",
    // });

    // const newData = {
    //   date: formattedDate,
    //   ...data,
    // };

    onSave(body);
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <Box
          sx={{
            background: "rgb(65, 93, 91)",
            padding: "0px 60px 20px 60px",
            position: "relative",
            borderRadius: "4px",
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
              fontFamily: "Aoboshi One",
            }}
          >
            Add Notes
          </DialogTitle>
          <TextField
            margin="dense"
            variant="standard"
            fullWidth
            placeholder="Notes heading"
            InputProps={{
              disableUnderline: true,
              style: {
                color: "white",
                borderBottom: "2px solid rgb(247, 230, 173)",
              },
              // placeholderTextColor: "rgba(255, 255, 255, 0.7)",
            }}
            inputRef={notesHeadingElement}
            onChange={(e) => setData({ ...data, field3: e.target.value })}
          />
          <TextField
            margin="dense"
            variant="standard"
            fullWidth
            placeholder="Notes description"
            InputProps={{
              disableUnderline: true,
              style: {
                color: "white",
                borderBottom: "2px solid rgb(247, 230, 173)",
              },
              placeholderTextColor: "rgba(255, 255, 255, 0.7)",
            }}
            inputRef={notesDescriptionElement}
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
                fontFamily: "Poppins",
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
