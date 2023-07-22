import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { deleteShippingInfo } from "../../redux/actions/userAction";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LoadingButton from "@mui/lab/LoadingButton";

const AddressCard = ({
  info,
  index,
  navigate,
  dispatch,
  shippingInfo,
  isSmallScreen,
  btnLoading,
  setBtnLoading
}) => {
   
  const handleShip = (id)=> {
    sessionStorage.setItem("shipId", JSON.stringify(id));
    navigate("/order/confirm");
  };

  const handleDeleteAddress = (id) => {
    setBtnLoading(true);
    dispatch(deleteShippingInfo(id));
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: isSmallScreen
            ? "100%"
            : {
                lg: "20rem",
                sm: "50%",
              },
          margin: "2rem",
          height: isSmallScreen ? "18rem" : { lg: "18rem", md: "18rem", sm: "20rem" },
          boxShadow: "none",
          clipPath: "polygon(50% 0%, 100% 15%, 100% 100%, 0 100%, 0 16%)",
          backgroundColor: "rgba(204, 202, 202, 0.255)",
          borderRadius: "8px",
          overflowY: "auto", 
        }}
      >
        <CardContent sx={{ padding: "1rem", marginTop: "3rem" }}>
          <Typography variant="p" sx={{ fontSize: {lg:"1rem", md: "1rem",sm: "0.9rem", xs: "0.8rem"} }}>
            <Typography variant="span" sx={{ fontWeight: "bold" }}>
              Address:
            </Typography>{" "}
            {info.address}, {info.city}, {info.state}, {info.country},{" "}
            {info.pinCode}{" "}
          </Typography>

          <Typography sx={{ marginTop: 2, fontSize: {lg:"1rem", md: "1rem",sm: "0.9rem", xs: "0.8rem"} }}>
            <Typography variant="span" sx={{ fontWeight: "bold" }}>
              Phone No:
            </Typography>{" "}
            {info.phoneNumber}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            size="small"
            sx={{
              fontweight: "bold",
              fontSize: isSmallScreen
                ? "0.6rem"
                : { lg: "0.8rem", sm: "0.7rem" },
                borderRadius: "8px !important"
              }}
            className="btn"
            onClick={()=> handleShip(info._id)}
          >
          <Tooltip title="Ship Here">
            <LocalShippingIcon/>
          </Tooltip>
           
          </IconButton>
          {/* <Button size="small">Edit</Button> */}
          <LoadingButton
            size="small"
            loading={btnLoading}
            loadingPosition="center"
            onClick={() => handleDeleteAddress(info._id)}
          > 
            <Tooltip title="Delete Address">
              <ClearIcon color="error" />
            </Tooltip>
          </LoadingButton>
        </CardActions>
      </Card>
    </>
  );
};

export default AddressCard;
