import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { deleteCartItems } from "../../redux/actions/cartAction";
import FormSelect from "../Utility/FormSelect";
import { FormatPrice } from "../Utility/FormatPrice";
import LoadingButton from "@mui/lab/LoadingButton";

const CartCard = ({
  productName,
  category,
  image,
  productId,
  userId,
  dispatch,
  quantity,
  stock,
  price,
  btnLoading,
  setBtnLoading
}) => {
  const handleRemoveItem = () => {
    setBtnLoading(true);
    dispatch(deleteCartItems(productId));
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        padding: "1rem",
        boxShadow: "none",
      }}
    >
      <Box
        sx={{
          width: { lg: "15%", sm: "25%", xs: "60%", marginRight: "1rem" },
        }}
      >
        <CardMedia component="img" image={image} alt="" />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: { lg: "flex-start", sm: "flex-start", xs: "center" },
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { lg: "center", sm: "center", xs: "flex-start" },
            flexDirection: { lg: "row", sm: "row", xs: "column" },
            width: "100%",
          }}
        >
          <CardContent sx={{ width: "fit-content" }}>
            <Link className="link" to={`/product/${productId}`}>
              <Typography
                component="div"
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  fontSize: { lg: "1.2rem", sm: "1rem", xs: "1rem" },
                  width: "100%",
                }}
              >
                {productName.length > 32
                  ? `${productName.slice(0, 33)}...`
                  : productName}
              </Typography>

              <Typography
                variant="p"
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                status:&nbsp;&nbsp;
                <Typography
                  variant="span"
                  sx={{
                    fontWeight: "bold",
                    color: stock > 1 ? "green" : "red",
                  }}
                >
                  {stock > 1 ? "In-Stock" : "Out-of-Stock"}
                </Typography>
              </Typography>
            </Link>
          </CardContent>

          <CardContent sx={{ width: "fit-content" }}>
            <Typography
              sx={{
                fontSize: { lg: "1.2rem", sm: "1.2rem", xs: "1rem" },
                fontWeight: "bold",
              }}
            >
              <FormatPrice price={price}/>
            </Typography>
          </CardContent>
        </Box>
         
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: "0 1rem",
            width: "80%",
          }}
        >
          {stock>1 && (
            <FormSelect
            quantity={quantity}
            stock={stock}
            productId={productId}
            CartComp
            userId={userId}
            dispatch={dispatch}
          />
          )}

          <LoadingButton
            aria-label="delete"
            onClick={handleRemoveItem}
            color="error"
            loading={btnLoading}
            loadingPosition="center"
          >
            <DeleteIcon />
          </LoadingButton>
        </Box>
      </Box>
    </Card>
  );
};

export default CartCard;
