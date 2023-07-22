import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";

export default function AdminNavbar({setOpen}) {
  const { userdata } = useSelector((state) => state.userData);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="nav-color" sx={{ position: "fixed",
          top: 0,
          zIndex: 1
          
        }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>setOpen(true)}
          >
            <MenuIcon  sx={{color:"black"}}/>
          </IconButton>
          <Typography component="div" sx={{ fontSize: {lg: "1.5rem", sm:"1.2rem", xs: "0.8rem"}, flexGrow: 1, color: "rgb(7,133,121)", fontWeight: "bold" }}>
            ShopEasy Admin
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "10%",
              flexDirection: "row-reverse",
            }}
          >
            <Avatar alt="Remy Sharp" src={userdata?.profilepic?.url} />
            <IconButton sx={{ color: "#fff" }} component="a" href="/">
              <Tooltip title="Back to Home">
                <HomeIcon  sx={{color:"rgb(7,133,121)"}}/>
              </Tooltip>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
