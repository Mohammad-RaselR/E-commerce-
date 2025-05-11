import { useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ProductHero() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentVendor } = useSelector((state) => state.vendor || {});

  const [form, setForm] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
<<<<<<< HEAD
  // console.log("form", form);
=======
>>>>>>> ef858a76aba191f940ce8c5cc734b2341b060e56

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/vendor/products/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, vendorId: currentVendor._id }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Product created successfully!");
        navigate("/dashboard/products");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

 
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
      <h1 className="text-3xl font-bold text-center py-6">Dashboard</h1>
      <hr className="border-t border-gray-200 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sidebar */}
        <div className="w-[220px] bg-emerald-950 text-white p-4 rounded-2xl mb-10">
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
                  ${
                    isActive
                      ? "bg-pink-700 text-white"
                      : "hover:bg-pink-700 hover:text-white"
                  }`}
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

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm mb-1">Product name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="product name"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
              >
                <option>--select category--</option>
                <option value="Headphones">Headphones</option>
                <option value="Shoes">Shoes</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="product stock"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="price"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="description"
                rows="4"
                className="w-full px-3 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
