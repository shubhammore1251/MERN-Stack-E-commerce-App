import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import { Notify } from "../Utility/Notify";
import { useDispatch, useSelector } from "react-redux";
import { clearUserErrors, login } from "../../redux/actions/userAction";
import Spinner from "../Utility/Spinner";
import { IconButton, InputAdornment } from "@mui/material";
import MetaData from "../Utility/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../Utility/validateEmail";


function Copyright(props) {
  return (
    <Typography align="center" {...props}>
      Copyright
      <Typography
        component="a"
        href="/"
        className="link"
        sx={{ margin: "0 0.5rem" }}
      >
        © ShopEasy
      </Typography>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = user;

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.userData
  );


  useEffect(() => {
    if (error) {
      Notify("error", error);
      window.location.href = `/login`;
      dispatch(clearUserErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //Submit login data to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "" || (email === "" && password === "")) {
      Notify("error", "Please Fill All fields");
      return;
    }

    if (!validateEmail(email)) {
      Notify("error", "Please enter a valid email");
      return;
    }

    dispatch(login(email, password));
    setUser({ email: "", password: "" });
  };

  return (
    <>
      <MetaData title="ShopEasy - User Login" />
      <>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Avatar sx={{ m: 1, backgroundColor: "rgb(7,133,121)" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, width: { lg: "40%", sm: "70%", xs: "95%" } }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
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
                  Sign In
                </Button>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <>
                    <Link className="link" to="/password/forgotpassword">
                      <Typography
                        sx={{
                          fontSize: {
                            lg: "0.9rem",
                            sm: "0.9rem",
                            xs: "0.7rem",
                            fontWeight: "bold",
                            textDecoration: "underline",
                            textDecorationStyle: "solid",
                            display: "inline-block",
                          },
                        }}
                      >
                        Forgot password?
                      </Typography>
                    </Link>
                  </>
                  <>
                    <Link className="link" to="/signup">
                      <Typography
                        sx={{
                          fontSize: { lg: "0.9rem", sm: "0.9rem", xs: "0.7em" },
                          fontWeight: "bold",
                          textDecoration: "underline",
                          textDecorationStyle: "solid",
                          display: "inline-block",
                        }}
                      >
                        Don't have an account? Sign Up
                      </Typography>
                    </Link>
                  </>
                </Box>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </>
        )}
      </>
    </>
  );
}
