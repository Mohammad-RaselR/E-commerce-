import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase'; // Ensure `app` is initialized correctly
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice'; // Ensure this exists and is correctly exported
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log('Google sign-in response:', data); // Debugging line
      
        dispatch(signInSuccess(data));
        navigate('/'); // Redirect to the home page (or another page you want)
      
       
    } catch (error) {
      console.log('Could not sign in with Google:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="third-party-btn"
    >
      Continue with Google
    </button>
  );
}



