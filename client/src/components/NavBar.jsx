import React, { useState } from 'react';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = [
    { icon: "🛋️", label: "Home & Garden", href: "#" },
    { icon: "🔵", label: "Electronics", href: "#" },
    { icon: "👗", label: "Fashion", href: "#" },
    { icon: "🧿", label: "Jewelry & Accessories", href: "#" },
    { icon: "🏋️", label: "Sports & Entertainment", href: "#" },
    { icon: "🧸", label: "Mother & Kids", href: "#" },
    { icon: "💅", label: "Beauty & Health", href: "#" },
    { icon: "🧸", label: "Toys & Games", href: "#" },
    { icon: "🚗", label: "Automobiles", href: "#" },
    { icon: "🖼️", label: "Collectibles & Art", href: "#" },
    { icon: "🧰", label: "Tools & Home Improvement", href: "#" },
  ];

  return (
    <div className="px-40 bg-[#f4f4f4] border-gray-200 border-2 p-2">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Left: Shop By Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 font-semibold border px-4 py-2 rounded-md shadow-sm hover:bg-gray-100"
          >
            <span className="text-xl">☰</span>
            Shop By Category
            <span>▾</span>
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="py-1">
                {categories.map((cat, index) => (
                  <li key={index}>
                    <a
                      href={cat.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      <span>{cat.icon}</span>
                      {cat.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Middle: Navigation Links */}
        <nav className="flex gap-6 text-sm font-medium text-gray-800">
          <a href="#" className="hover:text-green-700">Home</a>
          <a href="#" className="hover:text-green-700">Shop</a>
          <a href="#" className="hover:text-green-700">Features</a>
          <a href="#" className="hover:text-green-700">Pages</a>
          <a href="#" className="hover:text-green-700">Blog</a>
        </nav>

        {/* Right: Shop Today’s Deals */}
        <a
          href="#"
          className="text-sm font-semibold text-green-800 hover:underline ml-4"
        >
          Shop Today's Deals
        </a>
      </div>
    </div>
  );
};

export default Navbar;
