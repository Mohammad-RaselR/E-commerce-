import React, { useState } from 'react';
import '../Components/AuthForm.css';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <h1>UdaoMart</h1>

      <label>Email</label>
      <input type="email" placeholder="Enter your email" />

      <label>Password</label>
      <div className="password-field">
        <input type={showPassword ? 'text' : 'password'} placeholder="**********" />
        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}></span>
      </div>

      <div className="options-row">
        <label className="checkbox-label">
          <input type="checkbox" />
          keep me signed in
        </label>
        <a href="#" className="forgot-password">Forgot password?</a>
      </div>

      <button className="primary-button">Sign in</button>

      <div className="third-party-buttons">
        <button className="third-party-btn">
          <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
          Google
        </button>
        <button className="third-party-btn">
          <img src="https://img.icons8.com/color/24/000000/facebook-new.png" alt="Facebook" />
          FaceBook
        </button>
      </div>

      <p className="switch-link">
        <a href="/signup">New Customer? Create Account</a>
      </p>
    </div>
  );
};


