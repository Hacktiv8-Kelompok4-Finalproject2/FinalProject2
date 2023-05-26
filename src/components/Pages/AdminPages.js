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
      <div className="mt-[8vh] text-center border-2 shadow-md p-4">
        <h1 className="text-2xl my-3">Admin Pages</h1>
        <table>
          <thead>
            <tr className="border-t border-2">
              <th></th>
              <th>Items</th>
              <th>Store Quantity</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-y-2 items-center mx-auto">
                <td className="mx-auto">
                  <img
                    src={product.image}
                    className="h-[50px] mx-auto"
                    alt={product.title}
                  />
                </td>
                <td className="text-left ml-2">{product.title}</td>
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
                    className="text-center border-2 w-[50px]"
                  />
                </td>
                <td>{product.sales}</td>
                <td>
                  <button
                    onClick={() =>
                      handleUpdateClick(product.id, product.storeQuantity)
                    }
                    className="mx-2 rounded-md px-2 py-1 bg-blue-500 text-white border-2 transition-all   hover:bg-blue-700"
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
