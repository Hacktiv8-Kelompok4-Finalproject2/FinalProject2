import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../Store/loginReducer';

function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate('/');
  };

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center">
        <h1>Logout</h1>
        <p>Are you sure you want to log out?</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default LogoutPage;
