import React from 'react';
import { Search, User, Heart, ArrowLeftRight, ShoppingCart } from 'lucide-react';

const Header = ({ onAccountClick }) => {
  return (
    <header className="px-40 bg-green-900 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between space-x-4">
        <div className="text-2xl font-bold whitespace-nowrap">UdaoMart</div>

        <nav className="hidden lg:flex space-x-6 text-sm flex-shrink-0">
          <a href="#" className="hover:underline">Categories</a>
          <a href="#" className="hover:underline">Deals</a>
          <a href="#" className="hover:underline">What’s New</a>
        </nav>

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

        {/* 👇 Updated this to call the function */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <button onClick={onAccountClick} className="flex items-center space-x-1 hover:underline">
            <User className="w-5 h-5" />
            <span className="text-sm">Account</span>
          </button>
          <a href="/wishlist" className="hover:text-gray-300">
            <Heart className="w-5 h-5" />
          </a>
          <a href="/compare" className="hover:text-gray-300">
            <ArrowLeftRight className="w-5 h-5" />
          </a>
          <a href="/cart" className="hover:text-gray-300">
            <ShoppingCart className="w-5 h-5" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
