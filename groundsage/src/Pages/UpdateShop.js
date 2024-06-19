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
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../ContextApi/AuthContext";
import { useLocation } from "react-router-dom";

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

export default function UpdateShopPage() {
  const [shopStatus, setShopStatus] = useState("Vacant");
  const { setShopIds } = useContext(AuthContext);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [eventData, setEventData] = useState({});
  const location = useLocation();
  const [file, setFile] = useState([]);
  const selectedShop = location.state && location.state.selectedShop;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (selectedShop) {
      // Populate form fields with shop details
      setEventData({
        dome: selectedShop.dome,
        rent: selectedShop.rent,
        description: selectedShop.description,
        area: selectedShop.area,
        location: selectedShop.location,
        shop_number: selectedShop.shop_number,
      });
      setShopStatus(selectedShop.status);
    }
    console.log(selectedShop);
  }, [selectedShop]);

  const handleInputChange = (e, field) => {
    const newValue = e.target.value;
    setEventData((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));
  };

  const imageUrls = location.state && location.state.imageUrls;
  const publicIds = imageUrls.map((image) => image.public_id);
  const [publicId, setPublicId] = useState(publicIds);
  const [deletedPublicIds, setDeletedPublicIds] = useState([]);
  const [images, setImages] = useState(imageUrls);

  const handleSubmit = async () => {
    console.log(imageUrls);
    let formattedPublicIds = [];

    formattedPublicIds =
      "[" + deletedPublicIds?.map((id) => `"${id.trim()}"`).join(", ") + "]";

    console.log(formattedPublicIds);
    try {
      // Prepare the updated data
      const updatedData = {
        dome: eventData.dome,
        shop_number: eventData.shop_number,
        rent: eventData.rent,
        description: eventData.description,
        area: eventData.area,
        location: eventData.location,
        status: shopStatus,
        public_ids: formattedPublicIds,
      };

      const formData = new FormData();
      Object.entries(updatedData).forEach(([key, value]) => {
        console.log(key, value);
        formData.append(key, value);
      });

      if (file.length > 0) {
        file.forEach((file) => {
          console.log(file);
          formData.append("files", file);
        });
      } else {
        // If no new files uploaded, append existing files
        // publicIds.forEach((id) => {
        //   // formData.append("public_ids", id);
        //   formData.append("public_ids", "[\"groundsage/drett21vjz2xssoqsoag\", \"groundsage/k17rmbbikh83zxkfpuwz\"]");
        // });
      }

      // formData.append("public_ids", "");
      console.log("Logging FormData contents:");
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      // Send PUT request to update shop details
      const response = await axios.put(
        `https://groundsageevent-be.onrender.com/api/v1/shop/update-shop/${selectedShop.id}/${selectedShop.event_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": user?.token,
            role_id: user?.role_id,
          },
        }
      );

      // Check if the request was successful (status code 2xx)
      if (response.status >= 200 && response.status < 300) {
        // Show success message
        toast.success("Shop details updated successfully!");
        console.log(response);
        navigate("/shops");
      } else {
        // If response status is not in the 2xx range, throw an error
        throw new Error("Failed to update shop details. Please try again.");
      }
    } catch (error) {
      // Show error message if request fails
      toast.error(
        error.message || "Failed to update shop details. Please try again."
      );
    }
  };

  const handleStatus = () => {
    if (shopStatus === "Vacant") {
      setShopStatus("Occupied");
    } else {
      setShopStatus("Vacant");
    }
  };
  const handleRemoveFile = (index) => {
    setFile((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };
  const handleRemoveFile2 = (id, index) => {
    setImages((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
    const newPublicIds = publicId.filter((public_id) => public_id !== id);
    setPublicId(newPublicIds);
    setDeletedPublicIds((prevIds) => [...prevIds, id]); // Add to deleted public IDs
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
    const validFiles = files.filter((file) => {
      if (file.size > 1 * 1024 * 1024) {
        toast.error(
          `'File size should not exceed 1 MB'`
        ); 
        return false;
      }
      return true;
    });
    setFile(validFiles);
    console.log(validFiles);
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
        <Box
          component="img"
          src="../../Images/arrow-left.png"
          alt="Share"
          sx={{
            cursor: "pointer",
            width: { xs: "35px", md: "45px" },
            margin: { xs: "20px 0px 0px 20px", md: "10px 0px 0px 20px" },
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
            fontSize: { xs: "30px", sm: "40px", md: "56px" },
          }}
        >
          Update Shop
        </Typography>
        <Box
          sx={{
            // margin: "0px 8px",
            margin: "1% 13%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            textAlign: "center",
            justifyContent: "left",
            alignItems: "left",
            // fontSize: { xs: "30px", md: "46px" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "rgba(174, 174, 174, 0.83)",
              textAlign: "center",
              // fontSize: { xs: "30px", md: "46px" },
              fontSize: { xs: "27px", md: "35px" },
            }}
          >
            Enter the details for
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "rgb(250, 236, 191)",
              marginLeft: "10px",
              textAlign: "center",
              fontSize: { xs: "27px", md: "35px" },
            }}
          >
            {" "}
            Shop {eventData?.shop_number}
          </Typography>
        </Box>{" "}
        {/* "groundsage/elwrljn13ltbamdptxqf" */}
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
                  width: eventData.dome ? "auto" : "100%", // Adjust width based on value presence
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
        <Box
          sx={{
            margin: { xs: "0% 18%", md: "0% 13%" },
            // width:"50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="label"
            htmlFor="fileInput"
            sx={{
              width: {
                xs: "100%", // 100% width for extra-small devices
                sm: "100%", // 300px width for small and up devices
              },
              height: {
                xs: "150px", // 150px height for extra-small devices
                sm: "300px", // 200px height for small and up devices
              },
              border: "2px solid #aaa",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              cursor: "pointer",
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
                    marginBottom: "20px",
                  }}
                >
                  <img src="Fill-1.png" alt="cloud-icon" />
                </div>
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.32)",
                    fontSize: { xs: "1.1rem", md: "1.5rem" },
                    textAlign: "center",
                    padding:"0px 20px"
                  }}
                >
                  Drag upload/ browse your shop image
                </Typography>
              </Box>
            )}
          </Box>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
            multiple
          />
        </Box>
        <Box>
          {images.map((file, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
                padding: "0px 20px 0px 20px",
              }}
            >
              <Typography sx={{ color: "white", marginRight: "10px" }}>
                {file.original_filename}
              </Typography>
              <IconButton
                onClick={() => handleRemoveFile2(file.public_id, index)}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Box>
          {file.map((file, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <Typography sx={{ color: "white", marginRight: "10px" }}>
                {file.name}
              </Typography>
              <IconButton onClick={() => handleRemoveFile(index)}>
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
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
            Update
          </Button>
        </Box>
      </Box>
    </>
  );
}
