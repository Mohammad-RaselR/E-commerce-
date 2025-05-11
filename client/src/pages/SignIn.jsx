import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import OAuth from '../components/OAuth';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from '../firebase';
// import { setVendor } from '../redux/vendor/vendorSlice';
import { setVendor } from '../redux/vendor/vendorSlice';
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleForgotPassword = async () => {
    const auth = getAuth(app);
    if (!formData.email) {
      setError('Please enter your email first.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, formData.email);
      setError('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setError('Failed to send reset email.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get the selected user type (customer or vendor)
    const userType = e.target.elements.userType.value;
  

    try {
      
      // Determine the API URL based on userType
      const apiUrl = userType === 'vendor' ? '/api/vendor/vendor-login' : '/api/auth/signin';

      // Send the appropriate request based on the user type
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      

      const data = await res.json();
      console.log("data",data)
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      
    //  console.log("fffffffffff ",data);

      setError(null);
      setLoading(false);
      
      if (userType === 'vendor') {
        
        // Store vendor data in Redux store
        dispatch(setVendor(data));
        
        
    // console.log("vendorId",useSelector((state) => state.vendor._id))
        // Generate a JWT token for the vendor
        navigate('/vendor/edit');
        
       
      } else {
        navigate('/');
      }
      
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-white">
      <div className="flex justify-center mb-6">
        <h1 className="text-4xl font-bold text-center">
          UdaoMart
          <span className="inline-block w-2 h-2 bg-red-500 ml-1 rounded-full"></span>
        </h1>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-full max-w-md p-8 border rounded-lg shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mt-1 p-2 border rounded bg-blue-50"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full p-2 border rounded bg-blue-50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center text-sm text-gray-700">
                <input type="checkbox" className="mr-2 accent-indigo-600" />
                Keep me signed in
              </label>
              <button
                type="button"
                className="text-sm font-semibold text-black hover:underline"
                onClick={handleForgotPassword}
              >
                Forgot password?
              </button>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">User Type</label>
              <label className="flex items-center">
                <input type="radio" name="userType" value="customer" className="mr-2" defaultChecked />
                I am customer
              </label>
              <label className="flex items-center">
                <input type="radio" name="userType" value="vendor" className="mr-2" />
                I am vendor
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-bold py-2 rounded mt-4"
            >
              {loading ? 'Signing In...' : 'Sign in'}
            </button>

            <div className="mt-6 text-center">
              <div className="flex justify-center gap-4">
                <OAuth />
                <button className="flex items-center gap-2 border rounded-full px-5 py-2 bg-white shadow hover:shadow-md">
                  <img
                    src="https://www.svgrepo.com/show/448224/facebook.svg"
                    alt="Facebook"
                    className="w-5 h-5"
                  />
                  <span className="text-blue-600 font-medium">Facebook</span>
                </button>
              </div>
            </div>

            <p className="text-center mt-4 text-sm">
              <span
                onClick={() => navigate('/sign-up')}
                className="font-semibold text-black hover:underline cursor-pointer"
              >
                New Customer? Create account
              </span>
            </p>

            {error && <p className="text-center text-sm text-red-600 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
