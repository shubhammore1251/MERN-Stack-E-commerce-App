import {
  ADD_NEW_REVIEW_FAIL,
  ADD_NEW_REVIEW_REQUEST,
  ADD_NEW_REVIEW_RESET,
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
  CREATE_NEW_PRODUCT_RESET,
  CREATE_NEW_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_SUCCESS,
  GET_ALL_PRODUCTS_FAIL,
  GET_ALL_PRODUCTS_REQ,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_PRODUCT_DETAILS_FAIL,
  GET_PRODUCT_DETAILS_REQ,
  GET_PRODUCT_DETAILS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
} from "../action-types/product";

export const productsReducer = (
  state = { products: [], loading: false },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PRODUCTS_REQ:
    case ADMIN_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_ALL_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: payload.products,
        productsCount: payload.productsCount,
        resultPerPage: payload.resultPerPage,
        filteredProductsCount: payload.filteredProductsCount,
        loading: false,
      };
    }

    case ADMIN_PRODUCT_SUCCESS: {
      return {
        ...state,
        products: payload,
        productsCount: payload.productsCount,
        loading: false,
      };
    }

    case GET_ALL_PRODUCTS_FAIL:
    case ADMIN_PRODUCT_FAIL: {
      return {
        ...state,
        loading: false,
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

export const productDetailsReducer = (
  state = { product: {}, loading: false },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT_DETAILS_REQ: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_PRODUCT_DETAILS_SUCCESS: {
      return {
        ...state,
        product: payload.product,
        loading: false,
      };
    }

    case GET_PRODUCT_DETAILS_FAIL: {
      return {
        ...state,
        loading: false,
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

export const createProductReducer = (
  state = { product: {}, loading: false },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_NEW_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload.success,
        product: payload.product,
      };

    case CREATE_NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CREATE_NEW_PRODUCT_RESET:
      return {
        ...state,
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

export const productReducer = (state = { loading: false }, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload,
      };

    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const addReviewReducer = (state = { loading: false }, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_NEW_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload,
      };
    case ADD_NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_NEW_REVIEW_RESET:
      return {
        ...state,
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


export const productReviewsReducer = (state = { reviews: [] }, action) => {

  const { type, payload } = action;

  switch (type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: payload,
      };
    case ALL_REVIEW_FAIL:
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


export const reviewReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case DELETE_REVIEW_RESET:
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
