import React from "react";
import { FaUser, FaHeart, FaExchangeAlt, FaTruck, FaQuestionCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import img from "../Images/am.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef , useState} from "react";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import {app} from "../firebase";
const UserSidebar = () => {
  return (
    <div className="w-full max-w-sm px-6 py-8">
      {/* Top section */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <img
            src={img} // Replace this with your actual image path
            alt="User"
            className="w-14 h-14 rounded-full object-cover"
          />
          <span className="font-semibold text-lg">Md. Shahdat Hossain</span>
        </div>
        <button>
          <IoMdClose className="text-2xl" />
        </button>
      </div>

      {/* Menu Items as Links */}
      <ul className="space-y-5 text-sm">
        <li>
          <a href="/sign-in" className="flex items-center gap-3 hover:text-blue-600 transition">
            <FaUser className="text-lg" />
            <span>Sign In</span>
          </a>
        </li>
        <li>
          <a href="/sign-up" className="flex items-center gap-3 hover:text-blue-600 transition">
            <FaUser className="text-lg" />
            <span>Create Account</span>
          </a>
        </li>
        <li>
          <a href="/wishlist" className="flex items-center gap-3 hover:text-blue-600 transition">
            <FaHeart className="text-lg" />
            <span>Wishlist</span>
          </a>
        </li>
        <li>
          <a href="/compare" className="flex items-center gap-3 hover:text-blue-600 transition">
            <FaExchangeAlt className="text-lg" />
            <span>Compare</span>
          </a>
        </li>
        <li>
          <a href="/track-order" className="flex items-center gap-3 hover:text-blue-600 transition">
            <FaTruck className="text-lg" />
            <span>Track Order</span>
          </a>
        </li>
        <li>
          <a href="/help-center" className="flex items-center gap-3 hover:text-blue-600 transition">
            <FaQuestionCircle className="text-lg" />
            <span>Help Center</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
