const initialState = {
  isLoggedIn: false,
  cartItems: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, isLoggedIn: true };
    case 'LOGOUT_USER':
      return { ...state, isLoggedIn: false, cartItems: [] };
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: addToCart(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

const addToCart = (cartItems, product) => {
  // ...
};

export const logoutUser = () => {
  return { type: 'LOGOUT_USER' };
};

export default authReducer;
