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
      className="h-[380px] w-[200px] flex items-center flex-col border-2 p-2 rounded-lg text-left"
    >
      <div className="h-[250px] flex items-center p-2">
        <img
          src={product.image}
          className="max-h-[220px]"
          alt={product.title}
        />
      </div>
      <h1 className="text-sm font-semibold">
        {truncateDescription(product.title, 8)}
      </h1>
      <h1 className="items-start text-[11px]">{product.category}</h1>
      <h1 className="text-[12px]">
        {truncateDescription(product.description, 8)}
      </h1>
      <div className="flex h-[60px] text-[11px]">
        <button
          onClick={handleProductDetail}
          className="mx-2 p-2 h-[30px]  border-2"
        >
          Detail
        </button>
        <button
          onClick={handleAddToCart}
          className="mx-2 p-2 h-[30px] border-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
