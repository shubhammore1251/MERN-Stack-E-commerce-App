import Cookies from "js-cookie";
import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CLEAR_ERRORS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../action-types/order";

import axios from "axios";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = { 
      headers: { 
        "Content-Type": "application/json",
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order/new`, order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};


// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });
    
    const config = { 
      headers: { 
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/orders`, config);

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};


//order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    
    const config = { 
      headers: { 
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/order/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};


/*Admin*/
export const allOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });
    
    const config = { 
      headers: { 
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };
    
    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/orders`, config);

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const updateOrderStatus = (id,status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "ecom_tkn": Cookies.get('ecom_tkn'),
      },
    }

    const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/order/${id}`, {status}, config);

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const config = {
      headers: {
        "ecom_tkn": Cookies.get('ecom_tkn'),
      },
    }

    const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/order/${id}`, config);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Clearing Errors
export const clearOrderErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};