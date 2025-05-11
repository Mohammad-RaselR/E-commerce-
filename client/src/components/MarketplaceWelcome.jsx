import {Link} from "react-router-dom"
export default function MarketplaceWelcome() {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl">
          {/* Title */}
          <h1 className="text-3xl font-semibold text-center mb-6">UdaoMart</h1>
  
          {/* Progress bar */}
          <div className="flex items-center justify-between mb-8 px-4">
            <div className="text-gray-400">Store</div>
            <div className="relative w-full mx-4">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white border-2 border-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="text-gray-400">Ready!</div>
          </div>
  
          {/* Card */}
          <div className="bg-white rounded shadow p-8 text-center">
            {/* Welcome Text */}
            <h2 className="text-2xl font-semibold mb-4">Welcome to the Marketplace!</h2>
  
            {/* Description */}
            <p className="text-gray-700 mb-4">
              Thank you for choosing The Marketplace to power your online store! This quick setup
              wizard will help you configure the basic settings.{" "}
              <span className="font-bold">It’s completely optional and shouldn’t take longer than two minutes.</span>
            </p>
  
            <p className="text-gray-700 mb-8">
              No time right now? If you don’t want to go through the wizard, you can skip and return to the Store!
            </p>
  
            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to={'/setup'}>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded">
                Let's Go!
              </button>
              </Link>
              <Link to ={'/'}>
              <button className="border border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded">
                Not right now
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  