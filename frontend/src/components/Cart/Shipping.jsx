import React, { useEffect, useState } from "react";
import MetaData from "../Utility/MetaData";
import { Notify } from "../Utility/Notify";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CheckOutSteps from "./CheckOutSteps";
import {
  addShippingInfo,
  clearUserErrors,
  getShippingInfo,
} from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import AddressCard from "./AddressCard";
import Spinner from "../Utility/Spinner";
import {
  ADD_SHIPPING_INFO_RESET,
  DELETE_SHIPPING_INFO_RESET,
} from "../../redux/action-types/user";
import AddHomeIcon from '@mui/icons-material/AddHome';

const Shipping = () => {
  const [shippingData, setShippingData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNumber: "",
  });

  const { address, city, state, country, pinCode, phoneNumber } = shippingData;

  const isSmallScreen = useMediaQuery("(max-width:660px)");

  const { shippingInfo, loading, error, success, isDeleted } = useSelector(
    (state) => state.shippingInfo
  );

  const [showForm, setShowForm] = useState(true);

  const [btnLoading, setBtnLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      address === "" ||
      city === "" ||
      state === "" ||
      country === "" ||
      pinCode === "" ||
      phoneNumber === "" ||
      (address === "" &&
        city === "" &&
        state === "" &&
        country === "" &&
        pinCode === "" &&
        phoneNumber === "")
    ) {
      Notify("error", "Please fill all fields");
      return;
    }

    if (phoneNumber.length < 10 || phoneNumber.length > 10) {
      Notify("error", "Phone number should be 10 digits long!");
      return;
    }

    const data = {
      ...shippingData,
      phoneNumber: Number(phoneNumber),
      pinCode: Number(pinCode),
    };

    dispatch(addShippingInfo(data));
    setTimeout(() => {
      dispatch(getShippingInfo());
    }, 1000);
    setShippingData({
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      phoneNumber: "",
    });
  };

  const handleChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      Notify("error", error);
      window.location.href = "/";
      setBtnLoading(false);
      dispatch(clearUserErrors());
    }
    dispatch(getShippingInfo());

    if (success) {
      dispatch(getShippingInfo());
      Notify("success", "Shipping info Added SuccessFully!");
      dispatch({ type: ADD_SHIPPING_INFO_RESET });
    }

    if (isDeleted) {
      dispatch(getShippingInfo());
      Notify("success", "Shipping info deleted!");
      setBtnLoading(false);
      dispatch({ type: DELETE_SHIPPING_INFO_RESET });
    }
  }, [dispatch, error, isDeleted, success]);

  useEffect(() => {
    if (shippingInfo.length > 0) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  }, [shippingInfo]);

  const handleAddNewAddress = () => {
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
    setShippingData({
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
      phoneNumber: "",
    });
  };

  return (
    <>
      <MetaData title="Shipping Details" />
      <CheckOutSteps activeStep={0} />
      <>
        {loading ? (
          <Spinner />
        ) : (
          <Box
            className="slide-in-blurred-left"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: { lg: "1rem 0", sm: "2rem 0", xs: "1rem" },
            }}
          >
            <Typography component="h1" variant="h5">
              Shipping Details
            </Typography>

            {showForm === false ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {lg: "row", sm: "row", xs: "column-reverse"},
                  justifyContent: "center",
                  alignItems: {lg:"flex-start", sm: "flex-start", xs: "center"},
                  margin: "2rem 0",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: isSmallScreen
                      ? "column"
                      : { lg: "row", sm: "row" },
                    justifyContent: "center",
                    alignItems: "center",
                    // flexWrap: "wrap"
                  }}
                >
                  {shippingInfo &&
                    shippingInfo.map((info) => (
                      <AddressCard
                        key={info._id}
                        info={info}
                        navigate={navigate}
                        dispatch={dispatch}
                        shippingInfo={shippingInfo}
                        isSmallScreen={isSmallScreen}
                        btnLoading={btnLoading}
                        setBtnLoading={setBtnLoading}
                      />
                    ))}
                </Box>
                <IconButton
                  sx={{
                    fontweight: "bold",
                    fontSize: "0.8rem",
                    borderRadius: "8px !important",
                  }}
                  className="btn"
                  onClick={handleAddNewAddress}
                  disabled={shippingInfo.length === 2 ? true : false}
                > 
                  <Tooltip title="Add New Address">
                    <AddHomeIcon/>
                  </Tooltip>
                </IconButton>
              </Box>
            ) : (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  marginTop: 5,
                  width: { lg: "40%", sm: "60%", xs: "100%" },
                }}
              >
                <TextField
                  autoComplete="address"
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  autoFocus
                  value={address}
                  onChange={handleChange}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
                  value={city}
                  onChange={handleChange}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="pincode"
                  label="Pincode"
                  name="pinCode"
                  autoComplete="pincode"
                  value={pinCode}
                  type="number"
                  onChange={handleChange}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="phoneNumber"
                  label="phone Number"
                  type="number"
                  id="phoneNumber"
                  autoComplete="new-password"
                  value={phoneNumber}
                  onChange={handleChange}
                />

                <FormControl
                  variant="filled"
                  sx={{ width: "100%", marginTop: 2 }}
                >
                  <InputLabel required id="demo-simple-select-filled-label">
                    Country
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={country}
                    name="country"
                    onChange={handleChange}
                  >
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <MenuItem key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>

                {country && (
                  <FormControl
                    variant="filled"
                    sx={{ width: "100%", marginTop: 2 }}
                  >
                    <InputLabel required id="demo-simple-select-filled-label">
                      State
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={state}
                      name="state"
                      onChange={handleChange}
                    >
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <MenuItem key={item.isoCode} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: {
                      lg: "space-around",
                      sm: "space-around",
                      xs: "center",
                    },
                    alignItems: "center",
                    flexDirection: { lg: "row", sm: "row", xs: "column" },
                    width: "100%",
                  }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    className="btn"
                    sx={{
                      mt: 3,
                      mb: 2,
                      fontweight: "bold",
                      width: { lg: "30%", sm: "40%", xs: "60%" },
                    }}
                  >
                    Continue
                  </Button>

                  {shippingInfo.length > 0 ? (
                    <Button
                      type="submit"
                      fullWidth
                      className="btn"
                      sx={{
                        mt: 3,
                        mb: 2,
                        fontweight: "bold",
                        width: { lg: "30%", sm: "40%", xs: "60%" },
                      }}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  ) : null}
                </Box>
              </Box>
            )}
          </Box>
        )}
      </>
    </>
  );
};

export default Shipping;
