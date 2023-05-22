import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Store/loginReducer';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.login && state.login.error);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password))
      .then(() => {
        // Dispatch the LOGIN_USER action after successful login
        dispatch({ type: 'LOGIN_USER' });
        // Navigate to HomePages
        navigate('/');
      })
      .catch((error) => {
        console.log('Login error:', error);
      });
  };

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="border-2">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2"
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {loginError && <p>{loginError}</p>}
      </div>{' '}
    </div>
  );
}

export default LoginForm;
