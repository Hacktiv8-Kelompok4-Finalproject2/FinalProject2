import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const isLoggedIn = useSelector((state) => state.loginReducer.loggedIn); // Access the loggedIn state from loginReducer

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto fixed inset-x-0 z-50 font-semibold font-balto">
      <div className="bg-[#f1f3f2] w-full flex items-center justify-center mx-auto">
        <div className="max-w-[1080px] mx-5 flex flex-row items-center  h-[6vh]">
          <nav className="flex flex-row items-center justify-between font-balto">
            <Link to="/" onClick={scrollToTop}>
              <div className="mx-4">JualAjah!</div>
            </Link>
            <Link to="/" onClick={scrollToTop}>
              <div className="mx-4">Home</div>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/cart" onClick={scrollToTop}>
                  <div className="mx-4">Cart</div>
                </Link>
                <Link to="/logout" onClick={scrollToTop}>
                  <div className="mx-4">Logout</div>
                </Link>
              </>
            ) : (
              <Link to="/login" onClick={scrollToTop}>
                <div className="mx-4">Login</div>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
