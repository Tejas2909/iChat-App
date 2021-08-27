import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import Logo from "../../../assets/images/Logo.png";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [isLoading, setIsLoading] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const toggleDrawer = () => {};
  const Logout = async () => {
    setIsLoading(1);
    const res = await axios.post("/api/logout", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      localStorage.removeItem("user");
      props.setIsAuthenticated(false);
      history.push("/");
      props.setAlert("logout successful");
      props.setUsername(null);
      props.setToken(null);
    } else {
      props.setAlert("logout failed");
    }
    setIsLoading(0);
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      style={{ padding: "1rem 2.3rem" }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!props.isAuthenticated ? (
        <>
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <NavLink
                activeClassName="activeLink"
                style={{
                  fontSize: "20px",
                  color: "black",
                  textDecoration: "none",
                }}
                to="/login"
              >
                Login
              </NavLink>
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <NavLink
                activeClassName="activeLink"
                style={{
                  fontSize: "20px",
                  color: "black",
                  textDecoration: "none",
                }}
                to="/register"
              >
                Register
              </NavLink>
            </IconButton>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem>
            <NavLink
              to="/chat_screen"
              style={{
                fontSize: "20px",
                color: "black",
                textDecoration: "none",
                textTransform: "capitalize!important",
              }}
            >
              <IconButton
                style={{
                  fontSize: "20px",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                Chat Room
              </IconButton>
            </NavLink>
          </MenuItem>

          <MenuItem>
            <IconButton
              onClick={Logout}
              style={{
                fontSize: "20px",
                color: "black",
                textDecoration: "none",
              }}
              aria-label="show 4 new mails"
            >
              Logout
            </IconButton>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <img className="AppLogo" src={Logo} />
          <Typography className={classes.title} variant="h6" noWrap>
            {props.username ? <>Welcome {props.username} to </> : null}
            iChat Application
          </Typography>
          <div className={classes.grow} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className={classes.sectionDesktop}
          >
            {!props.isAuthenticated ? (
              <>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <NavLink
                    activeClassName="activeLink"
                    style={{
                      fontSize: "20px",
                      color: "white",
                      textDecoration: "none",
                    }}
                    to="/register"
                  >
                    Register
                  </NavLink>
                </IconButton>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <NavLink
                    activeClassName="activeLink"
                    style={{
                      fontSize: "20px",
                      color: "white",
                      textDecoration: "none",
                    }}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </IconButton>
              </>
            ) : (
              <>
                <NavLink
                  to="/chat_screen"
                  style={{
                    fontSize: "20px",
                    color: "white",
                    textDecoration: "none",
                    textTransform: "capitalize!important",
                  }}
                >
                  <IconButton
                    style={{
                      fontSize: "20px",
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    Chat Room
                  </IconButton>
                </NavLink>

                <IconButton
                  onClick={Logout}
                  style={{
                    fontSize: "20px",
                    color: "white",
                    textDecoration: "none",
                  }}
                  aria-label="show 4 new mails"
                >
                  Logout
                </IconButton>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
