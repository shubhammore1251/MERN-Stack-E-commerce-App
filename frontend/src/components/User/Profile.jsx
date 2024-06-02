import React, { useState } from "react";
import { useSelector } from "react-redux";
import MetaData from "../Utility/MetaData";
import {
  Avatar,
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import Spinner from "../Utility/Spinner";
import HomeIcon from "@mui/icons-material/Home";
import KeyIcon from "@mui/icons-material/Key";
import Account from "./Account";
import Password from "./Password";

const Profile = () => {
  const { userdata, loading } = useSelector((state) => state.userData);

  const [activeComponent, setActiveComponent] = useState("account");

  const handleItemClick = (component) => {
    setActiveComponent(component);
  };

  const profileData = [
    {
      compNam: "Account",
      icon: <HomeIcon />,
      active: "account",
    },
    {
      compNam: "Password",
      icon: <KeyIcon />,
      active: "password",
    },
  ];

  return (
    <>
      <MetaData title={`${userdata?.firstname} - Profile`} />
      <>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: {
                  lg: "flex-start",
                  sm: "flex-start",
                  xs: "center",
                },
                margin: "2rem 2rem",
                flexDirection: { lg: "row", sm: "row", xs: "column" },
              }}
              className="profile-box slide-in-blurred-left"
            >
              <Box
                className="profile-sidebar"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: {
                    lg: "flex-start",
                    sm: "flex-start",
                    xs: "center",
                  },
                  flexDirection: "column",
                  height: { lg: "60vh", sm: "60vh", xs: "22rem" },
                  width: { lg: "15rem", sm: "15rem", xs: "100%" },
                  borderRight: {
                    lg: "3px solid #e2e5ed",
                    sm: "3px solid #e2e5ed",
                    xs: "none",
                  },
                }}
              >
                <Avatar
                  alt="user-icon"
                  src={userdata?.profilepic?.url}
                  sx={{ width: "10rem", height: "10rem" }}
                />

                <Typography
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    marginTop: "1rem",
                  }}
                >
                  #user{userdata?._id?.slice(0, 8)}...
                </Typography>

                <MenuList
                  sx={{
                    width: "100%",
                  }}
                >
                  {profileData?.map((data, i) => (
                    <MenuItem
                      key={i * 1011}
                      sx={{
                        borderBottom: "2px solid #e2e5ed",
                        width: "100%",
                        backgroundColor:
                          activeComponent === data.active
                            ? "#0db8a7 !important"
                            : "",
                        color: activeComponent === data.active ? "white" : "",
                        "&:hover": { backgroundColor: "inherit" },
                      }}
                      onClick={() => handleItemClick(data.active)}
                    >
                      <ListItemIcon
                        sx={{
                          color: activeComponent === data.active ? "white" : "",
                        }}
                      >
                        {data.icon}
                      </ListItemIcon>
                      <ListItemText>{data.compNam}</ListItemText>
                    </MenuItem>
                  ))}
                </MenuList>
              </Box>

              {activeComponent === "account" && <Account userdata={userdata} />}
              {activeComponent === "password" && <Password />}
            </Box>
          </>
        )}
      </>
    </>
  );
};

export default Profile;
