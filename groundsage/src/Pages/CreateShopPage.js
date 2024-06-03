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
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../ContextApi/AuthContext";

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
  const { setShopIds, lastShopNumber,setLastShopNumber } = useContext(AuthContext);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState([]);
  const {user} = useContext(AuthContext);
  const [eventData, setEventData] = useState({
    event_id: 1183,
    description: "",
    area: null,
    rent: null,
    dome: "",
    location: "",
    status: "Vacant",
    shop_number: lastShopNumber, // Generate random shop number between 1 and 50
    files: file,
  });

  const [lastShopNumberFetched, setLastShopNumberFetched] = useState(false); // State to track whether the last shop number has been fetched

  const handleInputChange = (e, field) => {
    const newValue = e.target.value;
    setEventData((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));
  };
  useEffect(() => {
    // Fetch the last shop number when the component mounts
    if (!lastShopNumberFetched) {
      fetchLastShopNumber();
    }
  }, [lastShopNumberFetched]);

  const fetchLastShopNumber = async () => {
    try {
      const response = await axios.get(
        "https://groundsageevent-be.onrender.com/api/v1/shop/fetch-last-shop-number"
      );
      if (response && response.data && response.data.success) {
        const shopNumber = response.data.data.shop_number;
        setLastShopNumber(shopNumber);
        setLastShopNumberFetched(true);
        console.log(lastShopNumber);
      }
    } catch (error) {
      console.error("Error fetching last shop number:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!lastShopNumberFetched) {
        // If the last shop number has not been fetched yet, fetch it first
        await fetchLastShopNumber();
      }

      // Increment the last shop number to get the new shop number
      const newShopNumber = lastShopNumber;

      // Set the new shop number in eventData
      // Set the new shop number in eventData
      const updatedEventData = {
        ...eventData,
        shop_number: newShopNumber,
      };


      // Create a FormData object
      const formData = new FormData();

      // Append each key-value pair from eventData to formData
      Object.entries(updatedEventData).forEach(([key, value]) => {
        console.log(key, value);
        formData.append(key, value);
      });

      // Assuming 'files' is an array of File objects
      file.forEach((file) => {
        console.log(file);
        formData.append("files", file);
      });

      console.log("Logging FormData contents:");
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const response = await axios.post(
        "https://groundsageevent-be.onrender.com/api/v1/shop/create-shop",
        formData , {
          headers : {
            'authorization': `${user?.token}`, // Ensure the token format is correct
            'Accept': 'application/json',
            role_id : user?.role_id
          }
        }
      );

      if (response.status === 200) {
        toast.success("Shop created successfully!");
        setEventData({
          event_id: "",
          description: "",
          area: "",
          rent: "",
          dome: "",
          location: "",
          status: "Vacant",
          shop_number: "",
        });
        setShopIds(response.data.data.shop_id);
        console.log(response.data.data.shop_id);
        navigate("/shops");
      } else {
        toast.error("Failed to create shop. Please try again later.");
        console.error("Error creating shop: Invalid response code");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        if (errorMessage.includes("Shop number")) {
          toast.error(
            "Shop number already exists. Please choose a different shop number."
          );
        } else {
          toast.error("Failed to create shop. Please try again later.");
        }
      } else {
        toast.error("Failed to create shop. Please try again later.");
      }
      console.error("Error creating shop:", error);
    }
  };

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
    // const file = e.target.files[0];
    const files = Array.from(e.target.files);
    setFile(files);
    console.log(files);
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
      <ToastContainer />
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
            fontSize: { xs: "40px", md: "56px" },
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
            // fontSize: { xs: "30px", md: "46px" },
          }}
        >
          Enter the details for
          <Box
            sx={{
              color: "rgb(250, 236, 191)",
              margin: "0px 8px",
              // fontSize: { xs: "30px", md: "46px" },
            }}
          >
            Shop {0 + "" + lastShopNumber}
          </Box>{" "}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid container spacing={4} sx={{ margin: "0% 10%" }}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
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
                    fontSize: "20px",
                  },
                }}
                id="standard-basic"
                label="Dome"
                value={eventData.dome}
                onChange={(e) => handleInputChange(e, "dome")}
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
                    fontSize: "20px",
                  },
                }}
                id="standard-basic"
                label="Rent"
                value={eventData.rent}
                onChange={(e) => handleInputChange(e, "rent")}
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
                    fontSize: "20px",
                  },
                }}
                label="Shop Description"
                value={eventData.description}
                onChange={(e) => handleInputChange(e, "description")}
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
                    fontSize: "20px",
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
                    fontSize: "20px",
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
                    fontSize: "20px",
                  },
                }}
                id="standard-basic"
                label="Shop Area ( in sq. )"
                value={eventData.area}
                onChange={(e) => handleInputChange(e, "area")}
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
                    fontSize: "20px",
                  },
                }}
                id="standard-basic"
                label="Shop Location"
                value={eventData.location}
                onChange={(e) => handleInputChange(e, "location")}
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
            // value={file}
            multiple
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
              "&:hover": {
                backgroundColor: "rgb(247, 230, 173)", // Change background color on hover
                color: "rgb(50, 50, 50)", // Change text color on hover
                boxShadow: "0px 10px 35px 0px rgba(111, 126, 201, 0.5)", // Change box shadow on hover
              },
            }}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Box>
    </>
  );
}
