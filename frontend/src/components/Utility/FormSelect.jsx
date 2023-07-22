import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { updateCartQuantity } from "../../redux/actions/cartAction";

const FormSelect = ({
  quantity,
  setQuantity,
  stock,
  CartComp,
  productId,
  dispatch,
  userId,
}) => {
  const options = [];

  for (let i = 1; i <= stock; i++) {
    options.push(i);
  }

  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);
  const [isQuantityChanged, setIsQuantityChanged] = useState(false);

  const handleQuantityChange = (e) => {
    if (CartComp) {
      setUpdatedQuantity(e.target.value);
      setIsQuantityChanged(!isQuantityChanged);
      return;
    }
    setQuantity(e.target.value);
  };

  useEffect(() => {
    if (isQuantityChanged) {
      dispatch(updateCartQuantity(productId, updatedQuantity));
      setIsQuantityChanged(false);
    }
  }, [isQuantityChanged, updatedQuantity, productId, userId, dispatch]);

  return (
    <FormControl
      variant="filled"
      className="form-select"
      sx={{
        width: {
          lg: CartComp ? "15%" : "25%",
          sm: CartComp ? "25%" : "40%",
          xs: "40%",
        },
      }}
    >
      {CartComp ? null : (
        <InputLabel
          id="demo-simple-select-filled-label"
          htmlFor="uncontrolled-native"
          sx={{ color: "black", fontSize: "18px" }}
        >
          Quantity
        </InputLabel>
      )}
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={CartComp ? updatedQuantity : quantity}
        onChange={handleQuantityChange}
      >
        {options.map((num, i) => (
          <MenuItem key={i * 2012} value={num}>
            {num}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
