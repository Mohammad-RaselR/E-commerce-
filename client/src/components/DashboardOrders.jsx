import { useNavigate, useLocation } from "react-router"; // <-- Add useLocation

export default function DashboardOrders() {
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

        {/* Layout: Sidebar + Main Content */}
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
  
          {/* Main Content */}
          <div className="col-span-1 md:col-span-4 space-y-4">
            {/* Error Banner */}
            
  
            {/* Order Status Tabs */}
            <div className="flex flex-wrap gap-4 text-sm font-medium border-b pb-2 text-gray-700">
              {[
                'All (0)',
                'Pending payment (0)',
                'Processing (0)',
                'On hold (0)',
                'Completed (0)',
                'Cancelled (0)',
                'Refunded (0)',
                'Failed (0)',
              ].map((status, i) => (
                <span key={i} className="cursor-pointer hover:text-black">
                  {status}
                </span>
              ))}
            </div>
  
            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center mt-4">
              <select className="border p-2 rounded w-full md:w-auto">
                <option>Filter by register...</option>
              </select>
              <input
                type="text"
                placeholder="Search Orders"
                className="border p-2 rounded w-full md:w-1/4"
              />
              <input
                type="text"
                placeholder="Select Date Range"
                className="border p-2 rounded w-full md:w-1/4"
              />
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">Filter</button>
              <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">Reset</button>
              <button className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded">
                Export All
              </button>
              <button className="bg-emerald-800 hover:bg-emerald-950 text-white px-4 py-2 rounded">
                Export Filtered
              </button>
            </div>
  
            {/* No Orders Message */}
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mt-6">
              <p className="font-bold">✖ No orders found</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Sidebar item component
  function SidebarItem({ label, active = false }) {
    return (
      <div
        className={`px-4 py-2 rounded-md cursor-pointer ${
          active ? 'bg-red-600' : 'hover:bg-gray-800'
        }`}
      >
        {label}
      </div>
    );
  }
  