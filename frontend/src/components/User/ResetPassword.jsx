import React, { useEffect, useState } from "react";
import {  clearUserErrors, resetPassword } from "../../redux/actions/userAction";
import { Notify } from "../Utility/Notify";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../Utility/MetaData";
import Spinner from "../Utility/Spinner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { error, success, loading } = useSelector((state) => state.forgotPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSaveChanges = () => {
    const passwords = {
      password,
      confirmPassword,
    };

    dispatch(resetPassword(token, passwords));
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (error) {
      Notify("error", error);
      window.location.href=`/login`;
      dispatch(clearUserErrors());
    }

    if (success) {
      Notify("success", "password updated successfully");
      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);

  return (
    <>
      <MetaData title="ShopEasy - Reset Password"/>
      {loading ? (
        <Spinner />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            flexWrap: "wrap",
            margin: "4rem 2rem",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
              Reset Password
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              flexWrap: "wrap",
              marginTop: 5,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="Password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ width: { lg: "25rem", sm: "20rem" } }}
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
              sx={{ width: { lg: "25rem", sm: "20rem" } }}
            />
          </Box>

          <Box sx={{ marginTop: "1rem" }}>
            <Button
              className="btn"
              onClick={handleSaveChanges}
            >
              <span>Update Password</span>
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ResetPassword;
