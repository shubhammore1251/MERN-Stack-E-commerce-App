import React, { useState } from "react";
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
import { InputBase, Paper, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import ModalComp from "./Utility/ModalComp";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userAction";
import { Notify } from "./Utility/Notify";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -8,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 8px",
  },
}));

const pages = [
  // {
  //   id: "11",
  //   linkName: "Home",
  //   url: "/",
  // },
  {
    id: "12",
    linkName: "Products",
    url: "/products",
  },
  // {
  //   id: "13",
  //   linkName: "Contact",
  //   url: "#3",
  // },
];

const Navbar = ({ userdata, showAnimation }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [open, setOpen] = useState(false);

  const [keyword, setKeyword] = useState("");

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.userData);

  const { cart } = useSelector((state) => state.getCart);

  const matches = useMediaQuery("(max-width:620px)");


  const logoutUser = () => {
    Notify("success", "Logged out successfully");
    dispatch(logout());
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const profile = [
    {
      id: "14",
      linkName: "Login",
      url: "/login",
      display: isAuthenticated ? "none" : "block",
      func: null,
      icon: <LoginIcon />,
    },
    {
      id: "15",
      linkName: "Signup",
      url: "/signup",
      display: isAuthenticated ? "none" : "block",
      func: null,
      icon: <VpnKeyIcon />,
    },
    {
      id: "16",
      linkName: "Admin",
      url: "/admin/dashboard",
      display: userdata?.role === "admin" ? "block" : "none",
      func: null,
      icon: <AdminPanelSettingsIcon />,
    },
    {
      id: "17",
      linkName: "Orders",
      url: "/user/orders",
      display: isAuthenticated ? "block" : "none",
      func: null,
      icon: <NoteAltIcon />,
    },
    {
      id: "18",
      linkName: "Profile",
      url: "/profile",
      display: isAuthenticated ? "block" : "none",
      func: null,
      icon: <AccountBoxIcon />,
    },
    {
      id: "19",
      linkName: "Logout",
      url: null,
      display: isAuthenticated ? "block" : "none",
      func: logoutUser,
      icon: <LogoutIcon />,
    },
  ];

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    setKeyword(event.target.value);
  };

  const searchHandler = (event) => {
    event.preventDefault();

    if (keyword.trim()) {
      navigate(`/products?query=${keyword}`);
      setKeyword("");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <AppBar
        position="static"
        className="nav-color"
        sx={{
          width: "100%",
          boxShadow: "none",
          position: "fixed",
          top: 0,
          zIndex: 1,
        }}
      >
        <Container maxWidth="false" sx={{ padding: { lg: 1, sm: 1, xs: 0 } }}>
          <Toolbar disableGutters>
            <Typography
              // variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                ml: 2,
                display: { xs: "none", md: "flex" },
                letterSpacing: ".2rem",
                color: "rgb(7,133,121)",
                textDecoration: "none",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              ShopEasy
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: "black" }} />
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
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Link to={page.url} className="link">
                      <Typography textAlign="center">
                        {page.linkName}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".2rem",
                textDecoration: "none",
                fontSize: matches ? "1rem" : { sm: "25px" },
                marginRight: "1rem",
              }}
            >
              <Link to="/" className="link" style={{ color: "rgb(7,133,121)" }}>
                ShopEasy
              </Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Link to={page.url} className="link" key={page.id}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 1,
                      color: "black",
                      display: "block",
                      letterSpacing: "3px",
                      marginLeft: "1rem",
                      fontWeight: "bold",
                      fontSize: { lg: "0.9rem", sm: "0.8rem" },
                      textTransform: "capitalize",
                    }}
                  >
                    {page.linkName}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <IconButton
                onClick={handleClickOpen}
                type="button"
                sx={{
                  padding: "0px",
                  display: matches ? "block" : { lg: "none", sm: "none" },
                  color: "black",
                  marginRight: { lg: "0.5rem", sm: "0.5rem", xs: "0" },
                }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>

              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: matches ? "none" : { lg: "flex", sm: "flex" },
                  alignItems: "center",
                  width: { lg: 250, sm: 215 },
                  height: { lg: 40 },
                  borderRadius: "px",
                  marginRight: "1rem",
                  border: "1px solid rgb(7,133,121)",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search for a Product"
                  inputProps={{ "aria-label": "Search for a Prdocut" }}
                  value={keyword}
                  onChange={handleSearchChange}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      searchHandler(event);
                    }
                  }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={searchHandler}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>

              <Link to="/cart">
                <IconButton
                  aria-label="cart"
                  sx={{ marginRight: { lg: "1rem", sm: "1rem", xs: "0.5rem" } }}
                  className={showAnimation? "swirl-in-fwd": ""}
                >
                  <StyledBadge
                    badgeContent={cart ? cart?.totalQuantity : 0}
                    color="success"
                    sx={{
                      fontSize: "0.5rem"
                    }}
                  >
                    <ShoppingCartIcon
                      sx={{
                        fontSize: { lg: "2rem", sm: "2rem", xs: "1.5rem" },
                        color: "rgb(7,133,121)",
                      }}
                    />
                  </StyledBadge>
                </IconButton>
              </Link>

              <Tooltip title="User Profile">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, marginLeft: "0.2rem" }}
                >
                  <Avatar
                    sx={{
                      border: "2px solid black",
                      width: { lg: "3rem", sm: "3rem", xs: "2.5rem" },
                      height: { lg: "3rem", sm: "3rem", xs: "2.5rem" },
                    }}
                    alt="user-icon"
                    src={userdata?.profilepic?.url}
                  />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
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
                {profile.map((item) => (
                  <Link
                    to={item.url}
                    key={item.id}
                    className="link"
                    style={{ display: `${item.display}` }}
                  >
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography mx={1}>{item.icon}</Typography>

                      <Typography textAlign="center" onClick={item.func}>
                        {item.linkName}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <ModalComp
        search={keyword}
        open={open}
        handleClose={handleClose}
        handleSearchChange={handleSearchChange}
        searchHandler={searchHandler}
      />
    </>
  );
};

export default Navbar;
