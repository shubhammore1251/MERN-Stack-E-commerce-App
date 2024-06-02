import axios from "axios";
import {
  ADD_NEW_REVIEW_FAIL,
  ADD_NEW_REVIEW_REQUEST,
  ADD_NEW_REVIEW_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ALL_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  CLEAR_ERRORS,
  CREATE_NEW_PRODUCT_FAIL,
  CREATE_NEW_PRODUCT_REQUEST,
  CREATE_NEW_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQ,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_REQ,
  GET_PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
} from "../action-types/product";
import Cookies from "js-cookie";


//Getting All Products
export const getProducts =
  (query = "", page = 1, price = [0, 80000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_PRODUCTS_REQ,
      });

      let link = `${process.env.REACT_APP_BACKEND_URL}/api/v1/products?keyword=${query}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;

      if (category) {
        link = `${process.env.REACT_APP_BACKEND_URL}/api/v1/products?keyword=${query}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
      }

      const config = { 
        headers: { 
          "Content-Type": "application/json",
          "secret_token": process.env.REACT_APP_PUBLIC_ROUTE_SECRET,
        } 
      };
      
      const { data } = await axios.get(link, config);

      dispatch({
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };


//Getting Product Details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_DETAILS_REQ,
    });

    const config = { 
      headers: { 
        "Content-Type": "application/json",
        "secret_token": process.env.REACT_APP_PUBLIC_ROUTE_SECRET,
      } 
    };

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/${id}`, config);

    dispatch({
      type: GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};



// ADD NEW REVIEW
export const addAReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_NEW_REVIEW_REQUEST });

    const config = { 
      headers: { 
        "Content-Type": "application/json",
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/product/review`, reviewData, config);

    dispatch({
      type: ADD_NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: ADD_NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET PRODUCT REVIEWS
export const getProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews?id=${productId}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Delete Product reviews
export const deleteProductReviews = (productId,reviewId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const config = { 
      headers: { 
        "Content-Type": "application/json",
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/reviews?productId=${productId}&id=${reviewId}`,config);

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};


/*Admin*/

/*Get All Products*/
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    
    const config = { 
      headers: { 
        "Content-Type": "application/json",
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/products`, config);
    
    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products});
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


/*Create a Product */
export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_NEW_PRODUCT_REQUEST });

    const config = { 
      headers: { 
        "Content-Type": "application/json",
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/product/create`, product, config);
    
    dispatch({ type: CREATE_NEW_PRODUCT_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: CREATE_NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


/*Delete Product */
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    
    const config = { 
      headers: { 
        "Content-Type": "application/json",
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/product/${id}`, config);
    
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success});
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Update Product
export const updateProduct = (id,updatedProduct) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = { 
      headers: { 
        "Content-Type": "application/json",
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/product/${id}`, updatedProduct, config);
    
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success});
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Clearing Errors
export const clearProductErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};