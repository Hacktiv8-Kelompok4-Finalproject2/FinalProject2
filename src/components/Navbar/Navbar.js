import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const isAdmin = useSelector(
    (state) => state.loginReducer.user && state.loginReducer.user.isAdmin
  );
  const isLoggedIn =
    useSelector((state) => state.loginReducer.loggedIn) && !isAdmin; // Access the loggedIn state from loginReducer

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto fixed inset-x-0 z-50 font-semibold font-balto">
      <div className="bg-[#fbfefd] border-b-green-500 shadow-md border-b-2 w-full flex items-center justify-center mx-auto">
        <div className="max-w-[1080px] mx-5 flex flex-row items-center  h-[6vh]">
          <nav className="flex flex-row items-center justify-between font-balto">
            <Link to="/" onClick={scrollToTop}>
              <div className="mx-4 text-green-600">JualAjah!</div>
            </Link>
            {!isAdmin && (
              <Link to="/" onClick={scrollToTop}>
                <div className="mx-4">Home</div>
              </Link>
            )}
            {isLoggedIn && (
              <>
                <Link to="/cart" onClick={scrollToTop}>
                  <div className="mx-4">Keranjang</div>
                </Link>
                <div className="bg-gray-400 p-[0.1em] rounded-md text-white hover:bg-gray-700">
                  <Link to="/logout" onClick={scrollToTop}>
                    <div className="mx-4 ">Keluar</div>
                  </Link>
                </div>
              </>
            )}
            {isAdmin && (
              <>
                <Link to="/admin" onClick={scrollToTop}>
                  <div className="mx-4">Admin</div>
                </Link>
                <Link to="/report" onClick={scrollToTop}>
                  <div className="mx-4">Rekap Penjualan</div>
                </Link>
                <div className="bg-gray-400 p-[0.1em] rounded-md text-white hover:bg-gray-700">
                  <Link to="/logout" onClick={scrollToTop}>
                    <div className="mx-4 ">Keluar</div>
                  </Link>
                </div>
              </>
            )}
            {!isAdmin && !isLoggedIn && (
              <>
                <div className="bg-gray-400 p-[0.1em] rounded-md text-white hover:bg-gray-700">
                  <Link to="/login" onClick={scrollToTop}>
                    <div className="mx-4 ">Masuk</div>
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
