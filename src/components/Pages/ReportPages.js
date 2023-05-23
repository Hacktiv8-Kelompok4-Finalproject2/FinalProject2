import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ReportPages = () => {
  const products = useSelector((state) => state.productReducer.products);
  const cartItems = useSelector((state) => state.addToCartReducer.cartItems);

  useEffect(() => {
    // Any necessary logic or API calls to fetch the checkout data
  }, []);

  // Calculate the quantity sold and total gross for each product
  const reportData = products
    .map((product) => {
      const quantitySold = cartItems.reduce((total, cartItem) => {
        if (cartItem.id === product.id) {
          return total + cartItem.quantity;
        }
        return total;
      }, 0);

      const totalGross = product.price * quantitySold;

      return {
        id: product.id,
        name: product.title,
        price: product.price,
        quantitySold,
        totalGross,
      };
    })
    .filter((item) => item.quantitySold > 0); // Filter out items with quantitySold = 0

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center">
        <h1>Report Pages</h1>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity Sold</th>
              <th>Total Gross</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantitySold}</td>
                <td>${item.totalGross.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportPages;
