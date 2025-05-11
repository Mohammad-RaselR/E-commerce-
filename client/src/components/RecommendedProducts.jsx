import React, { useState } from "react";
import ProductCard from "./ProductCard";
import img from "../Images/watch.png";

const products = [
  {
    title: "Falke Cotton Baby Slipper Socks",
    image: img,
    link: "#",
    colors: "2 colors",
    rating: "★★★★★ (1)",
    currentPrice: "150",
    oldPrice: "",
    saveAmount: "",
    badges: ["Sale"],
  },
  {
    title: "Apple Watch Series 5 GPS, 40mm Gold",
    image: img,
    link: "#",
    colors: "2 colors",
    rating: "★★★★★ (2)",
    currentPrice: "5400.00",
    oldPrice: "8000.00",
    saveAmount: "2600.00",
    badges: ["Sale", "Hot"],
  },
  {
    title: "Beats Pro Over-Ear Headphones – Black",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (3)",
    currentPrice: "1990.00",
    oldPrice: "3000.00",
    saveAmount: "1010.00",
    badges: ["Sale", "Hot"],
  },
  {
    title: "Wilson Ultra Power XL 112 Tennis Racket",
    image: img,
    link: "#",
    colors: "3 colors",
    rating: "★★★★★ (1)",
    currentPrice: "3000.00",
    oldPrice: "",
    saveAmount: "",
    badges: ["Sale"],
  },
  {
    title: "4-in-1 Convertible Car Seat",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (3)",
    currentPrice: "3200",
    oldPrice: "",
    saveAmount: "",
    badges: ["Sale"],
  },
  {
    title: "Falke Cotton Baby Slipper Socks",
    image: img,
    link: "#",
    colors: "2 colors",
    rating: "★★★★★ (1)",
    currentPrice: "150",
    oldPrice: "",
    saveAmount: "",
    badges: ["Sale"],
  },
  {
    title: "Apple Watch Series 5 GPS, 40mm Gold",
    image: img,
    link: "#",
    colors: "2 colors",
    rating: "★★★★★ (2)",
    currentPrice: "5400.00",
    oldPrice: "8000.00",
    saveAmount: "2600.00",
    badges: ["Sale", "Hot"],
  },
  {
    title: "Beats Pro Over-Ear Headphones – Black",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (3)",
    currentPrice: "1990.00",
    oldPrice: "3000.00",
    saveAmount: "1010.00",
    badges: ["Sale", "Hot"],
  },
  {
    title: "Wilson Ultra Power XL 112 Tennis Racket",
    image: img,
    link: "#",
    colors: "3 colors",
    rating: "★★★★★ (1)",
    currentPrice: "3000.00",
    oldPrice: "",
    saveAmount: "",
    badges: ["Sale"],
  },
  {
    title: "4-in-1 Convertible Car Seat",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (3)",
    currentPrice: "3200",
    oldPrice: "",
    saveAmount: "",
    badges: ["Sale"],
  },
  {
    title: "Apple Watch Series 5 GPS, 40mm Gold",
    image: img,
    link: "#",
    colors: "2 colors",
    rating: "★★★★★ (2)",
    currentPrice: "5400.00",
    oldPrice: "8000.00",
    saveAmount: "2600.00",
    badges: ["Sale", "Hot"],
  },
  {
    title: "Beats Pro Over-Ear Headphones – Black",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (3)",
    currentPrice: "1990.00",
    oldPrice: "3000.00",
    saveAmount: "1010.00",
    badges: ["Sale", "Hot"],
  },
  {
    title: "Wilson Ultra Power XL 112 Tennis Racket",
    image: img,
    link: "#",
    colors: "3 colors",
    rating: "★★★★★ (1)",
    currentPrice: "3000.00",
    oldPrice: "",
    saveAmount: "",
    badges: ["Sale"],
  },
  {
    title: "4-in-1 Convertible Car Seat",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (3)",
    currentPrice: "3200",
    oldPrice: "",
    saveAmount: "",
    badges: ["Sale"],
  },
];

const RecommendedProducts = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? products : products.slice(0, 5);

  return (
    <div className="px-20 bg-[#f4f4f4] py-2 border-gray-200 border-0 p-2">
      <div className="flex justify-between items-center mt-2 mb-4 ml-20 mr-23">
        <h2 className="text-2xl font-bold">Recommended Products</h2>
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-sm font-semibold text-green-800 hover:underline"
          >
            See All Products
          </button>
        )}
      </div>

      <div className="grid grid-cols-5 ml-20 mb-4 gap-y-6">
        {displayedProducts.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>

      {showAll && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(false)}
            className="text-sm font-semibold text-green-800 hover:underline"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default RecommendedProducts;
