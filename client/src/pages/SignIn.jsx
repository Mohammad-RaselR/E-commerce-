import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Components/AuthForm.css';
import OAuth from '../components/OAuth';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { app } from '../firebase'; // make sure your firebase config is correctly imported

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleForgotPassword = async () => {
    const auth = getAuth(app);
    const email = formData.email;
  
    if (!email) {
      setError('Please enter your email first.');
      return;
    }
  
    try {
      await sendPasswordResetEmail(auth, email);
      setError('Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error(error);
      setError('Failed to send reset email. Please check the email address.');
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setError(null);
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h1>UdaoMart</h1>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          id="email"
          onChange={handleChange}
        />

        <label>Password</label>
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="**********"
            id="password"
            onChange={handleChange}
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          ></span>
        </div>

        <div className="options-row">
          <label className="checkbox-label">
            <input type="checkbox" />
            keep me signed in
          </label>
          <button type="button" className="forgot-password" onClick={handleForgotPassword}>
  Forgot password?
</button>

        </div>

        <button className="primary-button" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign in'}
        </button>

        <div className="third-party-buttons">
          <OAuth />
          <button className="third-party-btn">
            <img
              src="https://img.icons8.com/color/24/000000/facebook-new.png"
              alt="Facebook"
            />
            FaceBook
          </button>
        </div>

        <p className="switch-link">
          <Link to="/sign-up">New Customer? Create Account</Link>
        </p>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}
