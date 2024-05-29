import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function ShopRental() {
  return (
    <Grid item xs={6}>
      <FormControl
        variant="standard"
        sx={{ minWidth: 120, width: "100%", margin: "10px 0px " }}
      >
        <InputLabel
          id="demo-simple-select-standard-label"
          style={{ color: "white" }}
        >
          select shop
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="select shop"
          disableUnderline
          sx={{
            width: "100%",
            borderBottom: "1px solid rgb(188, 189, 163)",
            "& .MuiSelect-icon": {
              color: "rgb(188, 189, 163)",
              "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
                color: "white",
              },
              "& :focus": {
                backgroundColor: "none",
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
          width: "70%",
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
        label="decided amount"
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
          width: "70%",
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
        label="entered amount"
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
          width: "70%",
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
        label="outstanding amount (if any)"
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
        label="remarks"
        variant="standard"
      />
      <Grid item xs={6}></Grid>
    </Grid>
  );
}
