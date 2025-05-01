import React, { useState } from 'react';
import '../Components/AuthForm.css';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { getAuth, signInWithPopup, sendPasswordResetEmail, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('customer');
  const [shopName, setShopName] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate(); 

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Password Validation Function
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!minLength) {
      return "Password must be at least 8 characters.";
    }
    if (!hasUpperCase || !hasLowerCase) {
      return "Password must contain both uppercase and lowercase letters.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }

    return ""; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordError = validatePassword(password);
    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }

    try {
      const auth = getAuth(app);
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      setSuccessMessage('Registration successful! Please check your email to verify your account.');

      // After registration and sending the verification email, you can redirect or wait for the user to verify
      setTimeout(() => {
        navigate('/sign-in'); // Redirect to sign-in page after success
      }, 3000); // Wait for 3 seconds before redirecting

    } catch (error) {
      setError(error.message);
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
        <button className="third-party-btn" onClick={handleGoogleClick}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Google
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
        {passwordError && <p className="error-text">{passwordError}</p>}

        <label>Mobile Number</label>
        <input
          type="tel"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter your mobile number"
          required
        />

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
            <textarea
              className="shop-description"
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

      

      {error && <p className="error-text">{error}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}
    </div>
  );
}
