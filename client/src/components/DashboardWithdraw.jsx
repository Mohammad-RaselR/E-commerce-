import { useNavigate, useLocation } from "react-router"; // <-- Add useLocation

export default function DashboardBody() {
  const navigate = useNavigate();
  const location = useLocation(); // <-- Get the current path

  // Sidebar menu items
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
      <div className="px-40">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center py-6">Dashboard</h1>
        <hr className="border-t border-gray-200 mb-6" />
  
        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Sidebar */}
        <div className="w-[220px] h-100 bg-emerald-950 text-white p-4 rounded-2xl mb-10">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path; // <-- Correct way to detect active link
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
  
          {/* Right Content */}
          <div className="col-span-1 md:col-span-3 space-y-10 ml-10">
            {/* Balance Section */}
            <div className="bg-gray-100 p-6 rounded-xl w-200">
              <h2 className="text-lg font-semibold mb-4">Balance</h2>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                <div>
                  <p>Your Balance: <span className="font-semibold">0.00 BDT</span></p>
                  <p>Minimum Withdraw Amount: <span className="font-semibold">0.00 BDT</span></p>
                </div>
                <button className=" bg-[#7a3ee2] hover:bg-[#5f6fb6] text-white font-semibold px-4 py-2 rounded w-42">
                  Request Withdraw
                </button>
              </div>
            </div>
  
            {/* Payment Details Section */}
            <div className="bg-gray-100 p-6 rounded-xl w-200">
              <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                <p>You do not have any approved withdraw yet</p>
                <button className="bg-[#7a3ee2] hover:bg-[#5f6fb6] text-white font-semibold px-4 py-2 rounded w-42">
                  View Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  