import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <h1>UdaoMart</h1>

      <div className="tab-switcher">
        <button
          className={`tab ${activeTab === 'signin' ? 'active' : ''}`}
          onClick={() => setActiveTab('signin')}
        >
          Sign in
        </button>
        <button
          className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => setActiveTab('signup')}
        >
          Create Account
        </button>
      </div>

      {activeTab === 'signin' ? (
        <>
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
            <a href="#" onClick={() => setActiveTab('signup')}>
              New Customer? Create Account
            </a>
          </p>
        </>
      ) : (
        <>
          <p className="signup-instruction">Sign up with...</p>
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

          <p className="signup-instruction">Or sign up using email address</p>

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <div className="password-field">
            <input type={showPassword ? 'text' : 'password'} placeholder="**********" />
            <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}></span>
          </div>

          <div className="radio-group">
            <label>
              <input type="radio" name="role" defaultChecked /> I am customer
            </label>
            <label>
              <input type="radio" name="role" /> I am vendor
            </label>
          </div>

          <p className="privacy-text">
            Your personal data will be used to support your experience throughout this website,
            to manage access to your account, and for other purposes described in our{' '}
            <a href="#">Privacy policy</a>.
          </p>

          <button className="primary-button">Register</button>

          <p className="switch-link">
            <a href="#" onClick={() => setActiveTab('signin')}>
              Already a member? Sign in
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthForm;
