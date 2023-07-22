import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_RESET,
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
  REMOVE_CART_ITEM_RESET,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_FAIL,
  UPDATE_CART_REQUEST,
  UPDATE_CART_RESET,
  UPDATE_CART_SUCCESS,
} from "../action-types/cart";

export const addToCartReducer = (state = { loading: false }, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload,
      };

    case ADD_TO_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case ADD_TO_CART_RESET:
      return {
        ...state,
        loading: false,
        success: false,
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

export const getCartReducer = (
  state = { cart: {}, loading: false },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case GET_CART_REQUEST:
    case CLEAR_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: payload,
      };

    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: null,
      };

    case GET_CART_FAIL:
    case CLEAR_CART_FAIL:
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

export const cartReducer = (state = { loading: false }, action) => {
  const { payload, type } = action;

  switch (type) {
    case UPDATE_CART_REQUEST:
    case REMOVE_CART_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload,
      };

    case REMOVE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload,
      };

    case UPDATE_CART_FAIL:
    case REMOVE_CART_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case UPDATE_CART_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
      };

    case REMOVE_CART_ITEM_RESET:
      return {
        ...state,
        loading: false,
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
