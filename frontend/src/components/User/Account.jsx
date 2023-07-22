import React, { useEffect, useState } from "react";
import { Box, Button, Input, InputLabel, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "../Utility/Notify";
import {
  clearUserErrors,
  loadUser,
  updateProfile,
} from "../../redux/actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../redux/action-types/user";
import LoadingButton from "@mui/lab/LoadingButton";
import { validateEmail } from "../Utility/validateEmail";

const Account = ({ userdata }) => {
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [updatedFile, setUpdatedFile] = useState(null);

  const [buttonLoading, setButtonLoading] = useState(false);

  const { error, isUpdated } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const handleClick = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleUpdateFile = (e) => {
    const file = e.target.files[0];
    setUpdatedFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSaveChanges = () => {
    const data = {
      ...userInfo,
      avatar,
    };

    if (avatar) {
      const fileSizeInBytes = updatedFile.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

      if (fileSizeInMB > 10) {
        Notify("error", "Image size should be less than 10MB");
        return;
      }
    }

    if (!validateEmail(userInfo.email)) {
      Notify("error", "Please enter a valid email");
      return;
    }

    dispatch(updateProfile(data));
    setButtonLoading(!buttonLoading);
  };

  useEffect(() => {
    if (userdata) {
      setUserInfo({
        firstname: userdata?.firstname,
        lastname: userdata?.lastname,
        email: userdata?.email,
      });

      setAvatarPreview(userdata?.profilepic?.url);
    }

    if (error) {
      Notify("error", error);
      setButtonLoading(!buttonLoading);
      window.location.href=`/`;
      dispatch(clearUserErrors());
    }

    if (isUpdated) {
      Notify("success", "Profile updated successfully");
      setButtonLoading(!buttonLoading);
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [isUpdated, dispatch, error, userdata, buttonLoading]);

  const typogrpahyData = [
    {
      label: "First Name",
      valuefeild: userdata?.firstname,
    },
    {
      label: "Last Name",
      valuefeild: userdata?.lastname,
    },
    {
      label: "E-mail",
      valuefeild: userdata?.email,
    },
  ];

  return (
    <>
      <Box
        className="slide-in-blurred-left"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: { lg: "flex-start", sm: "flex-start", xs: "center" },
          flexDirection: "column",
          margin: "0 2rem",
          width: "100%",
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
            Account
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: { lg: "flex-start", sm: "flex-start", xs: "center" },
            flexDirection: "column",
            gap: "2rem",
            width: "100%",
          }}
        >
          {editMode ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: " center",
                alignItems: "center",
              }}
            >
              {updatedFile ? (
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : null}

              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                name="profilepic"
                onChange={handleUpdateFile}
              />

              <InputLabel htmlFor="image-upload">
                <Button
                  component="span"
                  variant="contained"
                  startIcon={<AccountBoxIcon />}
                  color={updatedFile === null ? "error" : "success"}
                  sx={{ borderRadius: "2px",border: "1px solid black" }}
                >
                  Update Photo
                </Button>
              </InputLabel>
            </Box>
          ) : null}

          <Box
            sx={{
              display: "flex",
              justifyContent: {
                lg: "flex-start",
                sm: "flex-start",
                xs: "center",
              },
              alignItems: { lg: "flex-start", sm: "center", xs: "center" },
              gap: "1rem",
              padding: "2rem 0",
              flexWrap: "wrap",
              width: "100%",
              flexDirection: { lg: "row", sm: "row", xs: "column" },
            }}
          >
            {editMode ? (
              <>
                <Box
                  sx={{ textAlign: { lg: "left", sm: "left", xs: "center" } }}
                >
                  <InputLabel htmlFor="firstName">First Name</InputLabel>
                  <Input
                    id="firstName"
                    name="firstname"
                    required
                    value={userInfo.firstname}
                    onChange={handleChange}
                    sx={{ width: { lg: "12rem", sm: "12rem", xs: "18rem" } }}
                  />
                </Box>

                <Box
                  sx={{ textAlign: { lg: "left", sm: "left", xs: "center" } }}
                >
                  <InputLabel htmlFor="lastName">Last Name</InputLabel>
                  <Input
                    id="lastName"
                    name="lastname"
                    required
                    value={userInfo.lastname}
                    onChange={handleChange}
                    sx={{ width: { lg: "12rem", sm: "12rem", xs: "18rem" } }}
                  />
                </Box>

                <Box
                  sx={{ textAlign: { lg: "left", sm: "left", xs: "center" } }}
                >
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    required
                    value={userInfo.email}
                    onChange={handleChange}
                    sx={{ width: { lg: "12rem", sm: "12rem", xs: "18rem" } }}
                  />
                </Box>
              </>
            ) : (
              <>
                {typogrpahyData.map((data, i) => (
                  <Box
                    key={i * 1991}
                    sx={{ marginLeft: { lg: "1.2rem", sm: "0rem", xs: "0" } }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                        textAlign: { lg: "left", sm: "left", xs: "center" },
                      }}
                    >
                      {data.label}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "1rem",
                        textAlign: { lg: "left", sm: "left", xs: "center" },
                      }}
                    >
                      {data.valuefeild}
                    </Typography>
                  </Box>
                ))}
              </>
            )}
          </Box>

          <Box>
            {editMode ? (
              <>
                <LoadingButton
                  className="btn"
                  sx={{
                    backgroundColor: "rgb(254,189,105)",
                    color: "black",
                    borderRadius: "2px",
                    border: "1px solid black",
                  }}
                  loading={buttonLoading}
                  onClick={handleSaveChanges}
                >
                  <span>Save Changes</span>
                </LoadingButton>

                <Button
                  className="btn"
                  sx={{
                    marginLeft: "1rem",
                  }}
                  onClick={handleClick}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                className="btn"
                onClick={handleClick}
              >
                Update Profile
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Account;
