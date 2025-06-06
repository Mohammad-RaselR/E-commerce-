import React, { useState } from "react";
import ElectroProducts from "./ElectroProducts";
import ProductCard from "./ProductCard";
import FilterBar from "./Filter";
import { Filter as FilterIcon } from "lucide-react";
import { Link } from "react-router-dom";

const MotherKidsHero = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllAvailability, setShowAllAvailability] = useState(false);
  const [showAllColor, setShowAllColor] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const categories = ["Baby Care", "Maternity","Baby Fashion", "Kids Fashion", "Toys", "Feeding & Nutrition"];
  const availabilityOptions = ["Upcoming", "In Stock", "Out Of Stock"];
  const color = ["Black", "Red", "Green", "White", "Blue", "Orange", "Brown", "Silver", "Yellow"];
  const allBrands = ["MotherCare", "Farlin", "Dermadew", "Johnson's for baby care", "BabyShoppers"];


  const toggleItem = (item, setState, state) => {
    setState(
      state.includes(item)
        ? state.filter((i) => i !== item)
        : [...state, item]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedAvailability([]);
    setSelectedPrice("");
    setPriceRange({ min: "", max: "" });
    setSelectedColor([]);
    setSelectedBrands([]);
  };

  return (
    <div className="px-45 py-8 bg-[#f4f4f4]">
      <div className="text-sm text-gray-500 mb-4 space-x-2">
        <Link to="/" className="hover:underline hover:font-bold hover:text-emerald-800 text-gray-600">
          Home
        </Link>
        <span>&gt;</span>
        <span className="text-black font-medium">Mother & Kids</span>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-[290px] bg-white p-4 rounded-lg shadow-sm mr-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Refine By</h3>
            <button onClick={clearAllFilters} className="text-sm text-gray-500 hover:text-red-500">
              Clear All
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-2">Categories</h4>
            <div className="text-sm text-gray-700 ml-2">
              {(showAllCategories ? categories : categories.slice(0, 4)).map((cat) => (
                <label className="block" key={cat}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleItem(cat, setSelectedCategories, selectedCategories)}
                    className="mr-2"
                  />
                  {cat}
                </label>
              ))}
              {categories.length > 4 && (
                <button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  className="text-sm font-semibold text-green-800 hover:underline"
                >
                  {showAllCategories ? "See Less" : "See More"}
                </button>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-2">Availability</h4>
            {(showAllAvailability ? availabilityOptions : availabilityOptions.slice(0, 4)).map((option) => (
              <label className="block text-sm" key={option}>
                <input
                  type="checkbox"
                  checked={selectedAvailability.includes(option)}
                  onChange={() => toggleItem(option, setSelectedAvailability, selectedAvailability)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
            {availabilityOptions.length > 4 && (
              <button
                onClick={() => setShowAllAvailability(!showAllAvailability)}
                className="text-sm font-semibold text-green-800 hover:underline"
              >
                {showAllAvailability ? "See Less" : "See More"}
              </button>
            )}
          </div>

          {/* Price */}
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-2">Price</h4>
            {["0 - 500.00 BDT", "500.00 - 3000.00 BDT", "3000.00 BDT +"].map((option, i) => (
              <label className="block text-sm" key={i}>
                <input
                  type="radio"
                  name="price"
                  checked={selectedPrice === option}
                  onChange={() => setSelectedPrice(option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-[80px] px-2 py-1 text-sm border rounded"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-[80px] px-2 py-1 text-sm border rounded"
                />
              </div>
              <button className="text-sm mt-2 px-2 py-1 bg-indigo-600 text-white rounded">Apply</button>
            </div>
          </div>

          {/* Color */}
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-2">Color</h4>
            {(showAllColor ? color : color.slice(0, 4)).map((option) => (
              <label className="block text-sm" key={option}>
                <input
                  type="checkbox"
                  checked={selectedColor.includes(option)}
                  onChange={() => toggleItem(option, setSelectedColor, selectedColor)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
            {color.length > 4 && (
              <button
                onClick={() => setShowAllColor(!showAllColor)}
                className="text-sm font-semibold text-green-800 hover:underline"
              >
                {showAllColor ? "See Less" : "See More"}
              </button>
            )}
          </div>

          {/* Brand */}
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-2">Brand</h4>
            {(showAllBrands ? allBrands : allBrands.slice(0, 4)).map((brand) => (
              <label className="block text-sm" key={brand}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleItem(brand, setSelectedBrands, selectedBrands)}
                  className="mr-2"
                />
                {brand}
              </label>
            ))}
            {allBrands.length > 4 && (
              <button
                onClick={() => setShowAllBrands(!showAllBrands)}
                className="text-sm font-semibold text-green-800 hover:underline"
              >
                {showAllBrands ? "See Less" : "See More"}
              </button>
            )}
          </div>
        </aside>

        {/* Right: Filter Bar + Products */}
        <div className="flex-1">
          <FilterBar />
          <ElectroProducts />
        </div>
      </div>
    </div>
  );
};

export default MotherKidsHero;
