import { useNavigate, useLocation } from "react-router"; // <-- Add useLocation
import {Link} from "react-router"


export default function DashboardProducts() {
  const navigate = useNavigate();
  const location = useLocation(); // <-- Get the current path

  // Sidebar menu items
  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Products", path: "/dashboard/products" },
    { label: "Order", path: "/dashboard/order" },
    { label: "Withdraw", path: "/dashboard/withdraw" },
    { label: "Store", path: "/dashboard/store-details" },
    { label: "Store List", path: "/dashboard/store-list" },
    { label: "Edit Account", path: "/dashboard/store-edit" },
    { label: "Logout", path: "/logout" }, // You can handle logout separately if needed
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
            <Link to= {'/dashboard/products/add'} className="text-sm font-bold text-green-700 mr-10 hover:text-emerald-900">
              + Add New Product
            </Link>
            {/* No Products found */}
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mt-6">
              <p className="font-bold">✖ No products found</p>
            </div>
            <div>

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
  