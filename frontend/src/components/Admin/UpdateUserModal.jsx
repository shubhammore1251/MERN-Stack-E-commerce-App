import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import Spinner from "../Utility/Spinner";

export default function UpdateUserModal({
  open,
  userData,
  setUserData,
  handleClose,
  handleSubmit,
  handleChange,
  userId,
  userDetails,
  loading,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && userDetails) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        firstname: userDetails?.firstname,
        lastname: userDetails?.lastname,
        email: userDetails?.email,
        role: userDetails?.role,
      }));
    }
  }, [dispatch, setUserData, userDetails, open]);


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{fontWeight: "bold", wordSpacing: "2px", textAlign: "center"}}>Update User Role</DialogTitle>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <DialogContent>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: {lg: "flex-start", sm: "flex-start", xs: "center"}, flexDirection: "column", padding: 2, }}>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: {lg: "1rem", sm: "1rem", xs: "0.8rem"},
                    fontWeight: "bold",
                    textAlign: { lg: "left", sm: "left", xs: "center" },
                    width: {lg:"25rem", sm: "25rem", xs: "15rem"},
                  }}
                >
                  Name:
                  <Typography
                    variant="span"
                    sx={{
                      fontWeight: "500",
                      ml: 2,
                      mr:1
                    }}
                  >
                    {userData?.firstname} {userData?.lastname}
                  </Typography>
                  ({userDetails?.role})
                </Typography>

                <Typography
                  variant="p"
                  sx={{
                    fontSize: {lg: "1rem", sm: "1rem", xs: "0.8rem"},
                    fontWeight: "bold",
                    textAlign: { lg: "left", sm: "left", xs: "center" },
                    width: {lg:"25rem", sm: "25rem", xs: "15rem"},
                    mt: 2
                  }}
                >
                  Email:
                  <Typography
                    variant="span"
                    sx={{
                      fontWeight: "500",
                      ml: 2
                    }}
                  >
                    {userData?.email?.length> 25 ? `${userData?.email.slice(0,25)}...` : userData?.email }
                  </Typography>
                </Typography>

                <FormControl
                  variant="filled"
                  sx={{ width: "100%", marginTop: 2 }}
                >
                  <InputLabel required id="demo-simple-select-filled-label">
                    Update Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    name="role"
                    size="small"
                    value={userData?.role || ""}
                    type="text"
                    onChange={handleChange}
                  > 
                    {userDetails?.role === "user" && (
                      <MenuItem value="admin">Admin</MenuItem>
                    )}

                    {userDetails?.role === "admin" && (
                      <MenuItem value="user">User</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                className="btn"
                sx={{
                  backgroundColor: "rgba(254,189,105)",
                  color: "black",
                  fontWeight: { lg: "bold", sm: "800", xs: "700" },
                  borderRadius: "2px",
                  border: "1px solid black",
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                className="btn"
                sx={{
                  fontWeight: { lg: "bold", sm: "800", xs: "700" },
                }}
                onClick={handleSubmit}
                disabled={userDetails?.role === userData?.role}
              >
                Submit
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
