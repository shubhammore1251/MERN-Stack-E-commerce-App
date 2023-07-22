import Cookies from "js-cookie";
import {
  ADD_SHIPPING_INFO_FAIL,
  ADD_SHIPPING_INFO_REQUEST,
  ADD_SHIPPING_INFO_RESET,
  ADD_SHIPPING_INFO_SUCCESS,
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_RESET,
  CHANGE_PASSWORD_SUCCESS,
  CLEAR_ERRORS,
  DELETE_SHIPPING_INFO_FAIL,
  DELETE_SHIPPING_INFO_REQUEST,
  DELETE_SHIPPING_INFO_RESET,
  DELETE_SHIPPING_INFO_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_RESET,
  DELETE_USER_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_RESET,
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
  LOGOUT_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_RESET,
  UPDATE_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../action-types/user";

export const userReducer = (
  state = {
    userdata: {},
    loading: false,
    isAuthenticated: Cookies.get("ecom_tkn") ? Cookies.get("ecom_tkn") : false,
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS: {

      const auth = Cookies.get("ecom_tkn");
      
      return {
        ...state,
        loading: false,
        isAuthenticated: auth
      };
    }

    case LOAD_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        userdata: payload,
      };
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        loading: false,
        userdata: null,
      };
    }

    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
    case LOAD_USER_FAIL: {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        userdata: null,
        error: payload,
      };
    }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  const { payload, type } = action;

  switch (type) {
    case UPDATE_PROFILE_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
    case UPDATE_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload.success,
        message: payload.message,
      };

    case UPDATE_PROFILE_FAIL:
    case CHANGE_PASSWORD_FAIL:
    case UPDATE_USER_FAIL:
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case UPDATE_PROFILE_RESET:
    case CHANGE_PASSWORD_RESET:
    case UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  const { payload, type } = action;

  switch (type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case FORGOT_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        message: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allUsersReducer = (
  state = { users: [], loading: false },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: payload,
      };

    case ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getUserDetailsReducer = (
  state = { userDetails: {}, loading: false },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        userDetails: payload,
      };

    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const shippingInfoReducer = (
  state = { shippingInfo: [], loading: false },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_SHIPPING_INFO_REQUEST:
    case GET_SHIPPING_INFO_REQUEST:
    case DELETE_SHIPPING_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_SHIPPING_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload,
      };

    case ADD_SHIPPING_INFO_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };

    case DELETE_SHIPPING_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload,
      };

    case DELETE_SHIPPING_INFO_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };

    case GET_SHIPPING_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingInfo: payload,
      };

    case ADD_SHIPPING_INFO_FAIL:
    case GET_SHIPPING_INFO_FAIL:
    case DELETE_SHIPPING_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getSingleShippingInfoReducer = (
  state = { shippingInfo: {}, loading: false },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case GET_SINGLE_SHIPPING_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_SINGLE_SHIPPING_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingInfo: payload,
      };

    case GET_SINGLE_SHIPPING_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
