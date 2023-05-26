import React from 'react';
import { useSelector } from 'react-redux';

const ReportPages = () => {
  const products = useSelector((state) => state.productReducer.products);

  console.log(products);

  const filteredProducts = products.filter((item) => item.sales > 0);
  const total = filteredProducts.reduce(
    (acc, item) => acc + item.price * item.sales,
    0
  );

  return (
    <div className="flex items-center flex-col mx-auto w-screen max-w-[1080px]">
      <div className="mt-[8vh] text-center p-2 shadow-lg border-2 rounded-md">
        <h1 className="text-2xl my-3">Report Pages</h1>
        <table>
          <thead>
            <tr className="border-t-2">
              <th></th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Total Gross</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((item) => (
              <tr key={item.id} className="border-y-2 items-center mx-auto">
                <td className="mx-auto">
                  <img
                    src={item.image}
                    className="h-[50px] mx-auto"
                    alt={item.title}
                  />
                </td>
                <td className="text-left">{item.title}</td>
                <td className="font-semibold">${item.price.toFixed(2)}</td>
                <td>{item.sales}</td>
                <td className="font-semibold">
                  ${(item.price * item.sales).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="">
            <tr className="font-semibold mt-2">
              <td colSpan="3"></td>
              <td>Total:</td>
              <td>${total.toFixed(1)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReportPages;
