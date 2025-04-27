import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0e1c1f] text-white text-sm pt-10 ">
      {/* Top Section */}
      <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
        
        {/* Call Info */}
        <div>
          <h4 className="font-semibold mb-2">Call</h4>
          <p>Call us from 8 am to 12 am ET</p>
          <p className="mt-1 text-[#79e3ff]">+880115374041</p>
        </div>

        {/* Email Info */}
        <div>
          <h4 className="font-semibold mb-2">Email</h4>
          <p>Our response time is 1 to 3 business days</p>
          <p className="mt-1">
            <a href="mailto:udaomart@gmail.com" className="text-[#79e3ff] hover:underline">
              udaomart@gmail.com
            </a>
          </p>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2 px-25">
          <h4 className="font-semibold mb-2">Let’s keep in touch</h4>
          <p>Get recommendations, tips, updates, promotions more.</p>
          <div className="flex mt-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-80 px-4 py-2 text-black bg-gray-100 rounded-l-md focus:outline-none"
            />
            <button className="bg-purple-600 px-4 py-2 rounded-r-md hover:bg-purple-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="container mx-auto px-6 grid md:grid-cols-5 gap-6 py-10 border-b border-gray-700">
        {/* Brand Info */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-2">UdaoMart</h3>
          <p className="text-gray-300">Best For Shopping</p>
          <p className="text-gray-400 mt-1 text-xs">
            Sed do eiusmod tempor incididuntut labore dolore magna
          </p>

          {/* Social Media */}
          <div className="flex gap-4 mt-4 text-xl text-gray-300">
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        {/* Footer Links */}
        <div>
          <h4 className="font-semibold mb-3">Get to Know Us</h4>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#">About Us</a></li>
            <li><a href="#">News & Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Investors</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Customer Service</h4>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">FAQ’s</a></li>
            <li><a href="#">Accessibility</a></li>
            <li><a href="#">Feedback</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Payment Method</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Order & Returns</h4>
          <ul className="space-y-1 text-gray-300">
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Shipping & Delivery</a></li>
            <li><a href="#">Return & Exchange</a></li>
            <li><a href="#">Price Match Guarantee</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-xs gap-4">
        {/* Payment Icons (replace src as needed) */}
        <div className="flex flex-wrap items-center gap-4">
          <img src="/dbbl.png" alt="DBBL" className="h-6" />
          <img src="/visa.png" alt="Visa" className="h-6" />
          <img src="/nagad.png" alt="Nagad" className="h-6" />
          <img src="/bkash.png" alt="bKash" className="h-6" />
          <img src="/rocket.png" alt="Rocket" className="h-6" />
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Uses</a>
          <a href="#">Legal</a>
          <a href="#">site Map</a>
        </div>

        {/* Copyright */}
        <p className="text-center w-full md:w-auto">
          Copyright © 2025 UdaoMart, All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
