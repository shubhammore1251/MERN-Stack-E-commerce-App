import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ModalComp({
  search,
  open,
  handleClose,
  handleSearchChange,
  searchHandler,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Find Product...."
            type="text"
            fullWidth
            variant="standard"
            value={search}
            onChange={handleSearchChange}
            onKeyDown={(event)=> {
              if (event.key === "Enter") {
                searchHandler(event);
                handleClose();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(e) => {
              searchHandler(e);
              handleClose();
            }}
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
