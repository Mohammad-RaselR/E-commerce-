// components/ProductCard.jsx
import React from "react";
import { Heart, ArrowLeftRight } from "lucide-react";

const ProductCard = ({
  image,
  title,
  link,
  colors,
  rating,
  currentPrice,
  oldPrice,
  saveAmount,
  badges = [],
  heartLink = "#",
  arrowLink = "#",
}) => {
  return (
    <div className="relative bg-white border rounded-lg p-4 w-[220px] flex flex-col h-[360px] shadow-sm">
      
      {/* Top Left - Heart & Compare Icons */}
      <div className="absolute top-1 right-2 z-10 flex space-x-2">
        <a href={heartLink} className="text-gray-500 hover:text-red-500">
          <Heart className="w-5 h-5" />
        </a>

        <a href={arrowLink} className="text-gray-500 hover:text-indigo-600">
          <ArrowLeftRight className="w-5 h-5" />
        </a>
      </div>

      {/* Badges */}
      <div className="absolute top-2 left-2 flex gap-1 z-10">
        {badges.includes("Sale") && (
          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">
            Sale
          </span>
        )}
        {badges.includes("Hot") && (
          <span className="bg-yellow-400 text-white text-xs px-2 py-0.5 rounded">
            Hot
          </span>
        )}
      </div>

      {/* Product Info */}
      <a href={link} className="flex flex-col flex-grow">
        <img 
          src={image}
          alt={title}
          className="w-full h-36 object-contain mb-2"
        />
        <h4 className="text-sm font-medium mb-1 leading-snug">{title}</h4>
        <div className="text-xs text-gray-500">{colors || <span>&nbsp;</span>}</div>
        <div className="text-xs text-gray-500">{rating || <span>&nbsp;</span>}</div>

        <div className="text-sm font-bold mt-1">{currentPrice} BDT</div>
        {oldPrice ? (
          <>
            <div className="text-xs text-red-500 line-through">{oldPrice}</div>
            <div className="text-green-600 text-xs">Save: {saveAmount}</div>
          </>
        ) : (
          <>
            <div className="min-h-[16px] text-xs">&nbsp;</div>
            <div className="min-h-[16px] text-xs">&nbsp;</div>
          </>
        )}
      </a>

      {/* Add to Cart Button */}
      <div className="mt-auto pt-3">
        <button className="bg-indigo-600 text-white w-full py-2 text-sm rounded hover:bg-indigo-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
