import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import productReducer from '../Store/productReducer';
import loginReducer from '../Store/loginReducer';
import { addToCartReducer } from '../Store/addToCartReducer';
import { cartReducer } from './cartReducer';

const rootReducer = combineReducers({
  productReducer,
  loginReducer,
  addToCartReducer,
  cartReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
