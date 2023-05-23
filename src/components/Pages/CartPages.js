import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, checkout } from '../Store/cartReducer';
import { updateStoreQuantity } from '../Store/productReducer';
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
    const isAdmin = true; // Assuming the user is an admin
    dispatch(updateQuantity(itemId, newQuantity, isAdmin));
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
      if (updatedStoreQuantity < 0) {
        isAvailable = false;
      } else {
        const isAdmin = true; // Assuming the user is an admin
        console.log(updatedStoreQuantity);
        dispatch(updateStoreQuantity(item.id, updatedStoreQuantity, isAdmin));
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

  const handleClose = () => {
    navigate('/home');
  };

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center">
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="text-left">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Store Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b-2 border-t-2">
                    <td>
                      <img
                        src={item.image}
                        className="h-[50px]"
                        alt={item.title}
                      />
                    </td>
                    <td>
                      {error && item.storeQuantity < item.quantity ? (
                        <div>
                          <h1>{item.title}</h1>
                          <h1 className="text-red-500">*is unavailable</h1>
                        </div>
                      ) : (
                        <h1>{item.title}</h1>
                      )}
                    </td>
                    <td>{item.price}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e)}
                        className="w-[40px] border-2"
                      />
                    </td>
                    <td>{item.storeQuantity}</td>
                    <td>${(item.price * item.quantity).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4">Total:</td>
                  <td>${total.toFixed(1)}</td>
                </tr>
              </tfoot>
            </table>
            <div>
              <button onClick={handleClose}>Close</button>
              <button onClick={handleCheckout}>Checkout</button>
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
