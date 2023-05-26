const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CHECKOUT = 'CHECKOUT';

const initialState = {
  cartItems: [],
  isAdmin: false,
  storeQuantity: 10,
};

const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

const updateQuantity = (itemId, newQuantity, isAdmin) => ({
  type: UPDATE_QUANTITY,
  payload: { itemId, newQuantity, isAdmin },
});

const checkout = () => ({
  type: CHECKOUT,
});

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
        const isAdmin = action.payload.isAdmin;
        let updatedCartItems = [...state.cartItems];

        if (isAdmin) {
          // If the user is an admin, directly update the storeQuantity
          updatedCartItems[updatedItemIndex] = {
            ...updatedCartItems[updatedItemIndex],
            quantity: action.payload.newQuantity,
          };
        } else {
          // If the user is not an admin, reduce the quantity during checkout
          const currentQuantity = updatedCartItems[updatedItemIndex].quantity;
          const newQuantity = currentQuantity - action.payload.newQuantity;
          updatedCartItems[updatedItemIndex] = {
            ...updatedCartItems[updatedItemIndex],
            quantity: newQuantity >= 0 ? newQuantity : 0,
          };
        }

        return {
          ...state,
          cartItems: updatedCartItems,
        };
      }
      return state;

    case CHECKOUT:
      const totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const updatedStoreQuantity = state.storeQuantity - totalQuantity;
      const newStoreQuantity =
        updatedStoreQuantity >= 0 ? updatedStoreQuantity : 0;

      return {
        ...state,
        cartItems: [],
        storeQuantity: newStoreQuantity,
      };

    default:
      return state;
  }
};

export {
  addToCart,
  removeFromCart,
  updateQuantity,
  checkout,
  addToCartReducer,
};
