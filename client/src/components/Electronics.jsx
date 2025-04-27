import React, { useState } from "react";
import ElectroProducts from "./ElectroProducts";
import { Filter } from "lucide-react";
import ProductCard from "./ProductCard";
import Home from "../Pages/Home";

const Electronics = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedProcessor, setSelectedProcessor] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showAllBrands, setShowAllBrands] = useState(false);

  const categories = [
    "Windows OS",
    "Mac OS",
    "Cell Phones",
    "Headphones",
    "Home Accessories",
    "Office Accessories",
    "Computer Accessories",
  ];

  const availabilityOptions = ["Upcoming", "In Stock", "Out Of Stock"];
  const storageOptions = ["0 - 128 GB", "128 - 256 GB", "1TB SSD Storage"];
  const processorOptions = ["AMD Ryzen 3 - 7", "Apple M1", "Intel Core i3 - i7"];
  const allBrands = ["Asus", "HP", "Dell", "Samsung", "Realme", "Acer", "Lenovo"];

  const toggleItem = (item, setState, state) => {
    setState(
      state.includes(item)
        ? state.filter(i => i !== item)
        : [...state, item]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedAvailability([]);
    setSelectedPrice("");
    setPriceRange({ min: "", max: "" });
    setSelectedStorage([]);
    setSelectedProcessor([]);
    setSelectedBrands([]);
  };

  return (
    <div className="px-45 py-8 bg-[#f4f4f4]">
      

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-[290px] bg-white p-4 rounded-lg shadow-sm mr-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold">Refine By</h3>
            <button onClick={clearAllFilters} className="text-sm text-gray-500 hover:text-red-500">
              Clear All
            </button>
          </div>

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
              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="text-sm font-semibold text-green-800 hover:underline"
              >
                {showAllCategories ? "See Less" : "See More"}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-2">Availability</h4>
            {availabilityOptions.map((option) => (
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
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-2">Price</h4>
            {["0 - 10000.00 BDT", "10000.00 - 30000.00 BDT", "30000.00 BDT +"].map((option, i) => (
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
                  className="w-[100px] px-2 py-1 text-sm border rounded"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-[100px] px-2 py-1 text-sm border rounded"
                />
              </div>
              <button className="text-sm mt-2 px-2 py-1 bg-indigo-600 text-white rounded">Apply</button>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-2">Storage Capacity</h4>
            {storageOptions.map((option) => (
              <label className="block text-sm" key={option}>
                <input
                  type="checkbox"
                  checked={selectedStorage.includes(option)}
                  onChange={() => toggleItem(option, setSelectedStorage, selectedStorage)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-2">Processor Type</h4>
            {processorOptions.map((option) => (
              <label className="block text-sm" key={option}>
                <input
                  type="checkbox"
                  checked={selectedProcessor.includes(option)}
                  onChange={() => toggleItem(option, setSelectedProcessor, selectedProcessor)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

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
            <button
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="text-sm font-semibold text-green-800 hover:underline"
            >
              {showAllBrands ? "See Less" : "See More"}
            </button>
          </div>
        </aside>

        <div className="flex flex-1/2">
          <ElectroProducts></ElectroProducts>
        </div>
      </div>
    </div>
  );
};

export default Electronics;
