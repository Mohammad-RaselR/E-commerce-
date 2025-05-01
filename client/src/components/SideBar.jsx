import React from "react";
import { FaUser, FaHeart, FaExchangeAlt, FaTruck, FaQuestionCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const SideBar = ({ onClose }) => {
  return (
    <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-lg px-6 py-8 z-50">
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <img src="" alt="User" className="w-14 h-14 rounded-full object-cover" />
          <span className="font-semibold text-lg">Account</span>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition">
          <IoMdClose className="text-2xl" />
        </button>
      </div>

      <ul className="space-y-5 text-sm">
        <li>
          <Link to="/sign-in" className="flex items-center gap-3 hover:text-blue-600 transition">
            <FaUser className="text-lg" />
            <span>Sign In</span>
          </Link>
        </li>
        <li>
          <Link to="/create-account" className="flex items-center gap-3 hover:text-blue-600 transition">
            <FaUser className="text-lg" />
            <span>Create Account</span>
          </Link>
        </li>
        <li>
          <Link to="/wishlist" className="flex items-center gap-3 hover:text-blue-600 transition">
            <FaHeart className="text-lg" />
            <span>Wishlist</span>
          </Link>
        </li>
        <li>
          <Link to="/compare" className="flex items-center gap-3 hover:text-blue-600 transition">
            <FaExchangeAlt className="text-lg" />
            <span>Compare</span>
          </Link>
        </li>
        <li>
          <Link to="/track-order" className="flex items-center gap-3 hover:text-blue-600 transition">
            <FaTruck className="text-lg" />
            <span>Track Order</span>
          </Link>
        </li>
        <li>
          <Link to="/help-center" className="flex items-center gap-3 hover:text-blue-600 transition">
            <FaQuestionCircle className="text-lg" />
            <span>Help Center</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
