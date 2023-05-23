// Redux.js
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const FETCH_CART_DATA = 'FETCH_CART_DATA';

const initialState = {
  cartItems: [],
};

const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

const updateQuantity = (itemId, newQuantity) => ({
  type: UPDATE_QUANTITY,
  payload: { itemId, newQuantity },
});

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

const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // If the item already exists in the cart, update the quantity
        const updatedCartItems = state.cartItems.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      } else {
        // If the item is not in the cart, add it with the specified quantity
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case UPDATE_QUANTITY:
      const updatedItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.itemId
      );
      if (updatedItemIndex !== -1) {
        // If the item exists in the cart, update the quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[updatedItemIndex] = {
          ...updatedCartItems[updatedItemIndex],
          quantity: action.payload.newQuantity,
        };
        return {
          ...state,
          cartItems: updatedCartItems,
        };
      }
      return state;
    case FETCH_CART_DATA:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

export {
  addToCart,
  removeFromCart,
  updateQuantity,
  fetchCartData,
  addToCartReducer,
};
