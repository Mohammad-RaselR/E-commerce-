import { X } from 'lucide-react';
import { useNavigate } from 'react-router'; // Import navigation hook
import img from "../Images/watch.png";

export default function CartSuccess() {
  const navigate = useNavigate();

  return (
    <div className="bg-pink-50 p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Successfully added to your cart</h2>
        <button
          onClick={() => navigate('/')} // ✅ Navigate to home
          className="text-gray-600 hover:text-gray-800"
        >
          <X size={24} />
        </button>
      </div>

      {/* Product Info and Checkout */}
      <div className="bg-white p-2 rounded-lg flex flex-col md:flex-row justify-between items-center md:items-start">
        {/* Product Details */}
        <div className="flex items-center gap-4 mb-3 md:mb-0">
          <img
            src={img}
            alt="Beats Pro Over-Ear Headphones"
            className="w-20 h-20 object-contain"
          />
          <div>
            <h3 className="text-gray-800 font-medium">Beats Pro Over - Ear Headphones - Black</h3>
            <p className="text-gray-700 mt-1">1990.00 BDT</p>
          </div>
        </div>

        {/* Checkout Section */}
        <div className="text-center md:text-right">
          <p className="text-gray-800 mb-3">
            Subtotal (1 item) <br />
            <span className="font-semibold">1990.00 BDT</span>
          </p>
          <button
            onClick={() => navigate('/checkout')} // ✅ Navigate to checkout page
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md mb-2"
          >
            Checkout
          </button>
          <div>
            <button
              onClick={() => navigate('/cart')} // ✅ Navigate to view cart
              className="text-black hover:text-emerald-800 hover:font-bold hover:underline text-sm font-medium mr-5"
            >
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
