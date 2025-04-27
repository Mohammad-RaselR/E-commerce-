import React, { useState } from "react";
import ProductCard from "./ProductCard";
import img from "../Images/watch.png";

// Sample products
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
    title: "Samsung Smart TV 42'' UHD",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (2)",
    currentPrice: "12000",
    oldPrice: "14500",
    saveAmount: "2500",
    badges: ["Sale"],
  },
  {
    title: "Logitech Wireless Mouse",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (4)",
    currentPrice: "650",
    oldPrice: "800",
    saveAmount: "150",
    badges: ["Sale"],
  },
  {
    title: "Canon DSLR Camera 1500D",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (5)",
    currentPrice: "25000",
    oldPrice: "30000",
    saveAmount: "5000",
    badges: ["Sale"],
  },
  {
    title: "Canon DSLR Camera 1500D",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (5)",
    currentPrice: "25000",
    oldPrice: "30000",
    saveAmount: "5000",
    badges: ["Sale"],
  },
  {
    title: "Canon DSLR Camera 1500D",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (5)",
    currentPrice: "25000",
    oldPrice: "30000",
    saveAmount: "5000",
    badges: ["Sale"],
  },
  {
    title: "Canon DSLR Camera 1500D",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (5)",
    currentPrice: "25000",
    oldPrice: "30000",
    saveAmount: "5000",
    badges: ["Sale"],
  },
  {
    title: "Canon DSLR Camera 1500D",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (5)",
    currentPrice: "25000",
    oldPrice: "30000",
    saveAmount: "5000",
    badges: ["Sale"],
  },
  {
    title: "Canon DSLR Camera 1500D",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (5)",
    currentPrice: "25000",
    oldPrice: "30000",
    saveAmount: "5000",
    badges: ["Sale"],
  },
  {
    title: "Canon DSLR Camera 1500D",
    image: img,
    link: "#",
    colors: "",
    rating: "★★★★★ (5)",
    currentPrice: "25000",
    oldPrice: "30000",
    saveAmount: "5000",
    badges: ["Sale"],
  },

];

const ElectroProducts = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleProducts = showAll ? products : products.slice(0, 4); // 1 rows

  return (
    <div className="bg-[#f4f4f4] py-2 border-gray-200 border-2 p-4">
      {!showAll && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowAll(true)}
            className="text-sm font-semibold text-green-800 hover:underline"
          >
            See All Products
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-10 mx-3">
        {visibleProducts.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
      </div>

      {showAll && (
        <div className="flex justify-center mt-6">
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

export default ElectroProducts;
