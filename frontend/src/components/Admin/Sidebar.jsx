import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from '@mui/icons-material/Inventory';
import CreateIcon from '@mui/icons-material/Create';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Link } from "react-router-dom";

const drawerData = [
    {
        name: "Dashboard",
        icon: <DashboardIcon/>,
        url: "/admin/dashboard"
    },
    {
        name: "Products",
        icon: <InventoryIcon/>,
        url: "/admin/products"
    },
    {
        name: "Add Product",
        icon: <CreateIcon/>,
        url: "/admin/product/create"
    },
    {
        name: "Users",
        icon: <PeopleIcon/>,
        url: "/admin/users"
    },
    {
        name: "Orders",
        icon: <ShoppingBagIcon/>,
        url: "/admin/orders"
    },
    {
        name: "Reviews",
        icon: <ReviewsIcon/>,
        url: "/admin/reviews"
    }

]

const Sidebar = ({open, setOpen}) => {
  

  const toggleDrawer = (sidebarDrawer) => () => {
    setOpen(sidebarDrawer);
  };

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className="nav-color" sx={{height: "100vh"}}>
        {drawerData.map((item, index) => (
          <ListItem key={index} disablePadding>
            <Link to={item.url} className="link">
            <ListItemButton>
              <ListItemIcon sx={{color: "rgb(7,133,121)"}}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} sx={{color: "black"}}/>
            </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </>
  );
};

export default Sidebar;
