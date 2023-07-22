import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import MetaData from "../Utility/MetaData";
import TableList from "./TableList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Notify } from "../Utility/Notify";
import Spinner from "../Utility/Spinner";
import {
  clearUserErrors,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../../redux/actions/userAction";
import {
  DELETE_USER_RESET,
  UPDATE_USER_RESET,
} from "../../redux/action-types/user";
import LoadingButton from "@mui/lab/LoadingButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateUserModal from "./UpdateUserModal";
import DialogBox from "./DialogBox";

function createData(value1, value2, value3, value4, value5) {
  return { value1, value2, value3, value4, value5 };
}

const headers = {
  value1: "User ID",
  value2: "Name",
  value3: "Email",
  value4: "Role",
  value5: "Actions",
};

const UsersList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteIt, setDeleteIt] = useState("No");

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
  });

  const [userId, setUserId] = useState("");

  const { error, users, loading } = useSelector((state) => state.allUsers);

  const { error: getUserError } = useSelector((state) => state.getUser);

  const { loading: userDataLoading, userDetails } = useSelector(
    (state) => state.getUser
  );

  const {
    error: updateOrDeleteError,
    isDeleted,
    isUpdated,
    message,
  } = useSelector((state) => state.profile);

  const rows = [];

  useEffect(() => {
    if (error) {
      Notify("error", error);
      dispatch(clearUserErrors());
      window.location.href = "/admin/users";
    }

    if (updateOrDeleteError) {
      Notify("error", updateOrDeleteError);
      dispatch(clearUserErrors());
      window.location.href = "/admin/users";
    }

    if (isDeleted) {
      Notify("success", message);
      setBtnLoading(false);
      navigate("/admin/users");
      setUserId("");
      setDeleteIt("No");
      dispatch({ type: DELETE_USER_RESET });
    }

    if (isUpdated) {
      Notify("success", "Role Updated Successfully!");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }

    if (getUserError) {
      Notify("error", getUserError);
      window.location.href = "/admin/users";
      dispatch(clearUserErrors());
    }

    dispatch(getAllUsers());
  }, [
    dispatch,
    updateOrDeleteError,
    error,
    isDeleted,
    isUpdated,
    navigate,
    message,
    getUserError,
  ]);

  useEffect(() => {
    if (modalOpen && userId !== "") {
      dispatch(getSingleUser(userId));
    }

    if (userId && deleteIt === "Yes") {
      dispatch(deleteUser(userId));
    }
  }, [dispatch, modalOpen, userId, deleteIt]);

  const handleClickOpen = (id) => {
    setModalOpen(true);
    setUserId(id);
  };

  const handleClose = () => {
    setModalOpen(false);
    setUserId("");
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  
  const handleDialogClose = () => {
    setDialogOpen(false);
    setBtnLoading(false);
    setUserId("");
    setDeleteIt("No");
  };

  const handleYes = () => {
    setDeleteIt("Yes");
    setDialogOpen(false);
  };

  const deleteUserHandler = (id) => {
    setBtnLoading(true);
    setDialogOpen(true);
    setUserId(id);
  };

  const handleSubmit = () => {
    dispatch(updateUser(userId, userData));
    setModalOpen(false);
    setUserId("");
  };

  users &&
    users.forEach((item) => {
      const actions = (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          <IconButton onClick={() => handleClickOpen(item._id)}>
            <EditIcon
              sx={{
                "&:hover": {
                  color: "#f29e0c",
                },
              }}
            />
          </IconButton>

          <LoadingButton
            onClick={() => deleteUserHandler(item._id)}
            loading={btnLoading}
            loadingPosition="center"
          >
            {!btnLoading && (
              <DeleteIcon
                sx={{
                  color: "black",
                  "&:hover": {
                    color: "red",
                  },
                }}
              />
            )}
          </LoadingButton>
        </Box>
      );

      const fullName = `${item?.firstname} ${item?.lastname}`;
      const email =
        item.email.length > 25 ? `${item.email.slice(0, 25)}...` : item.email;
      rows.push(createData(item._id, fullName, email, item.role, actions));
    });

  return (
    <>
      <MetaData title="Admin - All Users" />
      <AdminNavbar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      <Box
        className="slide-in-blurred-left"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "2rem 0",
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "600", letterSpacing: "2px" }}
        >
          All Users
        </Typography>

        {loading ? (
          <Spinner />
        ) : (
          <Box
            sx={{
              width: "100%",
              padding: "1rem",
            }}
          >
            <TableList rows={rows} headers={headers} />
          </Box>
        )}

        <UpdateUserModal
          open={modalOpen}
          userData={userData}
          loading={userDataLoading}
          userDetails={userDetails}
          setUserData={setUserData}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />

        <DialogBox
          dialogOpen={dialogOpen}
          handleDialogClose={handleDialogClose}
          handleYes={handleYes}
          deleteText="Delete User"
        />
      </Box>
    </>
  );
};

export default UsersList;
