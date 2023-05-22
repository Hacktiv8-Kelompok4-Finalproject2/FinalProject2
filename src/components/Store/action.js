import axios from 'axios';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const products = response.data.map((product) => ({
        ...product,
        quantity: 20,
      }));
      dispatch({ type: 'FETCH_PRODUCTS', payload: products });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
};
