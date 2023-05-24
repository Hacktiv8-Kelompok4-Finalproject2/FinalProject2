import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ product, addToCart, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addToCart({ ...product, quantity: 1 });
      console.log(isLoggedIn);
    } else {
      // Navigate to the login page
      navigate('/login'); // Replace '/login' with the actual route to your login page
      console.log('not looffin');
    }
  };

  const handleProductDetail = () => {
    navigate(`/product-details/${product.id}`); // Replace '/product-details' with the actual route to your ProductDetails page
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + ' ...';
    }
    return description;
  };

  return (
    <div
      key={product.id}
      className="h-[380px] w-[170px] flex items-center mx-auto flex-col border-2 p-2 rounded-lg text-left"
    >
      <div className="h-[200px] flex items-center p-2">
        <img
          src={product.image}
          className="max-h-[180px]"
          alt={product.title}
        />
      </div>
      <div className="flex items-start flex-col">
        <h1 className="text-sm font-semibold">
          {truncateDescription(product.title, 8)}
        </h1>
        <div className="bg-gray-500 ">
          <h1 className="items-start text-[11px] p-[0.1em] px-2 text-white ">
            {product.category}
          </h1>
        </div>
        <h1 className="text-[12px]">
          {truncateDescription(product.description, 8)}
        </h1>
        <div className="flex text-[9px] mt-2">
          <button
            onClick={handleProductDetail}
            className="mx-2 rounded-md px-2 py-1 hover:bg-gray-500 hover:text-white border-2 transition-all bg-white text-gray-500  border-gray-500"
          >
            Detail
          </button>
          <button
            onClick={handleAddToCart}
            className="mx-2 rounded-md px-2 py-1 bg-green-600 text-white border-2 transition-all hover:bg-green-700"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
