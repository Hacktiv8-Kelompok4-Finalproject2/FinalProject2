import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, updateStoreQuantity } from '../Store/productReducer';

const AdminPages = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleStoreQuantityUpdate = (itemId, storeQuantity) => {
    dispatch(updateStoreQuantity(itemId, storeQuantity));
  };

  const handleUpdateClick = (itemId, storeQuantity) => {
    handleStoreQuantityUpdate(itemId, storeQuantity);
  };

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center">
        <h1>Admin Pages</h1>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Items</th>
              <th>Store Quantity</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    className="h-[50px]"
                    alt={product.title}
                  />
                </td>
                <td>{product.title}</td>
                <td>
                  <input
                    type="number"
                    value={product.storeQuantity}
                    onChange={(e) =>
                      handleStoreQuantityUpdate(
                        product.id,
                        parseInt(e.target.value)
                      )
                    }
                  />
                </td>
                <td>{product.sales}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdateClick(product.id, product.storeQuantity)
                    }
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPages;
