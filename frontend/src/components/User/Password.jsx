import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "../Utility/Notify";
import { changePassword, clearUserErrors } from "../../redux/actions/userAction";
import { CHANGE_PASSWORD_RESET} from "../../redux/action-types/user";

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [buttonLoading, setButtonLoading] = useState(false);

  const matches = useMediaQuery('(max-width:600px)');

  const { error, isUpdated } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const handleClick = () => {
    setEditMode(!editMode);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSaveChanges = () => {
    const passwords ={
      oldPassword,
      newPassword,
      confirmPassword
    }

    if (oldPassword === "" || newPassword === "" || confirmPassword === "" ||  (oldPassword === "" || newPassword === "" || confirmPassword === "")) {
      Notify("error", "Please fill all fields");
      return;
    }

    dispatch(changePassword(passwords));
    setButtonLoading(!buttonLoading);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setEditMode(!editMode);
  };
  
  useEffect(() => {
    if (error) {
      Notify("error", error);
      setButtonLoading(!buttonLoading);
      window.location.href=`/`;
      dispatch(clearUserErrors());
    }

    if (isUpdated) {
      Notify("success", "password updated successfully");
      setButtonLoading(!buttonLoading);
      dispatch({ type: CHANGE_PASSWORD_RESET });
    }
  }, [buttonLoading,dispatch,error,isUpdated])

  return (
    <>
      <Box
       className="slide-in-blurred-left"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: matches? "center" :{lg:"flex-start", sm: "flex-start"},
          flexDirection: "column",
          width: "100%",
          margin: "0 1rem"
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
            Password Settings
          </Typography>
        </Box>

        <Box>
          <TextField
            margin="normal"
            required
            name="oldPassword"
            label="old password"
            type={showOldPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: matches? "20rem" : {lg: "25rem", sm: "20rem"} }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: matches? "center" :{lg:"flex-start", sm: "flex-start"},
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="new password"
            type={showNewPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: matches? "20rem" : {lg: "25rem", sm: "20rem"}, marginRight: {lg: "1rem", sm:"1rem", xs: 0}}}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="confirm password"
            type={showConfirmPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: matches? "20rem" : {lg: "25rem", sm: "20rem"}}}
          />
        </Box>

        <Box sx={{marginTop: "1rem"}}>
          {editMode ? (
            <>
              <LoadingButton
                className="btn"
                sx={{ backgroundColor: "rgb(254,189,105)", color: "black",borderRadius: "2px",border: "1px solid black", }}
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
              onClick={()=> setEditMode(!editMode)}
            >
              Change Password
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Password;
