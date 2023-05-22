// cartReducer.js
const FETCH_CART_DATA = 'FETCH_CART_DATA';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

const initialState = {
  cartItems: [],
};

const fetchCartData = () => {
  return (dispatch) => {
    fetch('https://fakestoreapi.com/carts')
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: FETCH_CART_DATA,
          payload: json,
        });
      })
      .catch((error) => {
        console.log('Error fetching cart data:', error);
      });
  };
};

const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity },
});

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_DATA:
      return {
        ...state,
        cartItems: action.payload,
      };
    case UPDATE_QUANTITY:
      const { productId, quantity } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      };
    default:
      return state;
  }
};

export { fetchCartData, updateQuantity, cartReducer };
