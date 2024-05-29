import {
    Box,
    Button,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    colors,
  } from "@mui/material";
  import dayjs from "dayjs";
  import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
  import IconButton from "@mui/material/IconButton";
  import AttachFileIcon from "@mui/icons-material/AttachFile";
  import { useContext, useRef, useState } from "react";
  import { toast } from "react-toastify";
  import axios from "axios";
import { AuthContext } from "../../ContextApi/AuthContext";
import ClearIcon from "@mui/icons-material/Clear";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
  

export default function EditEvent({ selectedItem , handleSaveEvent}){
  console.log(selectedItem);
    const [openCalendar1, setOpenCalendar1] = useState(false);
    const [openCalendar2, setOpenCalendar2] = useState(false);
    const [fromDate , setFromDate] = useState(dayjs(selectedItem?.start_date));
    const [toDate , setToDate] = useState(dayjs(selectedItem?.end_date));
    const [file, setFIle] = useState(selectedItem?.original_filename);
    const {user} = useContext(AuthContext);
    const eventNameElement = useRef(null);
    const fromDateElement = useRef(null);
    const toDateElement = useRef(null);
    const descriptionElement = useRef(null);
    const [fromDateSelected , setFormDateSelected] = useState(false);
    const [toDateSelected , setToDateSelected] = useState(false);
    const handleOpenCalender1 = () => {
      setOpenCalendar1(true);
      setFormDateSelected(true);
    }

    const handleOpenCalender2 = () => {
      setOpenCalendar2(true);
      setToDateSelected(true);
    }



    const handleFileUpload = (event) => {
      const files = Array.from(event.target.files);
      // Handle the uploaded file
      console.log(file)
      setFIle(files);
    };
    // const addEvent = async(body) => {
    //   try{
    //     const res = await axios.post("https://groundsageevent-be.onrender.com/api/v1/event/create-event-team-and-referral-code" , body);
    //     console.log(res);
    //     toast.success("Data Added Successfully"); 
    //   }catch(err){
    //     console.log(err);
    //     toast.error(err);
    //   }
    // }
    const handleClearFile = (index) => {
      setFIle((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };
    const handleSave = () => {
      let formattedFromDate = fromDateElement.current.value.split('/');
      let temp = formattedFromDate[0];
      formattedFromDate[0] = formattedFromDate[1]
      formattedFromDate[1] = temp;
      formattedFromDate = formattedFromDate.reverse().join('-');
      let formattedToDate = toDateElement.current.value.split('/');
      let tempTodate = formattedToDate[0];
      formattedToDate[0] = formattedToDate[1]
      formattedToDate[1] = tempTodate;
      formattedToDate = formattedToDate.reverse().join('-');

        const  body = { 
          event_name : eventNameElement.current.value,
          start_date : formattedFromDate,
          end_date : formattedToDate,
          event_description : descriptionElement.current.value,
          files : file
          // user_id : user?.user_id,
        }
     console.log(body);
     handleSaveEvent(body);
     
    }
    return (
      <Box sx={{ backgroundColor: "rgb(66, 92, 90)"  , height : "100vh",}}>
        <Typography
          variant="h3"
          sx={{
            color: "rgb(247, 230, 173)",
            textAlign: "center",
            padding: "20px 0px",
            fontWeight: "600",
            textShadow: "0 6px rgba(81,67,21,0.8)",
          }}
        >
          Edit Events
        </Typography>
        <Box sx={{display : "flex" , justifyContent : "center" , alignItems : "center" , } }>
            <Box sx={{ alignContent : "center" , width : "60%" ,  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2) , -5px -5px 10px rgba(0, 0, 0, 0.2)" , borderRadius : "10px"  ,padding : "40px"}}>
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
                label="Event Name"
                variant="standard"
                inputRef={eventNameElement}
                defaultValue={selectedItem?.event_name}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl
                  variant="standard"
                  sx={{ minWidth: 110, width: "70%", margin: "4px 0px " }}
                >
                  {fromDateSelected === false && <InputLabel id="from-date-label" sx={{color : "white"
                    ,
                    ...(fromDateElement && {
                      
                        color : "white",
                        opacity : "0.2",
                        paddingLeft : "100px"
                      ,
                    } ) ,
                  }}>From Date</InputLabel>}
                  <DatePicker
                    labelId="from-date-label"
                    value={dayjs(fromDate)}
                    onChange={(newValue) => console.log(newValue.$d)} // Handle onChange event if needed
                    open={openCalendar1}
                    minDate={dayjs(fromDate)}
                    onOpen={handleOpenCalender1}
                    onClose={() => setOpenCalendar1(false)}
                    inputRef={fromDateElement}
                    slotProps={{
                      textField: {
                        InputProps: {
                          endAdornment: (
                            <img
                              src="image-4.png"
                              style={{ cursor: "pointer" }}
                              onClick={handleOpenCalender1}
                            />
                          ),
                        },
                      },
                    }}
                    sx={{
                      "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                        border: "none",
                        borderRadius: "none",
  
                      },
                      "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                        color: "white",
                      },
                    //   "& :hover": {
                    //     borderBottom: " 1px solid rgb(188, 189, 163)",
                    //   },
                      "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input" : {
                        color : "white"
                      },

                      "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root" : {
                        borderRadius : "0px",
                        borderBottom: " 1px solid rgb(188, 189, 163)",
                      },
                      "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input" : {
                        paddingLeft : "1px",
                        color : "white"
                      }
                    }}
                    defaultValue={selectedItem?.start_date}
                  />
                </FormControl>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl
                  variant="standard"
                  sx={{ minWidth: 110, width: "70%", margin: "4px 0px " }}
                >
                  {toDateSelected === false && <InputLabel id="from-date-label" sx={{color : "white",
                    ...(fromDateElement && {
                      
                        color : "white",
                        opacity : "0.2",
                        paddingLeft : "100px"
                      ,
                    } ) ,}}>To date</InputLabel>}
                  <DatePicker
                    labelId="to-date-label"
                    value={dayjs(toDate)}
                    onChange={(newValue) => setToDate(newValue.$d)} // Handle onChange event if needed
                    open={openCalendar2}
                    onOpen={handleOpenCalender2}
                    onClose={() => setOpenCalendar2(false)}
                    minDate={dayjs(toDate)}
                    inputRef={toDateElement}
                    slotProps={{
                      textField: {
                        InputProps: {
                          endAdornment: (
                            <img
                              src="image-4.png"
                              style={{ cursor: "pointer" }}
                              onClick={handleOpenCalender2}
                            />
                          ),
                        },
                      },
                    }}
                    sx={{
                        "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            border: "none",
                            borderRadius: "none",
      
                          },
                          "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                            color: "white",
                          },
                        //   "& :hover": {
                        //     borderBottom: " 1px solid rgb(188, 189, 163)",
                        //   },
                          "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input" : {
                            color: "white",
                          },
                          "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root" : {
                            borderRadius : "0px",
                            borderBottom: " 1px solid rgb(188, 189, 163)",
                          },
                          "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input" : {
                            paddingLeft : "1px",
                            color : "white"
                          }

                    }}
                    defaultValue={selectedItem?.end_date}
                  />
                </FormControl>
              </LocalizationProvider>
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
                inputRef={descriptionElement}
                label="description"
                variant="standard"
                defaultValue={selectedItem?.event_description}
              />
            <div>
              <TextField
                id="upload-text"
                label="Add Event Image (Format: png, jpg)"
                variant="standard"
                value={file}
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
                  endAdornment: (
                    <IconButton
                      edge="end"
                      component="label"
                      htmlFor="upload-file"
                      sx={{ color: "rgb(188, 189, 163)" }}
                    >
                      <AttachFileIcon />
                      <input
                        type="file"
                        id="upload-file"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFileUpload}
                      />
                    </IconButton>
                  ),
                }}
              />
              {/* <List>
            {file?.map((file, index) => (
              <ListItem key={index} sx={{ padding: 0, marginTop: 1 }}>
                <ListItemText
                  primary={file.name}
                  sx={{ color: "rgb(255, 255, 255)" }}
                />
                <IconButton
                  edge="end"
                  onClick={() => handleClearFile(index)}
                  sx={{ color: "rgb(188, 189, 163)" }}
                >
                  <ClearIcon />
                </IconButton>
              </ListItem>
            ))}
          </List> */}
              </div>
            </Box>
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
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          
        
      </Box>
    );
}