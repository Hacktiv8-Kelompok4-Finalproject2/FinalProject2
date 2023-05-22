import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity } from '../Store/addToCartReducer';

function CartPages() {
  const cartItems = useSelector((state) => state.addToCartReducer.cartItems);
  const dispatch = useDispatch();

  const handleQuantityChange = (itemId, event) => {
    const newQuantity = parseInt(event.target.value);
    dispatch(updateQuantity(itemId, newQuantity));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center">
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="text-left">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b-2 border-t-2">
                  <td>
                    <img src={item.image} className="h-[50px]" />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e)}
                      className="w-[40px] border-2"
                    />
                  </td>
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
        )}
        <div>
          <button>Close</button>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartPages;
