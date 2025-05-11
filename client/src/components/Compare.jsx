import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Trash2 } from "lucide-react";

const Compare = () => {
  const location = useLocation();
  const itemsFromNav = location.state?.itemsToCompare;
  const itemsFromStorage = JSON.parse(localStorage.getItem("compareItems")) || [];

  const initialProducts = itemsFromNav?.length ? itemsFromNav : itemsFromStorage;
  const [products, setProducts] = useState(initialProducts.slice(0, 4));

  // Save to localStorage in case of refresh
  useEffect(() => {
    localStorage.setItem("compareItems", JSON.stringify(products));
  }, [products]);

  const handleRemove = (indexToRemove) => {
    setProducts((prev) => {
      const updated = prev.filter((_, i) => i !== indexToRemove);
      localStorage.setItem("compareItems", JSON.stringify(updated));
      return updated;
    });
  };

  const columnCount = products.length;
  const gridColsMap = {
    1: "grid-cols-2",
    2: "grid-cols-3",
    3: "grid-cols-4",
    4: "grid-cols-5",
  };
  const gridColsClass = gridColsMap[columnCount] || "grid-cols-2";

  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Compare</h1>

      {/* Product Images & Titles */}
      <div className={`grid ${gridColsClass} gap-6 border-t border-b py-6`}>
        <div></div>
        {products.map((product, index) => (
          <div key={index} className="text-center relative">
            <button
              className="absolute top-0 right-0 text-gray-500 hover:text-red-500"
              onClick={() => handleRemove(index)}
            >
              <Trash2 size={20} />
            </button>
            <img
              src={product.image}
              alt={product.title}
              className="h-32 mx-auto object-contain mb-2"
            />
            <p className="text-sm font-medium">{product.title}</p>
          </div>
        ))}
      </div>

      {/* Comparison Fields */}
      <div className="border-t">
        {[
          { label: "Vendor", field: "vendor" },
          { label: "Price", field: "price" },
          { label: "Quantity", field: "quantity" },
        ].map((row, i) => (
          <div
            key={i}
            className={`grid ${gridColsClass} gap-6 px-2 py-4 items-center ${
              i % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="font-semibold text-gray-700">{row.label}</div>
            {products.map((product, index) => (
              <div key={index} className="text-center text-sm text-gray-700">
                {product[row.field] ?? "N/A"}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Add to Cart Buttons */}
      <div className={`grid ${gridColsClass} gap-6 py-6 border-t`}>
        <div></div>
        {products.map((_, index) => (
          <div key={index} className="text-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded">
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Compare;
