import React, { useState } from 'react';
import '../Components/AuthForm.css';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase'; // Adjust the import based on your project structure
import {  useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth'; // Adjust the import based on your project structure
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('customer'); // Default to customer role
  const [shopName, setShopName] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate= useNavigate(); 
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      email,
      password,
      role,
      shopName,
      shopDescription
    };

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('User created successfully:', data);
        navigate('/sign-in'); 
        
      } else {
        console.error('Signup failed:', data);
        
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: result.user.email,
          name: result.user.displayName,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log('Google sign-in response:', data);

      if (res.ok) {
        // Handle success (e.g., store JWT token, redirect)
      } else {
        console.error('Google authentication failed:', data);
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div className="auth-container">
      <h1>UdaoMart</h1>

      <p className="signup-instruction">Sign up with...</p>
      <div className="third-party-buttons">
        <OAuth />
        
          
        
      
        <button className="third-party-btn">
          <img
            src="https://img.icons8.com/color/24/000000/facebook-new.png"
            alt="Facebook"
          />
          Facebook
        </button>
      </div>

      <p className="signup-instruction">Or sign up using email address</p>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />

        <label>Password</label>
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="**********"
            required
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          ></span>
        </div>

        <label>Mobile Number</label>
       

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="role"
              value="customer"
              checked={role === 'customer'}
              onChange={handleRoleChange}
            />
            I am a customer
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="vendor"
              checked={role === 'vendor'}
              onChange={handleRoleChange}
            />
            I am a vendor
          </label>
        </div>

        {role === 'vendor' && (
          <div>
            <label>Shop Name</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="Enter your shop name"
            />

            <label>Shop Description</label>
            <textarea className='shop-description'
              value={shopDescription}
              onChange={(e) => setShopDescription(e.target.value)}
              placeholder="Describe your shop"
            />
          </div>
        )}

        <button className="primary-button" type="submit">
          Register
        </button>
      </form>

      <p className="switch-link">
        <a href="/sign-in">Already a member? Sign in</a>
      </p>
    </div>
  );
}
