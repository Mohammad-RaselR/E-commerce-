import React from "react";
import { Link } from "react-router";

const brands = [
  { name: "NATURE" },
  { name: "CLASSIC" },
  { name: "BRANDIT" },
  { name: "Alisa" },
  { name: "WestSide" },
  { name: "Smile" },
];

const Brands = () => {
  return (
    <div className="px-40 bg-[#f4f4f4] py-10 border-gray-200 border-0 p-2">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7">
        {brands.map((brand, index) => (
          <Link
            to={`/brands/${brand.name.toLowerCase()}`} // e.g., /brands/nature
            key={index}
            className="bg-gray-400 h-28 flex items-center justify-center rounded hover:bg-gray-500 transition"
          >
            <span className="text-white text-lg font-semibold tracking-wide">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Brands;
