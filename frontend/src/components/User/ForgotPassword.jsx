import React, { useEffect, useState } from "react";
import MetaData from "../Utility/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Spinner from "../Utility/Spinner";
import KeyIcon from "@mui/icons-material/Key";
import EmailIcon from "@mui/icons-material/Email";
import { clearUserErrors, forgotPassword } from "../../redux/actions/userAction";
import { Notify } from "../Utility/Notify";
import { validateEmail } from "../Utility/validateEmail";
import { FORGOT_PASSWORD_RESET } from "../../redux/action-types/user";

const ForgotPassword = () => {
  
  const [email, setEmail] = useState("");
   
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
        Notify("error", "Please Enter Email");
        return;
      }
  
    if (!validateEmail(email)) {
        Notify("error", "Please enter a valid email");
        return;
    }

    dispatch(forgotPassword(email));
    setEmail("");
  };

  useEffect(() => {
    if (error) {
      Notify("error", error);
      window.location.href=`/login`;
      dispatch(clearUserErrors());
    }

    if (message) {
      Notify("success", message);
      dispatch({type: FORGOT_PASSWORD_RESET});
    }
  }, [dispatch, error, message]);


  return (
    <>
      <MetaData title="ShopEasy - Forgot Password" />
      <Container component="main" maxWidth="xs">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: 15,
              }}
            >
              <Avatar sx={{ m: 1, backgroundColor: "rgb(7,133,121)" }}>
                <KeyIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{ fontWeight: "bold", marginTop: 3 }}
              >
                Forgot Password
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ width: "30rem" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <EmailIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  className="btn"
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontWeight: "bold",
                  }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default ForgotPassword;
