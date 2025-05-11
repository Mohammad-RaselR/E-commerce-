import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import  { setVendor } from '../redux/vendor/vendorSlice'; // Import your Redux action
export default function EditAccount() {
  const navigate = useNavigate();
  const location = useLocation();
const dispatch = useDispatch();
  // Get current vendor data from Redux
  const { currentVendor } = useSelector((state) => state.vendor || {});
console.log("currentVendor",currentVendor)
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    currentPassword: '********',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (currentVendor) {
      // const fullName = currentVendor.username || '';
  
      const firstName = currentVendor.firstName || '';
      const lastName = currentVendor.lastName || '';
      
      setFormData({
        username: currentVendor.username || '',
        firstName,
        lastName,
        email: currentVendor.email || '',
        mobileNumber: currentVendor.mobileNumber || '',
        currentPassword: '********',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [currentVendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, mobilenumber, currentPassword, newPassword, confirmPassword } = formData;
  
    const updatedData = { firstName, lastName, email, mobilenumber };
  
    if (newPassword && newPassword === confirmPassword) {
      updatedData.password = newPassword;
    } else if (newPassword || confirmPassword) {
      alert("New password and confirm password must match.");
      return;
    }
   
  
    try {
      const response = await fetch(`/api/vendor/vendor-update/${currentVendor._id}`, {
        method: 'POST', // your backend uses POST
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify(updatedData)
      });
  
      const data = await response.json();
      console.log("data",data)
     
      if (data) {
        console.log("Accounrt updated successfully:");
        // Update the Redux store with the new vendor data
        dispatch(setVendor(data)); // Assuming your API returns the updated vendor data
      
      }
    } 
  
     catch (error) {
      console.log('Error updating account:', error);
      
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
    <div className="px-6 md:px-40 mt-6">
      {/* Top Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <hr className="border-t border-gray-200 mb-6" />

      {/* Layout: Sidebar and Main */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-[220px] h-100 bg-emerald-950 text-white p-4 rounded-2xl">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path; // Check active link
            return (
              <div
                key={idx}
                onClick={() => navigate(item.path)}
                className={`py-2 px-4 mb-1 text-sm font-medium rounded cursor-pointer transition-all
                  ${isActive ? 'bg-pink-700 text-white' : 'hover:bg-pink-700 hover:text-white'}`}
              >
                {item.label}
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-4 space-y-6">
          <h2 className="text-2xl font-bold mb-4">Edit Account Details</h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <label className="w-full sm:w-[150px] font-semibold">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full sm:w-[80%] border p-2 rounded"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <label className="w-full sm:w-[150px] font-semibold">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full sm:w-[80%] border p-2 rounded"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <label className="w-full sm:w-[150px] font-semibold">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full sm:w-[80%] border p-2 rounded"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <label className="w-full sm:w-[150px] font-semibold">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full sm:w-[80%] border p-2 rounded"
                  required
                />
              </div>

            {/* Password Change Section */}
            <div className="mt-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <label className="w-full sm:w-[150px] font-semibold">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full sm:w-[80%] border p-2 rounded bg-blue-50"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <label className="w-full sm:w-[150px] font-semibold">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full sm:w-[80%] border p-2 rounded"
                  placeholder="Leave blank to keep current password"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <label className="w-full sm:w-[150px] font-semibold">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full sm:w-[80%] border p-2 rounded"
                  placeholder="Re-enter new password"
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="mt-4 mb-10 bg-emerald-700 hover:bg-emerald-900 text-white px-6 py-2 rounded"
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
