// app/routes/login.jsx
import { signInWithPopup } from 'firebase/auth';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

import { useNavigate } from '@remix-run/react';
import { firebase_app } from '~/tool/firebase-config';

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    if (typeof window !== 'object') return 
    
    try {
      if (typeof window !== "undefined") {
        const { getAuth, signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");

        const auth = getAuth(firebase_app); // Initialize auth on the client-side
        const googleProvider = new GoogleAuthProvider();
  
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
  
        // Redirect to another page after successful login
        navigate('/dashboard');
      }

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Login with Google
      </button>
    </div>
  );
}
