
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function EditAccount() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: 'Shahwwwwwwwwwwwwwdat',
    lastName: 'Hossain',
    email: '213002086@student.green.ed',
    currentPassword: '********',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Initialize form with user data if available
  useEffect(() => {
    if (currentUser) {
      // Split name into first and last name if needed
      const fullName = currentUser.username || '';
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      setFormData({
        firstName,
        lastName,
        email: currentUser.email || '',
        currentPassword: '********', // Placeholder for UI
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [currentUser]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear any previous error messages when user makes changes
    if (error) setError(null);
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Validate passwords match if changing password
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      // Prepare data for API request
      const updateData = {
        username: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email
      };
      
      // Only include password if the user is changing it
      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }
      
      // Make API call to update user
      const response = await fetch('/api/vendor/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
        credentials: 'include' // Include cookies for authentication
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update account');
      }
      
      // Update Redux state with new user data
      dispatch({
        type: 'UPDATE_USER_SUCCESS',
        payload: data
      });
      
      // Show success message
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      setError(err.message || 'Something went wrong updating your account');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle navigation for sidebar items
  const handleNavigation = (label) => {
    switch(label) {
      case 'Dashboard':
        navigate('/dashboard');
        break;
      case 'Products':
        navigate('/products');
        break;
      case 'Order':
        navigate('/dashboard-orders');
        break;
      case 'Withdraw':
        navigate('/dashboard-withdraw');
        break;
      case 'Store':
        navigate('/store');
        break;
      case 'Store List':
        navigate('/store-list');
        break;
      case 'Logout':
        // Call logout API and clear user state
        fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include'
        })
          .then(() => {
            dispatch({ type: 'USER_LOGOUT' });
            navigate('/');
          })
          .catch(err => console.error('Logout failed:', err));
        break;
      default:
        // Do nothing for active item
        break;
    }
  };

  return (
    <div className="px-40 p-6">
      {/* Top Title */}
      <h1 className="text-4xl font-bold text-center mb-6">Dashboard</h1>

      {/* Layout: Sidebar and Main */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Sidebar */}
        <div className="w-[220px] h-120 rounded-2xl bg-emerald-950 text-white p-4">
          {[
            { label: "Dashboard" },
            { label: "Products" },
            { label: "Order" },
            { label: "Withdraw" },
            { label: "Store" },
            { label: "Store List" },
            { label: "Edit Account", active: true },
            { label: "Logout" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`py-2 px-4 mb-1 text-sm font-medium rounded cursor-pointer transition-all ${
                item.active
                  ? "bg-pink-700 text-white"
                  : "hover:bg-pink-700 hover:text-white"
              }`}
              onClick={() => !item.active && handleNavigation(item.label)}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="col-span-1 md:col-span-4 space-y-6 ml-20">
          <h2 className="text-2xl font-bold mb-4">Edit Account Details</h2>
          
          {/* Error and Success Messages */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Your account has been updated successfully!
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="w-50 font-semibold">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-80 border p-2 rounded"
                  required
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-50 font-semibold">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-80 border p-2 rounded"
                  required
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-50 font-semibold">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-80 border p-2 rounded"
                  required
                />
              </div>
            </div>

            {/* Password Change Section */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-4">
                <label className="w-50 font-semibold">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-80 border p-2 rounded bg-blue-50"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-50 font-semibold">
                  New Password
                </label>
                <input 
                  type="password" 
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-80 border p-2 rounded" 
                  placeholder="Leave blank to keep current password"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="w-50 font-semibold">Confirm New Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-80 border p-2 rounded" 
                  placeholder="Re-enter new password"
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
