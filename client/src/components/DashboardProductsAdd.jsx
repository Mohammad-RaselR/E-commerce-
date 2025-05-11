import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router";

export default function DashboardProductsAdd() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Products", path: "/dashboard/products" },
    { label: "Order", path: "/dashboard/order" },
    { label: "Withdraw", path: "/dashboard/withdraw" },
    { label: "Store", path: "/dashboard/store-details" },
    { label: "Store List", path: "/dashboard/store-list" },
    { label: "Edit Account", path: "/dashboard/store-edit" },
    { label: "Logout", path: "/logout" },
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
            const isActive =
              location.pathname === item.path ||
              (item.path === "/dashboard/products" &&
                location.pathname.startsWith("/dashboard/products"));

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
        <div className="col-span-1 md:col-span-4 space-y-4 bg-[#0f172a] p-8 rounded-xl text-white mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Add Product</h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded"
              onClick={() => navigate("/dashboard/products")}
            >
              Products
            </button>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-1">Product name</label>
              <input
                type="text"
                placeholder="product name"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Product brand</label>
              <input
                type="text"
                placeholder="product brand"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Category</label>
              <select className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none">
                <option>--select category--</option>
                <option>Headphones</option>
                <option>Shoes</option>
                <option>Furniture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Stock</label>
              <input
                type="text"
                placeholder="product stock"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Price</label>
              <input
                type="text"
                placeholder="price"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Product Image</label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Description</label>
              <textarea
                placeholder="description"
                rows="4"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
