import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }
    const userProfileUpdate = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    }
    const googleCreateUser = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('User', currentUser);
            /* jwt setup start */
            if (currentUser) {
                axios.post('https://bistro-boss-server-bn9kits5n-prodeveloperbd2.vercel.app/jwt', { email: currentUser.email })
                    .then(data => {
                        localStorage.setItem('user-token', data.data.token);
                        setLoading(false);
                    })
            }
            else {
                localStorage.removeItem('user-token')
            }
            /* jwt setup end */
        })
        return () => {
            return unsubscribe();
        }
    }, [])
    const authInfo = { user, loading, createUser, signInUser, logOutUser, userProfileUpdate, googleCreateUser }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;