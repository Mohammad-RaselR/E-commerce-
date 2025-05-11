import React, { useState } from "react";
import ProductCard from "./ProductCard";
import img from "../Images/watch.png";
import { Trash2 } from "lucide-react";
import {
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaEnvelope,
  FaTelegram,
} from "react-icons/fa";

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

const WishlistHero = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <div className="px-30 bg-[#f4f4f4] py-10 border-gray-200 border-2 p-2">
        <h1 className="text-3xl font-bold text-center">Wishlish</h1>

      <div className="flex justify-between items-center mt-2 mb-4 ml-20 mr-23">
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="text-sm font-semibold text-green-800 hover:underline"
          >
            See All Products
          </button>
        )}
      </div>

      <div className="grid grid-cols-4 ml-20 mb-4 gap-y-6">
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
      {/* Share Section */}
      <div className="mt-16">
        <h2 className="text-lg font-semibold text-center mb-6">Share</h2>
        <div className="flex justify-center gap-6 flex-wrap text-sm">
          <div className="flex flex-col items-center gap-1">
            <FaTwitter className="text-black text-xl" />
            <span>Twitter</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FaFacebook className="text-blue-600 text-xl" />
            <span>Facebook</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FaYoutube className="text-red-600 text-xl" />
            <span>YouTube</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FaInstagram className="text-pink-600 text-xl" />
            <span>Instagram</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FaWhatsapp className="text-green-600 text-xl" />
            <span>Whatsapp</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FaLinkedin className="text-blue-700 text-xl" />
            <span>Linkdin</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FaEnvelope className="text-red-500 text-xl" />
            <span>Mail</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <FaTelegram className="text-sky-500 text-xl" />
            <span>Telegram</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistHero;
