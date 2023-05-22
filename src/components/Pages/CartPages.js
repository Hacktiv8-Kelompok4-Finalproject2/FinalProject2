import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../Card/Card';

function CartPages() {
  const cartItems = useSelector((state) => state.addToCartReducer.cartItems);

  const updateQuantity = (productId, quantity) => {
    // Dispatch an action to update the quantity of the specified product in the cart
    // You can implement this functionality based on your specific Redux setup
  };

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center">
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <Card
              key={item.id}
              product={item}
              updateQuantity={updateQuantity}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CartPages;
