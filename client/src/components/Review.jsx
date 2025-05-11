import React from 'react';
import { Star } from 'lucide-react';
import {Link} from "react-router-dom"

const Review = () => {
  return (
    <div className="px-55 bg-[#fef7f8] p-8">
      <div className="bg-white border rounded-lg p-8">
        <div className="flex justify-between border-b pb-4 mb-4">
          <div className="flex gap-40">
            <Link to ={"/product-description"} className="text-gray-600 font-semibold cursor-pointer">Description</Link>
            <Link to ={"/product-info"} className="text-gray-600 font-semibold cursor-pointer">Additional Information</Link>
            <Link to ={"/product-review"} className="text-black font-semibold border-b-2 border-black pb-1 cursor-pointer">Reviews</Link>
            <Link to = {"/product-return"} className="text-gray-400 font-semibold cursor-pointer">Shipping & Returns</Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Ratings Box */}
          <div className="bg-[#fef7f8] p-6 rounded-lg flex flex-col items-center w-full md:w-1/3">
            <div className="text-5xl font-bold">5.0</div>
            <div className="flex mt-2 mb-4">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} size={20} fill="#f97316" stroke="#f97316" />
              ))}
            </div>
            <div className="text-gray-500 text-sm mb-4">3 Product Rating</div>

            <div className="w-full space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center">
                  <span className="w-4 text-sm">{star}</span>
                  <Star size={14} fill="#f97316" stroke="#f97316" className="mx-1" />
                  <div className="w-full bg-gray-200 h-2 rounded mx-2">
                    <div
                      className="bg-orange-400 h-2 rounded"
                      style={{
                        width:
                          star === 5 ? '30%' :
                          star === 4 ? '50%' :
                          star === 3 ? '70%' :
                          star === 2 ? '30%' :
                          star === 1 ? '10%' : '0%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <h3 className="text-sm font-semibold">Review this product</h3>
              <p className="text-xs text-gray-500 mt-1">Share your thought with others customers</p>
              <button className="mt-4 bg-black text-white px-6 py-2 text-sm rounded">Write a review</button>
            </div>
          </div>

          {/* Reviews */}
          <div className="flex-1 space-y-8">
            <h3 className="text-lg font-semibold">Customer Reviews (3)</h3>

            {/* Single Review */}
            <div className="flex items-start gap-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Md. Shahdat Hossain"
                className="rounded-full w-12 h-12 object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">Md. Shahdat Hossain</h4>
                    <p className="text-xs text-gray-500">2 February, 2025</p>
                  </div>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={16} fill="#f97316" stroke="#f97316" />
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-2">Good quality full products.</p>
              </div>
            </div>

            {/* Single Review */}
            <div className="flex items-start gap-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Tizul Islam"
                className="rounded-full w-12 h-12 object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">Tizul Islam</h4>
                    <p className="text-xs text-gray-500">20 February, 2025</p>
                  </div>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={16} fill="#f97316" stroke="#f97316" />
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-2">
                  Very good quality. Amar khub pochondo hoise. Thanks for UdaoMart.
                </p>
              </div>
            </div>

            {/* Single Review */}
            <div className="flex items-start gap-4">
              <img
                src="https://via.placeholder.com/50"
                alt="Rasel Hossain"
                className="rounded-full w-12 h-12 object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">Rasel Hossain</h4>
                    <p className="text-xs text-gray-500">15 February, 2025</p>
                  </div>
                  <div className="flex">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={16} fill="#f97316" stroke="#f97316" />
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-2">Good quality full products.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
