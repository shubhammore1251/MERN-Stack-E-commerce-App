/* eslint-disable no-unused-vars */
import { encrypt } from "../../components/Utility/Encrypt";
import {
  ADD_SHIPPING_INFO_FAIL,
  ADD_SHIPPING_INFO_REQUEST,
  ADD_SHIPPING_INFO_SUCCESS,
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CLEAR_ERRORS,
  DELETE_SHIPPING_INFO_FAIL,
  DELETE_SHIPPING_INFO_REQUEST,
  DELETE_SHIPPING_INFO_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_SHIPPING_INFO_FAIL,
  GET_SHIPPING_INFO_REQUEST,
  GET_SHIPPING_INFO_SUCCESS,
  GET_SINGLE_SHIPPING_INFO_FAIL,
  GET_SINGLE_SHIPPING_INFO_REQUEST,
  GET_SINGLE_SHIPPING_INFO_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_IS_LOGGEDIN,
  USER_IS_LOGGEDOUT,
  USER_LOGIN_STATUS_FAIL,
  USER_LOGIN_STATUS_REQUEST,
  USER_LOGIN_STATUS_SUCCESS,
} from "../action-types/user";
import axios from "axios";

import Cookies from 'js-cookie';

//LOGIN_USER
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login`,{ email, password },config);
    
    if (data) {
      Cookies.set('ecom_tkn', data?.token, { expires: 5 });
    }
   
    dispatch({ type: LOGIN_SUCCESS  });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};


//REGISTER USER
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/register`, userData, config);

    if (data) {
      Cookies.set('ecom_tkn', data?.token, { expires: 5 });
    }

    dispatch({ type: REGISTER_USER_SUCCESS });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};


//LOGOUT USER
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
  Cookies.remove('ecom_tkn');
};

//LOAD USER PROFILE
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const config = {
      headers: { "ecom_tkn": Cookies.get('ecom_tkn') },
    };

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user`, config);

    if (data.user.role === "admin") {
      const encryptedAdmin = encrypt("admin");
      localStorage.setItem("xrleadmin", encryptedAdmin);
    }
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

//UPDATE USER PROFILE
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { 
      headers: { 
        "Content-Type": "application/json",
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/updateprofile`,
      userData,
      config
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password
export const changePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });

    const config = { 
      headers: { 
        "Content-Type": "application/json",
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/password/changepassword`,
      passwords,
      config
    );

    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/password/forgotpassword`,
      { email },
      config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/password/resetpassword/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//shipping information
export const addShippingInfo = (shippingInfo) => async (dispatch) => {
  try {
    dispatch({ type: ADD_SHIPPING_INFO_REQUEST });

    const config = { 
      headers: { 
        "Content-Type": "application/json",
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/shippingInfo/create`,
      shippingInfo,
      config
    );

    dispatch({ type: ADD_SHIPPING_INFO_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: ADD_SHIPPING_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};

/*Get ShippingInfo*/
export const getShippingInfo = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SHIPPING_INFO_REQUEST });

    const config = { 
      headers: { 
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/shippingInfo`, config);

    dispatch({ type: GET_SHIPPING_INFO_SUCCESS, payload: data.shippingInfo });
  } catch (error) {
    dispatch({
      type: GET_SHIPPING_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};

/*Get Single ShippingInfo*/
export const getSingleShippingInfo = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_SHIPPING_INFO_REQUEST });

    const config = { 
      headers: { 
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/shippingInfo/${id}`, config);

    dispatch({
      type: GET_SINGLE_SHIPPING_INFO_SUCCESS,
      payload: data.shippingInfo,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_SHIPPING_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};

/*delte shippinf info */
export const deleteShippingInfo = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SHIPPING_INFO_REQUEST });

    const config = { 
      headers: { 
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/shippingInfo/${id}`,config);

    dispatch({ type: DELETE_SHIPPING_INFO_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_SHIPPING_INFO_FAIL,
      payload: error.response.data.message,
    });
  }
};

//ADMIN

// GET ALL USERS
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    
    const config = { 
      headers: { 
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/users`, config);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// GET USER DETAILS
export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    
    const config = { 
      headers: { 
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/user/${id}`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
  }
};

//Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { 
      headers: { 
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};


//  DELETE USER
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    
    const config = { 
      headers: { 
        "ecom_tkn": Cookies.get('ecom_tkn'),
      } 
    };

    const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/user/${id}`, config);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

/*Clear Errors*/
export const clearUserErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
