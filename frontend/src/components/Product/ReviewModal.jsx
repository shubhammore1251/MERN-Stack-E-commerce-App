import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating } from "@mui/material";

export default function ReviewModalComp({
  open,
  review,
  rating,
  setReview,
  setRating,
  handleClose,
  handleSubmit,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Please Provide Your Review !</DialogTitle>
        <DialogContent>
          <Rating
            name="simple-controlled"
            precision={0.5}
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Type Your Review"
            type="text"
            fullWidth
            variant="standard"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            multiline={true}
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button
          className="btn"
            sx={{
              fontWeight: { lg: "bold", sm: "800", xs: "700" },
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
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
