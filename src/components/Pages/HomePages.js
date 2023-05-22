import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Store/productReducer'; // Import the productReducer and fetchProducts action
import { addToCart } from '../Store/addToCartReducer'; // Import the addToCart action
import Card from '../Card/Card';

function HomePages() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.productReducer.products); // Access the products state from productReducer
  const isLoggedIn = useSelector((state) => state.loginReducer.loggedIn); // Access the loggedIn state from loginReducer

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center">
        <h1>Daftar Produk</h1>
        <div className="grid grid-cols-5 gap-10 w-screen max-w-[1080px]">
          {products.map((product) => (
            <Card
              key={product.id}
              product={product}
              addToCart={handleAddToCart}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePages;
