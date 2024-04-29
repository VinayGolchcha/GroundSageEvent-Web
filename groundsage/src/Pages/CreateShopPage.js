import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography, 
} from "@mui/material";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function CreateShopPage() {
  const [shopStatus, setShopStatus] = useState("Vacant");
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const handleStatus = () => {
    if (shopStatus === "Vacant") {
      setShopStatus("Occupied");
    } else {
      setShopStatus("Vacant");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      setImage(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "20px",
          // width: "100vw",
          backgroundColor: "rgb(66, 92, 90)",
        }}
      >
        <img
          src="../../Images/arrow-left.png"
          alt="Share"
          style={{
            cursor: "pointer",
            width: "45px",
            margin: "10px 0px 0px 20px",
          }}
          onClick={() => {
            navigate(-1); // Navigate back by one step in the history stack
          }}
        />
        <Typography
          variant="h3"
          sx={{
            color: "rgb(247, 230, 173)",
            textAlign: "center",
            padding: "20px 0px",
            fontWeight: "600",
            marginTop: "-30px",
            textShadow: "0 6px rgba(81,67,21,0.8)",
          }}
        >
          Add New Shop
        </Typography>
        <Typography
          variant="h4"
          sx={{
            margin: "1% 13%",
            color: "rgba(174, 174, 174, 0.83)",
            display: "flex",
          }}
        >
          Enter the details for
          <Box sx={{ color: "rgb(250, 236, 191)", margin: "0px 8px" }}>
            Shop 01
          </Box>{" "}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid container spacing={4} sx={{ margin: "0% 10%" }}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <FormControl
                variant="standard"
                sx={{ minWidth: 120, width: "100%", margin: "10px 0px " }}
              >
                <InputLabel
                  id="demo-simple-select-standard-label"
                  style={{ color: "white" }}
                >
                  Shop Dome
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Shop Dome"
                  disableUnderline
                  sx={{
                    width: "100%",
                    borderBottom: "1px solid rgb(188, 189, 163)",
                    "& .MuiSelect-icon": {
                      color: "rgb(188, 189, 163)",
                      "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                        color: "white",
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <TextField
                sx={{
                  "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                    color: "rgb(255, 255, 255)",
                  },
                  "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
                    borderBottom: "1px solid rgb(188, 189, 163)",
                  },
                  "& label.Mui-focused": {
                    color: "rgb(255, 255, 255)", // Color of the label when focused
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                  },
                  width: "100%",
                  margin: "10px 0px ",
                }}
                InputProps={{
                  style: {
                    color: "rgb(255, 255, 255)",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                id="standard-basic"
                label="Rent"
                variant="standard"
              />
              <TextField
                sx={{
                  "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                    color: "rgb(255, 255, 255)",
                  },
                  "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
                    borderBottom: "1px solid rgb(188, 189, 163)",
                  },
                  "& label.Mui-focused": {
                    color: "rgb(255, 255, 255)", // Color of the label when focused
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                  },
                  width: "100%",
                  margin: "10px 0px ",
                }}
                id="standard-basic"
                InputProps={{
                  style: {
                    color: "rgb(255, 255, 255)",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                label="Shop Description"
                variant="standard"
              />
              <TextField
                sx={{
                  "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                    color: "rgb(255, 255, 255)",
                  },
                  "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
                    borderBottom: "1px solid rgb(188, 189, 163)",
                  },
                  "& label.Mui-focused": {
                    color: "rgb(255, 255, 255)", // Color of the label when focused
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                  },
                  width: "100%",
                  margin: "10px 0px ",
                }}
                InputProps={{
                  style: {
                    color: "rgb(255, 255, 255)",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                id="standard-basic"
                label=""
                variant="standard"
              />
              <TextField
                sx={{
                  "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                    color: "rgb(255, 255, 255)",
                  },
                  "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
                    borderBottom: "1px solid rgb(188, 189, 163)",
                  },
                  "& label.Mui-focused": {
                    color: "rgb(255, 255, 255)", // Color of the label when focused
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                  },
                  width: "100%",
                  margin: "10px 0px ",
                }}
                InputProps={{
                  style: {
                    color: "rgb(255, 255, 255)",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                id="standard-basic"
                label=""
                variant="standard"
              />
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <Box
                sx={{
                  color: "rgb(255, 255, 255)",
                  margin: "28px 0px",
                  fontSize: "20px",
                }}
              >
                Shop Status
                <Box
                  sx={{ display: "flex", margin: "5px 0px" }}
                  onClick={handleStatus}
                >
                  <Box
                    sx={{
                      width: "20px",
                      border: "2px solid white",
                      borderRadius: "84px",
                      margin: "0px 5px",
                      ...(shopStatus === "Vacant" && {
                        backgroundColor: "rgb(255, 238, 179)",
                      }),
                    }}
                  ></Box>
                  <Typography
                    sx={{
                      color: "rgba(174, 174, 174, 0.83)",
                      fontWeight: "400",
                      ...(shopStatus === "Vacant" && {
                        color: "rgb(250, 236, 191)",
                        fontWeight: "600",
                      }),
                    }}
                  >
                    Vacant
                  </Typography>
                </Box>
                <Box
                  onClick={handleStatus}
                  sx={{ display: "flex", margin: "5px 0px" }}
                >
                  <Box
                    sx={{
                      width: "20px",
                      border: "2px solid white",
                      borderRadius: "84px",
                      margin: "0px 5px",
                      ...(shopStatus === "Occupied" && {
                        backgroundColor: "rgb(255, 238, 179)",
                      }),
                    }}
                  ></Box>
                  <Typography
                    sx={{
                      color: "rgba(174, 174, 174, 0.83)",
                      fontWeight: "400",
                      ...(shopStatus === "Occupied" && {
                        color: "rgb(250, 236, 191)",
                        fontWeight: "600",
                      }),
                    }}
                  >
                    Occupied
                  </Typography>
                </Box>
              </Box>
              <TextField
                sx={{
                  "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                    color: "rgb(255, 255, 255)",
                  },
                  "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
                    borderBottom: "1px solid rgb(188, 189, 163)",
                  },
                  "& label.Mui-focused": {
                    color: "rgb(255, 255, 255)", // Color of the label when focused
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                  },
                  width: "100%",
                  margin: "10px 0px ",
                }}
                InputProps={{
                  style: {
                    color: "rgb(255, 255, 255)",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                id="standard-basic"
                label="Shop Area ( in sq. )"
                variant="standard"
              />

              <TextField
                sx={{
                  "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                    color: "rgb(255, 255, 255)",
                  },
                  "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::before": {
                    borderBottom: "1px solid rgb(188, 189, 163)",
                  },
                  "& label.Mui-focused": {
                    color: "rgb(255, 255, 255)", // Color of the label when focused
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border when focused
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "rgb(188, 189, 163)", // Color of the bottom border on hover
                  },
                  width: "100%",
                  margin: "10px 0px ",
                }}
                InputProps={{
                  style: {
                    color: "rgb(255, 255, 255)",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                id="standard-basic"
                label="Shop Location"
                variant="standard"
              />
            </Grid>
          </Grid>
        </Box>
        <Typography sx={{ margin: "1% 13%", fontSize: "20px", color: "white" }}>
          Shop images
        </Typography>
        <div
          style={{
            margin: "0% 13%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <label
            htmlFor="fileInput"
            style={{
              width: "300px",
              height: "300px",
              border: "2px solid #aaa",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              cursor: "pointer",
              width: "100%",
              backgroundColor: "rgba(174, 174, 174, 0.83)",
            }}
          >
            {image ? (
              <img
                src={image}
                alt="Dropped Image"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : (
              <Box>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src="Fill-1.png" alt="cloud-icon" />
                </div>
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.32)",
                    fontSize: "1.5rem",
                  }}
                >
                  Drag upload/ browse your shop image
                </p>
              </Box>
            )}
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            margin: "20px 0px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(247, 230, 173) ",
              color: "rgb(91, 94, 97)",
              minWidth: "200px",
              fontWeight: "600",
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
}
