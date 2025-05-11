import React, { useState } from 'react';
import { Link } from 'react-router'; // Correct import

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const categories = [
    { icon: "🛋️", label: "Home & Garden", href: "/home-garden" },
    { icon: "🔵", label: "Electronics", href: "/electronics" },
    { icon: "👗", label: "Fashion", href: "/fashion" },
    { icon: "🧿", label: "Jewelry & Accessories", href: "/jewelry-accessories" },
    { icon: "🏋️", label: "Sports & Entertainment", href: "/sports-entertainment" },
    { icon: "🧸", label: "Mother & Kids", href: "/mother-kids" },
    { icon: "💅", label: "Beauty & Health", href: "/beauty-health" },
    { icon: "🧸", label: "Toys & Games", href: "/toys-games" },
    { icon: "🚗", label: "Automobiles", href: "/automobiles" },
    { icon: "🖼️", label: "Collectibles & Art", href: "/collectibles-art" },
    { icon: "🧰", label: "Tools & Home Improvement", href: "/tools-home-improvement" },
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
                    <Link
                      to={cat.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)} // Optional: closes dropdown after click
                    >
                      <span>{cat.icon}</span>
                      {cat.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Middle: Navigation Links */}
        <nav className="flex gap-6 text-sm font-medium text-gray-800">
          <Link to="/" className="hover:text-green-700">Home</Link>
          <Link to="/shop" className="hover:text-green-700">Shop</Link>
          <Link to="/about-us" className="hover:text-green-700">About Us</Link>
          <Link to={"/contact-us"} className="hover:text-green-700">Contact Us</Link>
          <Link to="/help-centers" className="hover:text-green-700">Help Center</Link>
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

export default NavBar;
