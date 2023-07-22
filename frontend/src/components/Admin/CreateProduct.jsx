import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Sidebar from "./Sidebar";
import {
  Box,
  Button,
  FormControl,
  Grid,
  ImageList,
  ImageListItem,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MetaData from "../Utility/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearProductErrors,
  createProduct,
} from "../../redux/actions/productsAction";
import { CREATE_NEW_PRODUCT_RESET } from "../../redux/action-types/product";
import { Notify } from "../Utility/Notify";
import Spinner from "../Utility/Spinner";

const CreateProduct = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pname, setPname] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, error, success } = useSelector(
    (state) => state.createProduct
  );

  const categories = [
    "Electronics",
    "Food",
    "Footwear",
    "Accessories",
    "Fitness",
    "Health",
    "Clothing",
  ];
  

  useEffect(() => {
    if (error) {
      Notify("error", error);
      dispatch(clearProductErrors());
    }

    if (success) {
      Notify("success", "Product Created Successfully");
      navigate("/admin/products");
      dispatch({ type: CREATE_NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, success]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      pname,
      price: Number(price),
      description,
      category,
      stock: Number(stock),
      images,
    };

    if (
      pname === "" ||
      price === "" ||
      description === "" ||
      category === "" ||
      stock === "" ||
      images.length === 0 ||
      (pname === "" &&
        price === "" &&
        description === "" &&
        category === "" &&
        stock === "" &&
        images.length === 0)
    ) {
      Notify("error", "Please Fill All fields");
      return;
    }

    dispatch(createProduct(product));
    setPname("");
    setPrice("");
    setDescription("");
    setCategory("");
    setStock("");
    setImages("");
    setImagesPreview("");
  };

  const createProductImagesChange = async (e) => {

    setImages([]);
    setImagesPreview([]);

    const files = Array.from(e.target.files);
  
    for (const file of files) {
      const fileSizeInBytes = file.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
  
      if (fileSizeInMB > 10) {
        Notify(
          "error",
          `${
            files.length > 1 ? "Each Image" : "Image"
          } size should be less than 10MB`
        );
        setImages([]);
        setImagesPreview([]);
        return;
      }
    
      await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((prev) => [...prev, reader.result]);
            setImages((prev) => [...prev, reader.result]);
            resolve();
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  return (
    <>
      <MetaData title="Admin Create Product" />
      <AdminNavbar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      {loading ? (
        <Spinner/>
      )
      : (
        <Box
        className="slide-in-blurred-left"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: { lg: "0", sm: "2rem", xs: 0 },
        }}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: { lg: "40%", sm: "80%", xs: "90%" },
            mt: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "2rem", sm: "1.5rem", xs: "1rem" },
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            Create A New Product
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <TextField
                autoComplete="product-name"
                name="pname"
                required
                fullWidth
                id="pname"
                label="Product Name"
                type="text"
                autoFocus
                size="small"
                value={pname}
                onChange={(e) => setPname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                autoComplete="price"
                size="small"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="desc"
                label="Description"
                name="description"
                autoComplete="desc"
                type="text"
                multiline={true}
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                variant="filled"
                sx={{ width: "100%", marginTop: 2 }}
              >
                <InputLabel required id="demo-simple-select-filled-label">
                  Choose Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  name="category"
                  size="small"
                  value={category}
                  type="text"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((catg, i) => (
                    <MenuItem key={i * 20125} value={catg}>
                      {catg}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="stock"
                label="Stock"
                name="stock"
                size="small"
                autoComplete="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                onChange={createProductImagesChange}
                id="image-upload"
                name="productimg"
                multiple
                required
                className="admin-createproduct-input"
              />
            </Grid>

            {images && (
              <Grid item xs={12}>
                <ImageList sx={{ width: "100%", height: "100%" }} cols={3}>
                  {imagesPreview.map((image, i) => (
                    <ImageListItem key={i * 555}>
                      <img
                        src={image}
                        alt={i}
                        loading="lazy"
                        style={{ width: "50%", height: "50%" }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            className="btn"
            sx={{
              mt: 3,
              mb: 2,
              fontweight: "bold",
              width: {lg: "20%", sm: "20%", xs: "100%"},
              letterSpacing: "1px",
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
      )
      }
    </>
  );
};

export default CreateProduct;
