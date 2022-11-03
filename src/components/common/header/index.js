import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//importing MUI
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { pink } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

//importing images
import profile from "../../../public/images/profile.png";
import nomadic from "../../../public/images/Nomadic.png";

//importing styles
import styles from "./styles.module.css";

//importing other comps.
import Search from "./search";
import ButtonComponent from "../button";

const Header = ({ displaySearch = false, className = "" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={`${styles["main-header"]} ${className}`}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Link
          className={`${styles["custom-link"]} ${styles["logo"]}`}
          to={"/dashboard"}
        >
          <img className={styles["nomadic"]} src={nomadic} alt="nomadic"/>
        </Link>
        {displaySearch && <Search />}
        {!loggedIn && (
          <>
            <ButtonComponent
              onClick={() => navigate("/login")}
              className={styles["login-button"]}
            >
              Login
            </ButtonComponent>
          </>
        )}
        {loggedIn && (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <img className={styles["profile-image"]} src={profile} alt="nomadic" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {loggedIn && (
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {loggedIn && (
            <div>
              {" "}
              <MenuItem>
                <Link
                  className={`${styles["custom-link"]} ${styles["header-name"]}`}
                  to={"/profile"}
                >
                  Hi {userDetails.name}
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className={styles["custom-link"]} to={"/profile"}>
                  <Avatar sx={{ bgcolor: "#924bf8b8" }}>
                    <PersonIcon />
                  </Avatar>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className={styles["custom-link"]} to={"/update/password"}>
                  <Avatar sx={{ bgcolor: "#3697959e" }}>
                    <PasswordIcon />
                  </Avatar>
                  Update Password
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className={styles["custom-link"]} to={"/bookings"}>
                  <Avatar sx={{ bgcolor: "#3697959e" }}>
                    <LibraryBooksIcon />
                  </Avatar>
                  My Bookings
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className={styles["custom-link"]} to={"/orders"}>
                  <Avatar sx={{ bgcolor: "#3697959e" }}>
                    <AssignmentIcon />
                  </Avatar>
                  My Orders
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className={styles["custom-link"]} to={"/wishlist"}>
                  <Avatar sx={{ bgcolor: "#3697959e" }}>
                    <FavoriteIcon />
                  </Avatar>
                  Wishlist
                </Link>
              </MenuItem>
              <MenuItem>
                <Link className={styles["custom-link"]} to={"/properties"}>
                  <Avatar sx={{ bgcolor: "#3697959e" }}>
                    <LocationOnIcon />
                  </Avatar>
                  My Rentals
                </Link>
              </MenuItem>
              <MenuItem onClick={logoutHandler}>
                <Avatar sx={{ bgcolor: "#ff0040b8" }}>
                  <Logout fontSize="small" />
                </Avatar>
                {/* <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon> */}
                Logout
              </MenuItem>
            </div>
          )}
          {!loggedIn && (
            <div>
              <MenuItem>
                <Link className={styles["custom-link"]} to={"/login"}>
                  <Avatar sx={{ bgcolor: pink[500] }}>
                    <PersonIcon />
                  </Avatar>
                  Login
                </Link>
              </MenuItem>
            </div>
          )}
        </Menu>
      )}
    </div>
  );
};

export default Header;
