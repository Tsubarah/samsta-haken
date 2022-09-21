import { createContext, useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db, storage } from '../firebase'
import BeatLoader from 'react-spinners/BeatLoader'
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext()

const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [loginSwipe, setLoginSwipe] = useState(false)
  const [loading, setLoading] = useState(false)

  const signup = async (email, password) => {
    // create the user
    await createUserWithEmailAndPassword(auth, email, password);

    // reload user
    await reloadUser();

    // create user document
    const docRef = doc(db, "users", auth.currentUser.uid); 

    await setDoc(docRef, {
      email,
      admin: false
    });
  }

  const login = async (email, password) => {
    // login user
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth);
  };

  const reloadUser = async () => {
    await auth.currentUser.reload()
    setCurrentUser(auth.currentUser)
    setUserEmail(auth.currentUser.email)
    return true
  }

  useEffect(() => {
		// listen for auth-state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user)
			setUserEmail(user?.email)
			setLoading(false)
		})

		return unsubscribe
	}, [])

  const contextValues = {
    currentUser,
    signup,
    login,
    logout,
    reloadUser,
    setLoginSwipe,
    loginSwipe,
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {loading ? (
        <div id="initial-loader">
          <BeatLoader color={'#888'} size={50} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}


export {
  AuthContextProvider as default,
  useAuthContext,
}