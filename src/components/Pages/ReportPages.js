import React from 'react';
import { useSelector } from 'react-redux';

const ReportPages = () => {
  const products = useSelector((state) => state.productReducer.products);

  console.log(products);

  const filteredProducts = products.filter((item) => item.sales > 0);

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center">
        <h1>Report Pages</h1>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Total Gross</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.sales}</td>
                <td>${(item.price * item.sales).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportPages;
