import axios from 'axios';

// Action types
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// Initial state
const initialState = {
  loading: false,
  loggedIn: false,
  user: null,
  error: null,
};

// Action creators
const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

// Thunk action creator for login
export const login = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      // Make a request to the login API
      const response = await axios.get('https://fakestoreapi.com/users');

      // Find the user with the provided username and password
      const user = response.data.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        // Login successful
        dispatch(loginSuccess(user));
      } else {
        // Login failed
        dispatch(loginFailure('Invalid username or password'));
      }
    } catch (error) {
      dispatch(loginFailure('An error occurred during login'));
    }
  };
};

// Reducer
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        loggedIn: false,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
