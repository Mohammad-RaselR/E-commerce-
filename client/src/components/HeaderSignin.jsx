import React from 'react';
import { Search, User, Heart,ArrowLeftRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeaderSignin = () => {
  return (
    <header className="px-40 bg-green-900 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between space-x-4">
        {/* Logo */}
        <div className="text-2xl font-bold whitespace-nowrap">UdaoMart</div>

        {/* Nav Links */}
        <nav className="hidden lg:flex space-x-6 text-sm flex-shrink-0">
          {/*<a href="#" className="hover:underline">Categories</a> */}
          <a href="#" className="hover:underline">Deals</a>
          <a href="#" className="hover:underline">What’s New</a>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-3xl">
          <div className="flex items-center bg-white rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search Products"
              className="w-full px-4 py-2 text-black outline-none"
            />
            <button className="px-4">
              <Search className="text-black w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Icons: Account, Wishlist, Cart, Compare */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <Link to="/accounts" className="flex items-center space-x-1 hover:underline">
            <User className="w-5 h-5" />
            <span className="text-sm">Account</span>
          </Link>
          <Link to="/wishlist" className="hover:text-gray-300">
            <Heart className="w-5 h-5" />
          </Link>
          <Link to="/compare" className="hover:text-gray-300">
            <ArrowLeftRight className="w-5 h-5" />
          </Link>
          <Link to="/cart" className="hover:text-gray-300">
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderSignin;
