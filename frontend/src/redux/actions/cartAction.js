/* eslint-disable no-unused-vars */
import axios from "axios";
import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  CLEAR_CART_FAIL,
  CLEAR_CART_REQUEST,
  CLEAR_CART_SUCCESS,
  CLEAR_ERRORS,
  GET_CART_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  REMOVE_CART_ITEM_FAIL,
  REMOVE_CART_ITEM_REQUEST,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_FAIL,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
} from "../action-types/cart";
import Cookies from "js-cookie";

//ADD TO CART
export const addToCart = (productId, quantity) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "ecom_tkn": Cookies.get('ecom_tkn'),
      },
    }

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/cart`,
      { productId, quantity },
      config
    );

    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: ADD_TO_CART_FAIL, payload: error.response.data.message });
  }
};

//GET CART ITEMS
export const getCart = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_REQUEST });

    const config = {
      headers: {
        "ecom_tkn": Cookies.get('ecom_tkn'),
      },
    }

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/cart`, config);

    dispatch({ type: GET_CART_SUCCESS, payload: data.cartItems });
  } catch (error) {
    dispatch({ type: GET_CART_FAIL, payload: error.response.data.message });
  }
};

//GET CART ITEMS
export const updateCartQuantity =
  (productId, quantity) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_CART_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
          "ecom_tkn": Cookies.get('ecom_tkn'),
        },
      }

      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/cart/update`,
        {productId, quantity },
        config
      );

      dispatch({ type: UPDATE_CART_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_CART_FAIL,
        payload: error.response.data.message,
      });
    }
  };


//DELTE CART ITEMS
export const deleteCartItems = (productId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST });
    
    const config = {
      headers: {
        "Content-Type": "application/json",
        "ecom_tkn": Cookies.get('ecom_tkn'),
      },
    }

    const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/cart/deleteitem`, {
      data: { productId },
      ...config,
    });

    dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: REMOVE_CART_ITEM_FAIL,
      payload: error.response.data.message,
    });
  }
};


//CLEAR WHOLE USER CART
export const clearCart = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_CART_REQUEST });
    
    const config = {
      headers: {
        "ecom_tkn": Cookies.get('ecom_tkn'),
      },
    }

    const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/cart/clearall`, config);

    dispatch({ type: CLEAR_CART_SUCCESS });
  } catch (error) {
    dispatch({ type: CLEAR_CART_FAIL, payload: error.response.data.message });
  }
};


//clear all error
export const clearCartErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};