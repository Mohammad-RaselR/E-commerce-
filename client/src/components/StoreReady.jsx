import React from 'react';
import {Link} from 'react-router-dom'

export default function StoreReady() {
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
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-purple-500 transform -translate-y-1/2" />
            {/* Store step */}
            <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-purple-500 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            {/* Ready step */}
            <div className="absolute top-1/2 left-3/4 w-4 h-4 bg-purple-500 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-purple-600 font-semibold">Ready!</div>
        </div>
      </div>

      {/* Ready Card */}
      <div className="bg-white w-full max-w-3xl rounded-md shadow p-8 flex flex-col items-center text-center">
        {/* Green Checkmark */}
        <img
          src="https://img.icons8.com/color/96/000000/ok--v2.png"
          alt="Success"
          className="w-20 h-20 mb-6"
        />

        {/* Store Ready Text */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Your Store is Ready!</h2>

        {/* Go to Dashboard Button */}
        <Link to ={'/dashboard'}>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded mb-4"
        >
          Go to your Store Dashboard!
        </button>
        </Link>

        {/* Return to Marketplace Link */}
        <Link to ={'/welcome'}
          className="text-blue-600 hover:underline mt-2 text-sm"
        >
          Return to the Marketplace
        </Link>
      </div>

    </div>
  );
}
