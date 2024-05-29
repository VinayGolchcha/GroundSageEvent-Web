import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContext";

const pages = [ "Home" , "Events", "Shops", "Teams", "Transaction", "Notes", "Reports"];

function Navbar({ handleOpen , isActive , activeEventId}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [currentActiveEventName , setCurrentActiveEventName] = React.useState(null);
  const { logout } = React.useContext(AuthContext);
  const [settings , setSettings ] = React.useState(["Event Atrangi" ,"Visit Profile", "Logout"]);
  const location = useLocation(); 
  const navigate = useNavigate();
  console.log(isActive);
  console.log(activeEventId)
  // React.useEffect(()=> {
  //   const currentActiveEvent = isActive?.filter((item) => (item.id === activeEventId));
  //   console.log(currentActiveEvent);
  //   let newActiveEvent = currentActiveEvent.length === 0 ? "Event Atrangi" : currentActiveEvent[0].event_name;
  //   setCurrentActiveEventName(newActiveEvent);
  //   console.log(currentActiveEventName)
  //   const newSettings = [currentActiveEventName ,"Visit Profile", "Logout"];
  //   setSettings(newSettings)
  // } , [activeEventId])
  if (
    location.pathname === "/" ||
    location.pathname === "/entermail" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup"
  ) {
    return null;
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    try {
      // Call logout function from AuthContext
      await logout();
      // Redirect to the login page or any other page
      // Example: navigate("/login");
    } catch (error) {
      // Handle logout error
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: "rgb(78, 101, 100)", boxShadow: "none"  }}
      >
          <Toolbar disableGutters>
            {/* <NavLink to="/" style={{ textDecoration: "none" }}> */}
              <Box
                component="img"
                src="../../../Images/logo_1 1.png"
                alt="logo"
                sx={{
                  height: "45px",
                  display: { xs: "none", md: "block" },
                  // justifyContent: "leftwid",
                  // alignItems:"left",
                  marginLeft:"30px"
                }}
              />
            {/* </NavLink>   */}
            <Box sx={{  display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              component="img"
              src="../../../Images/logo_1 1.png"
              alt="Right Arrow"
              sx={{
                marginRight: "5px",
                height: "45px",
                display: { xs: "flex", md: "none" },
                justifyContent:"left",
              }}
            />
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "space-around",
                marginLeft: "10%",
                width:"80%"
              }}
            >
              {pages.map((page) => (
                <NavLink
                  key={page}
                  to={page.toLowerCase()} // Make sure pathnames are lowercase
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      my: 2,
                      // justifyContent: "space-around",
                      // width: "150px",
                      // display: "flex",
                      // justifyContent: "space-between",
                      color: location.pathname.includes(page.toLowerCase())
                        ? "rgb(247, 230, 173)"
                        : "white",
                      fontSize: "18px",
                      fontFamily: "Inter",
                      fontWeight: location.pathname.includes(page.toLowerCase())
                        ? "700"
                        : "500",
                      textDecoration: location.pathname.includes(
                        page.toLowerCase()
                      )
                        ? "underline rgb(247, 230, 173)"
                        : "none",
                      textTransform: "none",
                    }}
                  >
                    {page}
                  </Button>
                </NavLink>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0,marginRight:"50px",}}>
                  <Avatar alt="" src="../../Component/profile..png" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                PaperProps={{
                  sx: {
                    background: "rgb(219,216,216)",
                  },
                }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box
                  sx={{
                    background: "rgb(219, 216, 216)",
                    margin: "0",
                    padding: "0",
                  }}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        sx={{
                          color: "rgb(151, 151, 151)",
                          fontFamily: "Inter",
                          lineHeight: "1",
                          marginTop: "0px",
                          fontSize: "16px",
                          padding: "7px",
                          borderRadius: "6px",
                          fontWeight: "700",
                          transition: "background-color 0.3s, color 0.3s",
                          "&:hover": {
                            color: "rgb(247, 230, 173)",
                            backgroundColor: "rgb(151, 151, 151)",
                          },
                        }}
                        onClick={() => {
                          (setting === "Visit Profile" &&
                            navigate("/Profile")) ||
                            (setting === "Logout" && handleLogout()) || (setting === "Event Atrangi" && handleOpen());
                        }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Box>
              </Menu>
            </Box>
          </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
