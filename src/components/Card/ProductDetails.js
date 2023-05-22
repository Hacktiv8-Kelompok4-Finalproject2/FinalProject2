import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Store/productReducer';
import { addToCart } from '../Store/addToCartReducer';

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productId } = useParams();
  const products = useSelector((state) => state.productReducer.products);
  const isLoggedIn = useSelector((state) => state.loginReducer.loggedIn);
  const cartItems = useSelector((state) => state.addToCartReducer.cartItems);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleUpdateQuantity = () => {
    if (isLoggedIn) {
      const existingItem = cartItems.find(
        (item) => item.id === parseInt(productId)
      );
      const itemQuantity = existingItem ? existingItem.quantity : 0;
      const parsedQuantity = parseInt(quantity);
      const updatedQuantity = isNaN(parsedQuantity) ? 0 : parsedQuantity;
      dispatch(
        addToCart({
          id: parseInt(productId),
          quantity: updatedQuantity + itemQuantity,
        })
      );
    } else {
      navigate('/login');
    }
  };

  if (!product) {
    return (
      <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
        <div className="mt-[8vh] text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center">
        <h1>Product Details</h1>
        <div className="flex items-center">
          <div className="w-[500px] mx-auto">
            <img
              src={product.image}
              className="max-h-[600px] mx-auto"
              alt="Product"
            />
          </div>
          <div className="w-[500px] my-auto text-left">
            <h1 className="font-semibold text-3xl">{product.title}</h1>
            <h1 className="font-semibold text-2xl"> ${product.price}</h1>
            <div>
              <h1 className="font-semibold text-2xl">
                Quantity:
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </h1>
              <button onClick={handleUpdateQuantity}>Add to Cart</button>
            </div>
            <h1 className="font-semibold text-2xl">Product Details</h1>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
