import React from 'react';
import {Link} from "react-router-dom"

const AdditionalInformation = () => {
  return (
    <div className="px-55 bg-[#fef7f8] p-8">
      <div className="bg-white border rounded-lg p-8">
        {/* Tabs */}
        <div className="flex gap-40 border-b pb-4 mb-6">
          <Link to ={'/product-description'} className="text-gray-600 font-semibold cursor-pointer">Description</Link>
          <Link to ={'/product-info'} className="text-black font-semibold border-b-2 border-black pb-1 cursor-pointer">Additional Information</Link>
          <Link to ={'/product-review'} className="text-gray-600 font-semibold cursor-pointer">Reviews (3)</Link>
          <Link to ={'/product-return'} className="text-gray-600 font-semibold cursor-pointer">Shipping & Returns</Link>
        </div>

        {/* Table */}
        <div className="w-full">
          <div className="grid grid-cols-2">
            <div className="bg-gray-100 p-4 font-bold">weight</div>
            <div className="bg-gray-100 p-4">500g</div>

            <div className="p-4 font-bold">Dimensions</div>
            <div className="p-4">7 × 5 × 1 cm</div>

            <div className="bg-gray-100 p-4 font-bold">Color</div>
            <div className="bg-gray-100 p-4">Black</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation;
