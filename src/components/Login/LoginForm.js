// LoginForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Store/loginReducer';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isAdmin = useSelector(
    (state) => state.loginReducer.user && state.loginReducer.user.isAdmin
  );
  const isLoggedIn = useSelector((state) => state.loginReducer.loggedIn); // Access the loggedIn state from loginReducer

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(username, password))
      .then(() => {
        dispatch({ type: 'LOGIN_USER' });

        if (isLoggedIn) {
          if (isAdmin) {
            navigate('/admin');
          } else {
            navigate('/home');
          }
        } else {
          setLoginError(true);
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center">
        <h1 className="text-2xl">Halaman Login</h1>
        <p>Silahkan login terlebih dahulu</p>
        <form
          onSubmit={handleSubmit}
          className="border-2 p-5 w-[400px] rounded-md shadow-md text-md mt-6"
        >
          <div className="flex mt-1 flex-col items-start">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 w-full"
            />
          </div>
          <div className="flex mt-1 flex-col items-start">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="mx-2 mt-2 rounded-md px-2 py-1 bg-blue-400 text-white border-2 transition-all hover:bg-white hover:text-blue-400 hover:border-2 hover:border-blue-400"
          >
            Masuk
          </button>
        </form>
        {loginError && (
          <p className=" text-red-500">Incorrect username or password.</p>
        )}{' '}
      </div>
    </div>
  );
}

export default LoginForm;
