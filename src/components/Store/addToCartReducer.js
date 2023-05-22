// Assuming you have your own logic for handling the cart state

// Action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Initial state
const initialState = {
  cartItems: [],
};

// Action creators
const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

// Reducer
const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // If the item already exists in the cart, update the quantity
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        // If the item is not in the cart, add it with quantity 1 or the specified quantity
        const quantity = action.payload.quantity || 1;
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity }],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export { addToCart, removeFromCart, addToCartReducer };
