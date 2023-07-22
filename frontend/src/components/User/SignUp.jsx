import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton, InputAdornment, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "../Utility/Notify";
import MetaData from "../Utility/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { clearUserErrors, register } from "../../redux/actions/userAction";
import Spinner from "../Utility/Spinner";
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

export default function SignUp() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const { firstname, lastname, email, password } = user;

  const [selectedFile, setSelectedFile] = useState(null);

  const [avatar, setAvatar] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  const { loading, error, isAuthenticated} = useSelector(
    (state) => state.userData
  );
  
  useEffect(() => {
    if (error) {
      Notify("error", error);
      window.location.href=`/signup`;
      dispatch(clearUserErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      ...user,
      avatar,
    };

    if (
      firstname === "" ||
      lastname === "" ||
      email === "" ||
      password === "" ||
      selectedFile === null ||
      (email === "" &&
        password === "" &&
        firstname === "" &&
        lastname === "" &&
        selectedFile === null)
    ) {
      Notify("error", "Please Fill All fields");
      return;
    }

    if (!validateEmail(email)) {
      Notify("error", "Please enter a valid email");
      return;
    }


    const fileSizeInBytes = selectedFile.size;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    if (fileSizeInMB > 10) {
      Notify("error", "Image size should be less than 10MB");
      return;
    }

    dispatch(register(userData));

    setUser({ firstname: "", lastname: "", email: "", password: "" });

    setSelectedFile(null);

    setAvatar("");
  };

  return (
    <>
      <MetaData title="ShopEasy - User Signup" />
      <>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Avatar sx={{ m: 1, backgroundColor: "rgb(7,133,121)" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3, width: { lg: "40%", sm: "70%", xs: "95%" } }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstname"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      value={firstname}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastname"
                      autoComplete="family-name"
                      value={lastname}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="new-password"
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
                  </Grid>

                  <Grid item xs={12} sm={8}>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileSelect}
                      id="image-upload"
                      name="profilepic"
                      required
                    />
                    <InputLabel htmlFor="image-upload" required>
                      <Button
                        component="span"
                        variant="contained"
                        startIcon={<AccountBoxIcon />}
                        color={selectedFile === null ? "error" : "success"}
                        sx={{ borderRadius: "2px"}}
                      >
                        Upload Pofile Image
                      </Button>
                    </InputLabel>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {selectedFile ? (
                      <img
                        src={avatar}
                        alt="Avatar"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "No file selected"
                    )}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  className="btn"
                  sx={{
                    mt: 3,
                    mb: 2,
                    fontweight: "bold",
                  }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link className="link" to="/login">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </>
        )}
      </>
    </>
  );
}
