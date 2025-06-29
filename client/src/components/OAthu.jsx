import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase/firebaseConfig'; // Assuming you have already initialized Firebase in this file
import { signInSuccess } from '../redux/user/userSlice';

const OAthu = () => {
    const auth = getAuth(app); // Initialize Firebase Auth
    const dispatch = useDispatch(); // Initialize Redux dispatch
    const navigate = useNavigate(); // Initialize React Router's navigate function

    // Handle Google Sign-In
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' }); // Optional: forces account selection

        try {
            // Sign in with Google via Firebase
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            
            // Sending user data to your backend API for further processing (if needed)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            });

            const data = await res.json();
            
            // If the request is successful, dispatch a Redux action and navigate
            if (res.ok) {
                dispatch(signInSuccess(data)); // Update the Redux store with user info
                navigate('/'); // Redirect user to the home page
            }
        } catch (error) {
            console.error('Error during Google Sign-In: ', error); // Log any errors
        }
    };

    return (
        <>
            <Button 
                type="button" 
                gradientDuoTone="pinkToOrange" 
                outline 
                onClick={handleGoogleClick} // Call Google sign-in when button is clicked
            >
                <AiFillGoogleCircle className="w-6 h-6 mr-2" />
                Continue with Google
            </Button>
        </>
    );
}

export default OAthu;
