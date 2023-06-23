import {
  UPDATE_USER_DATA,
  CHANGE_LOADER_MODAL,
  CHANGE_ALERT_MODAL,
  CHANGE_INTERNET_CONNECTION,
  LOGOUT,
  INC_CART,
  DEC_CART,
  INIT_CART,
} from '../actionTypes';
const initialState = {
  uData: {},
  connected: false,
  alertModal: {
    show: false,
    message: null,
    res: null,
  },
  showLoaderModal: false,
  cart_count: 0,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_DATA:
      return {
        ...state,
        uData: action.payload,
      };
    case CHANGE_INTERNET_CONNECTION:
      return {...state, connected: action.payload};
    case CHANGE_ALERT_MODAL:
      let obj = {
        show: action.payload.show,
        message: action.payload.message,
        res: action.payload.res,
      };
      return {...state, alertModal: obj};
    case CHANGE_LOADER_MODAL:
      return {...state, showLoaderModal: action.payload};

    case LOGOUT:
      return {
        ...state,
        uData: {},
      };

    case INIT_CART:
      return {
        ...state,
        cart_count: action.payload,
      };

    case INC_CART:
      return {
        ...state,
        cart_count: ++state.cart_count,
      };
    case DEC_CART:
      return {
        ...state,
        cart_count: --state.cart_count,
      };

    default:
      return state;
  }
};
