import React from 'react';
import {Link} from "react-router-dom"


const ShippingReturns = () => {
  return (
    <div className="px-55 bg-[#fef7f8] p-8">
      <div className="bg-white border rounded-lg p-8">
        {/* Tabs */}
        <div className="flex gap-40 border-b pb-4 mb-6">
          <Link to ={'/product-description'} className="text-gray-600 font-semibold cursor-pointer">Description</Link>
          <Link to ={'/product-info'} className="text-gray-600 font-semibold cursor-pointer">Additional Information</Link>
          <Link to ={'/product-review'} className="text-gray-600 font-semibold cursor-pointer">Reviews</Link>
          <Link to ={'/product-return'} className="text-black font-semibold border-b-2 border-black pb-1 cursor-pointer">Shipping & Returns</Link>
        </div>

        {/* Shipping Details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold mb-2">Shipping Details</h3>
            <p className="text-sm mb-2">
              Estimated ship dimensions: 11.5 inches length x 9.0 inches width x 2.0 inches height
            </p>
            <p className="text-sm mb-2">
              Estimated ship weight: 2.48 pounds
            </p>
            <p className="text-sm mb-2">
              We regret that this item cannot be shipped to PO Boxes.
            </p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation
            </p>
          </div>

          {/* Returns */}
          <div className="pt-4">
            <h3 className="text-base font-bold mb-2">Returns</h3>
            <p className="text-sm">
              Not happy with a purchase? No problem. We’ve made returning items as easy as possible. <br />
              And, most purchases can be returned for free. Learn more about our Returns Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturns;
