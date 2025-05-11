import React from 'react';
import {Link} from "react-router-dom"

export default function StoreSetup() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 pt-10">
      
      {/* Title */}
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-center mb-6">UdaoMart</h1>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="text-purple-600 font-semibold">Store</div>
          <div className="relative w-full mx-4">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-purple-500 transform -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-purple-500 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-gray-400">Ready!</div>
        </div>
      </div>

      {/* Store Setup Form Card */}
      <div className="bg-white w-full max-w-3xl rounded-md shadow p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Store Setup</h2>

        <form className="space-y-4">
          {/* Street */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Street <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Street 2 */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Street 2
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Post/Zip Code */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Post/Zip Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>- Select a location -</option>
              <option>USA</option>
              <option>Canada</option>
              <option>UK</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="State Name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showEmail"
              className="border-gray-300 focus:ring-purple-500"
            />
            <label htmlFor="showEmail" className="text-gray-700 text-sm">
              Show email address in store
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded"
            >
              Continue
            </button>
            <Link to={'/ready'}>
            <button
              type="button"
              className="border border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-2 rounded"
            >
              Skip this step
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
