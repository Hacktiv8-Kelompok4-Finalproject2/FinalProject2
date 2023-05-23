import axios from 'axios';

// Action types
const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
const UPDATE_STORE_QUANTITY = 'UPDATE_STORE_QUANTITY';

// Initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
  isInitialFetch: false, // Flag to track the initial fetch
};

// Action creators
const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

const fetchProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

const updateStoreQuantity = (itemId, storeQuantity) => ({
  type: UPDATE_STORE_QUANTITY,
  payload: { itemId, storeQuantity },
});

// Reducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
        isInitialFetch: true, // Set the flag to true after initial fetch
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        products: [],
        loading: false,
        error: action.payload,
      };
    case UPDATE_STORE_QUANTITY:
      const updatedProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.itemId
      );

      if (updatedProductIndex !== -1) {
        const updatedProducts = [...state.products];
        updatedProducts[updatedProductIndex] = {
          ...updatedProducts[updatedProductIndex],
          storeQuantity: action.payload.storeQuantity,
        };

        return {
          ...state,
          products: updatedProducts,
        };
      }
      return state;

    default:
      return state;
  }
};

// Thunk action creator for fetching products
export const fetchProducts = () => {
  return (dispatch, getState) => {
    const { isInitialFetch } = getState().productReducer;

    if (isInitialFetch) {
      return; // Return early if it's not the initial fetch
    }

    dispatch(fetchProductsRequest());
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        const products = response.data.map((product) => ({
          ...product,
          storeQuantity: 5,
        }));
        dispatch(fetchProductsSuccess(products));

        // Update storeQuantity for fetched products
        products.forEach((product) => {
          dispatch(updateStoreQuantity(product.id, product.storeQuantity));
        });
      })
      .catch((error) => {
        dispatch(fetchProductsFailure(error.message));
      });
  };
};

export { updateStoreQuantity, productReducer };
