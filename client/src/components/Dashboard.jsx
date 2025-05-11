import React from "react";
import { useNavigate, useLocation } from "react-router";
// import { Link } 
// from "react-router";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Products', path: '/dashboard/products' },
    { label: 'Order', path: '/dashboard/order' },
    { label: 'Withdraw', path: '/dashboard/withdraw' },
    { label: 'Store', path: '/vendor/store' },
    { label: 'Store List', path: '/dashboard/store-list' },
    
    { label: 'Edit Account', path: '/vendor/edit' },
    { label: 'Logout', path: '/logout' }
  ];

  return (
    <div className="px-40 min-h-screen">
      <h1 className="text-3xl font-bold text-center py-6">Dashboard</h1>
      <hr className="border-t border-gray-200 mb-6" />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-[220px] h-100 bg-emerald-950 text-white p-4 rounded-2xl">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={idx}
                onClick={() => navigate(item.path)}
                className={`py-2 px-4 mb-1 text-sm font-medium rounded cursor-pointer transition-all
                  ${isActive ? "bg-pink-700 text-white" : "hover:bg-pink-700 hover:text-white"}`}
              >
                {item.label}
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Row 1: Net Earn & Sales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Net Earn */}
            <div className="p-4 bg-gray-200 rounded-xl">
              <div className="font-bold text-xl mb-4 text-pink-500">Net Earn</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <span>Net Sales</span>
                  <span>0.00 BDT</span>
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <span>Earning</span>
                  <span>0.00 BDT</span>
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <span>Pageview</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <span>Order</span>
                  <span>0</span>
                </div>
              </div>
            </div>

            {/* Sales this Month */}
            <div className="p-4 bg-gray-200 rounded-xl text-sm">
              <div className="font-bold text-xl mb-4 text-pink-500">Sales this Month</div>
              <div className="h-48 bg-gray-50 border rounded flex items-center justify-center text-gray-400 text-sm mb-3">
                Chart Placeholder
              </div>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span>Sales total</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
                  <span>Numbers of orders</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Orders & Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            {/* Orders */}
            <div className="bg-gray-200 rounded-xl text-sm p-4">
              <div className="font-bold text-xl mb-4 text-pink-500">Orders</div>
              {[
                { label: "Total", color: "text-red-500" },
                { label: "Completed", color: "text-green-500" },
                { label: "Pending", color: "text-gray-700" },
                { label: "Processing", color: "text-orange-500" },
                { label: "Cancelled", color: "text-red-500" },
                { label: "Refunded", color: "text-blue-500" },
                { label: "On hold", color: "text-cyan-500" },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between py-1">
                  <span className={`${item.color}`}>{item.label}</span>
                  <span className="font-semibold">0</span>
                </div>
              ))}
            </div>

            {/* Products */}
            <div className="bg-gray-200 rounded-xl p-4 text-sm">
              <div className="flex justify-between items-center mb-4">
                <div className="font-bold text-xl text-pink-500">Products</div>
                <Link
                  to={"/dashboard/products/add"}
                  className="text-sm font-bold text-green-700 hover:text-emerald-900"
                >
                  + Add New Product
                </Link>
              </div>
              {["Total", "Live", "Offline", "Pending Review"].map((label, idx) => (
                <div key={idx} className="flex justify-between py-1">
                  <span>{label}</span>
                  <span className="font-semibold">0</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
