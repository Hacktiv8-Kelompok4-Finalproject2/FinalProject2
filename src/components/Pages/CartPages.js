import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, checkout } from '../Store/cartReducer';
import {
  updateStoreQuantity,
  updateSalesQuantity,
} from '../Store/productReducer';
import { useNavigate } from 'react-router-dom';

function CartPages() {
  const cartItems = useSelector((state) => state.addToCartReducer.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleQuantityChange = (itemId, event) => {
    const inputValue = event.target.value;
    if (inputValue === '' || isNaN(inputValue)) {
      // Handle invalid input here, such as displaying an error message
      return;
    }
    const newQuantity = parseInt(inputValue);

    // Check if the new quantity exceeds the stock quantity
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      if (newQuantity > item.storeQuantity) {
        setError(true);
      } else {
        setError(false);
      }
      const isAdmin = true; // Assuming the user is an admin
      dispatch(updateQuantity(itemId, newQuantity, isAdmin));
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    console.log(cartItems);
    let isAvailable = true; // Initialize availability flag
    setError(true);

    // Update storeQuantity for each item in cart
    cartItems.forEach((item) => {
      const updatedStoreQuantity = item.storeQuantity - item.quantity;
      const updatedSalesQuantity = item.sales + item.quantity;
      if (updatedStoreQuantity < 0) {
        isAvailable = false;
      } else {
        const isAdmin = true; // Assuming the user is an admin
        console.log(updatedStoreQuantity);
        dispatch(updateStoreQuantity(item.id, updatedStoreQuantity));
        dispatch(updateSalesQuantity(item.id, updatedSalesQuantity));
        console.log(item);
      }
    });

    if (isAvailable) {
      dispatch(checkout());
    } else {
      // Handle the case where at least one item is not available
      console.log('Some items are not available');
      setShowErrorMessage(true);
    }
  };

  const truncateDescription = (title, wordLimit) => {
    const words = title.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + ' ...';
    }
    return title;
  };

  const handleClose = () => {
    navigate('/home');
  };

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center border-2 w-[720px] p-2 shadow-md">
        <h1 className="text-2xl my-3">Keranjang Anda</h1>
        {cartItems.length === 0 ? (
          <p>
            Keranjang anda kosong. Silahkan pilih item untuk ditambakah ke
            keranjang!
          </p>
        ) : (
          <>
            <table className="text-left w-full">
              <thead>
                <tr className="borer-t border-2">
                  <th></th>
                  <th></th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Stock</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b-2 border-t-2 items-center mx-auto"
                  >
                    <td>
                      <img
                        src={item.image}
                        className="h-[50px] mx-auto"
                        alt={item.title}
                      />
                    </td>
                    <td className="mx-auto">
                      {error && item.storeQuantity < item.quantity ? (
                        <div>
                          <h1>{truncateDescription(item.title, 7)}</h1>
                          <h1 className="text-red-500">*is unavailable</h1>
                        </div>
                      ) : (
                        <h1 className="font-semibold text-sm">
                          {truncateDescription(item.title, 7)}
                        </h1>
                      )}
                    </td>
                    <td className="font-semibold mx-auto">${item.price}</td>
                    <td className="mx-auto flex items-center h-[52px]">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e)}
                        className="w-[40px] border-2 text-center mx-auto"
                      />
                    </td>
                    <td className="mx-auto text-center">
                      {item.storeQuantity}
                    </td>
                    <td className="mx-auto">
                      ${(item.price * item.quantity).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="">
                <tr className="font-semibold mt-2">
                  <td colSpan="4"></td>
                  <td>Total:</td>
                  <td>${total.toFixed(1)}</td>
                </tr>
              </tfoot>
            </table>
            <div className="mt-2">
              <button
                onClick={handleClose}
                className="mx-2 rounded-md px-2 py-1  hover:text-white  transition-all hover:bg-red-500 text-gray-500 border-2 hover:gray-green-500"
              >
                Close
              </button>
              <button
                onClick={handleCheckout}
                className="mx-2 rounded-md px-2 py-1 bg-green-500 text-white border-2 transition-all   hover:bg-green-700"
              >
                Checkout
              </button>
            </div>
            {showErrorMessage && (
              <p className="text-red-500">Please reduce the quantity.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CartPages;
