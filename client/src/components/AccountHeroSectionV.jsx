import { Mail, MapPin, Phone, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import img1 from "../Images/ami.jpg";

const AccountHeroSectionV = () => {
  const [editMode, setEditMode] = useState(false);
  const [vendorImage, setVendorImage] = useState(img1);
  const [bannerImage, setBannerImage] = useState("https://via.placeholder.com/600x300?text=Store+Banner");
  const [products, setProducts] = useState([]);
  const [storeExists, setStoreExists] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.vendor.currentVendor);

  const [details, setDetails] = useState({
    fullName: "",
    email: "",
    location: "",
    phone: "",
    storeTime: {
      Monday: { from: "08:30", to: "21:00" },
      Tuesday: { from: "08:30", to: "21:00" },
      Wednesday: { from: "08:30", to: "21:00" },
      Thursday: { from: "08:30", to: "21:00" },
      Friday: { from: "08:30", to: "21:00" },
      Saturday: { from: "08:30", to: "21:00" },
      Sunday: { off: true },
    },
  });

  const vendorId = vendor._id || vendor.vendorId || vendor.id;

  useEffect(() => {
    const fetchStoreAndProducts = async () => {
      try {
        const storeRes = await fetch(`/api/vendor/store-details/${vendorId}`);
        const storeData = await storeRes.json();
        if (!storeRes.ok) throw new Error(storeData.message || "Failed to fetch store details");

        const store = storeData.data;
        if (store) setStoreExists(true);

        setDetails({
          fullName: store.fullName || "",
          email: store.email || "",
          location: store.location || "",
          phone: store.phone || "",
          storeTime: store.storeTime || details.storeTime,
        });

        setVendorImage(store.vendorImage || img1);
        setBannerImage(store.bannerImage || bannerImage);

        const productRes = await fetch(`/api/vendor/products-all/${vendorId}`);
        const productData = await productRes.json();
        if (!productRes.ok) throw new Error(productData.message || "Failed to fetch products");

        const allProducts = productData.data || [];
        setProducts(allProducts);

        const uniqueCategories = [...new Set(allProducts.map(p => p.category))];
        setCategories(["All", ...uniqueCategories]);
      } catch (err) {
        console.error("Error fetching vendor store or products:", err);
      }
    };

    if (vendorId) fetchStoreAndProducts();
  }, [vendorId]);

  const handleInputChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleVendorImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVendorImage(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "e_commerce");
      formData.append("cloud_name", "dro3wi15x");
      fetch("https://api.cloudinary.com/v1_1/dro3wi15x/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setVendorImage(data.secure_url);
          setDetails({ ...details, vendorImage: data.secure_url });
        });
    }
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) setBannerImage(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "banner_image");
    formData.append("cloud_name", "dro3wi15x");
    fetch("https://api.cloudinary.com/v1_1/dro3wi15x/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setBannerImage(data.secure_url);
        setDetails({ ...details, bannerImage: data.secure_url });
      });
  };

  const handleTimeChange = (day, field, value) => {
    setDetails({
      ...details,
      storeTime: {
        ...details.storeTime,
        [day]: {
          ...details.storeTime[day],
          [field]: value,
        },
      },
    });
  };

  const handleOffDayToggle = (day) => {
    const current = details.storeTime[day];
    const updated = current.off || !("from" in current)
      ? { from: "08:00", to: "21:00" }
      : { off: true };
    setDetails({
      ...details,
      storeTime: {
        ...details.storeTime,
        [day]: updated,
      },
    });
  };

  const handleUpdateStore = async () => {
    try {
      const res = await fetch(`/api/vendor/store-update/${vendorId}`, {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        alert("Store updated successfully");
      }
      setEditMode(false);
    } catch (err) {
      console.error("Error updating store:", err);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const payload = {
        ...details,
        vendorImage,
        bannerImage,
        vendorId,
      };

      const res = await fetch(`/api/vendor/store-create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error("Failed to save store details");

      alert("Store details saved successfully.");
      setEditMode(false);
      setStoreExists(true);
    } catch (err) {
      alert("Error saving store details.");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-6 space-y-10">
      {/* Header Buttons */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-center">Store Details</h2>
        <div className="flex gap-3">
          {!storeExists ? (
            !editMode ? (
              <button onClick={() => setEditMode(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
            ) : (
              <button onClick={handleSaveChanges} className="bg-green-600 text-white px-4 py-2 rounded">Save Store</button>
            )
          ) : (
            <>
              {!editMode ? (
                <button onClick={() => setEditMode(true)} className="bg-indigo-600 text-white px-4 py-2 rounded">Edit</button>
              ) : (
                <>
                  <button onClick={() => setEditMode(false)} className="bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
                  <button onClick={handleUpdateStore} className="bg-green-600 text-white px-4 py-2 rounded">Save Changes</button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Vendor Info + Banner */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Vendor Info */}
        <div className="w-full md:w-2/5 border rounded p-6 flex flex-col items-center">
          <img src={vendorImage} alt="Vendor" className="w-24 h-28 rounded-full object-cover mb-4" />
          {editMode && <input type="file" accept="image/*" onChange={handleVendorImageUpload} className="mb-2 text-sm" />}
          {editMode ? (
            <input
              type="text"
              name="fullName"
              value={details.fullName}
              onChange={handleInputChange}
              className="text-xl font-semibold text-center border rounded px-2 py-1"
            />
          ) : (
            <h2 className="text-xl font-semibold">{details.fullName}</h2>
          )}

          <div className="mt-8 space-y-3 text-sm w-full">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-700" />
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={details.email}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                <a href={`mailto:${details.email}`} className="hover:underline text-blue-600">{details.email}</a>
              )}
            </div>

            <div className="flex items-center gap-2 text-gray-500 pl-1">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>No Ratings found yet!</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-700" />
              {editMode ? (
                <input
                  type="text"
                  name="location"
                  value={details.location}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                <span>{details.location}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-700" />
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={details.phone}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                <span>{details.phone}</span>
              )}
            </div>
          </div>
        </div>

        {/* Banner */}
        <div className="w-full md:w-3/5 border rounded-md overflow-hidden flex flex-col items-center justify-center">
          <img src={bannerImage} alt="Store Banner" className="w-full h-64 object-cover" />
          {editMode && <input type="file" accept="image/*" onChange={handleBannerUpload} className="mt-2 text-sm" />}
        </div>
      </div>

      {/* Store Time + Contact + Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Store Time and Contact */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Store Time</h2>
            <ul className="space-y-2 text-sm">
              {Object.entries(details.storeTime).map(([day, value]) => (
                <li key={day} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <span className="font-medium w-24">{day}</span>
                  {value?.off ? (
                    editMode ? (
                      <button onClick={() => handleOffDayToggle(day)} className="text-red-500 font-bold text-sm">
                        Off Day (Click to Enable)
                      </button>
                    ) : (
                      <span className="text-red-500 font-bold text-sm">Off Day</span>
                    )
                  ) : editMode ? (
                    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                      <input
                        type="time"
                        value={value.from}
                        onChange={(e) => handleTimeChange(day, "from", e.target.value)}
                        className="border rounded px-2 py-1"
                      />
                      <input
                        type="time"
                        value={value.to}
                        onChange={(e) => handleTimeChange(day, "to", e.target.value)}
                        className="border rounded px-2 py-1"
                      />
                      <button onClick={() => handleOffDayToggle(day)} className="text-sm text-red-500">
                        Set Off
                      </button>
                    </div>
                  ) : (
                    <span>{value.from} - {value.to}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Contact Vendor</h2>
            <form className="space-y-4 text-sm">
              <input type="text" placeholder="Enter Name" className="w-full border border-gray-300 rounded px-4 py-2" />
              <input type="email" placeholder="example@gmail.com" className="w-full border border-gray-300 rounded px-4 py-2" />
              <textarea rows="3" placeholder="Type your message.........." className="w-full border border-gray-300 rounded px-4 py-2" />
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded px-4 py-2 text-sm font-bold">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Product Table */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/2 border border-gray-300 rounded px-3 py-2"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-1/3 border border-gray-300 rounded px-3 py-2"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border rounded">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Product ID</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.productId}>
                      <td className="px-4 py-2">{product.productId}</td>
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">{product.category}</td>
                      <td className="px-4 py-2">${product.price}</td>
                      <td className="px-4 py-2">{product.stock}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">
                      No products found for the current filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountHeroSectionV;
