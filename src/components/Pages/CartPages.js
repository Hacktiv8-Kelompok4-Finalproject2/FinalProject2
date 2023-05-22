import React from 'react';
import { useSelector } from 'react-redux';

function CartPages() {
  const cartItems = useSelector((state) => state.addToCartReducer.cartItems);
  console.log(cartItems);

  const getCountByItemId = (itemId) => {
    return cartItems.reduce((count, item) => {
      if (item.id === itemId) {
        return count + item.quantity;
      }
      return count;
    }, 0);
  };

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center">
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`}>
              <p>Item ID: {item.id}</p>
              <p>Quantity: {getCountByItemId(item.id)}</p>
              {/* Render other details of the item */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CartPages;
