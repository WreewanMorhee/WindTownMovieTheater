import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const useCheckGoogleLogin = () => {
    const [my_user, setUser] = useState(null);
    const auth = getAuth();
  
    // Check if a user is already signed in when the app loads
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, save user information in the state
          setUser(user);
        } else {
          // No user is signed in
          setUser(null);
        }
      });
  
      // Clean up the subscription on unmount
      return () => unsubscribe();
    }, [auth]);

    // console.warn(my_user, 'hallo')
    return null
}