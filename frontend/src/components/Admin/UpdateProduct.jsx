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
import { Notify } from "../Utility/Notify";
import {
  clearProductErrors,
  getProductDetails,
  updateProduct,
} from "../../redux/actions/productsAction";
import { UPDATE_PRODUCT_RESET } from "../../redux/action-types/product";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Utility/Spinner";

const UpdateProduct = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [pname, setPname] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const {
    error,
    product,
    loading: productDetailsloading,
  } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

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
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      setPname(product.pname);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }

    if (error) {
      Notify("error", error);
      dispatch(clearProductErrors());
    }

    if (updateError) {
      Notify("error", updateError);
      dispatch(clearProductErrors());
    }

    if (isUpdated) {
      Notify("success", "Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, product, updateError, navigate, isUpdated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
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
      (pname === "" &&
        price === "" &&
        description === "" &&
        category === "" &&
        stock === "")
    ) {
      Notify("error", "Please Fill All fields");
      return;
    }
    dispatch(updateProduct(id, updatedProduct));
    setPname("");
    setPrice("");
    setDescription("");
    setCategory("");
    setStock("");
    setImages("");
    setImagesPreview("");
  };

  const updateProductImagesChange = async (e) => {
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <MetaData title={`Admin - Update Product #${"Id"}`} />
      <AdminNavbar setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      {loading || productDetailsloading ? (
        <Spinner />
      ) : (
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
              width: { lg: "35%", sm: "80%", xs: "90%" },
              mt: 3,
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "1.1rem", sm: "1.1rem", xs: "0.8rem" },
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              Update Product - #{id}
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
                  onChange={updateProductImagesChange}
                  id="image-upload"
                  name="productimg"
                  multiple
                  required
                  className="admin-createproduct-input"
                />
              </Grid>

              {oldImages && (
                <Grid item xs={12}>
                  <ImageList sx={{ width: "100%", height: "100%" }} cols={3}>
                    {oldImages.map((image, i) => (
                      <ImageListItem key={i * 66}>
                        <img
                          src={image?.url}
                          alt={i}
                          loading="lazy"
                          style={{ width: "50%", height: "50%" }}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                </Grid>
              )}

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
                width: { lg: "20%", sm: "20%", xs: "100%" },
                letterSpacing: "1px",
              }}
            >
              Update
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default UpdateProduct;
