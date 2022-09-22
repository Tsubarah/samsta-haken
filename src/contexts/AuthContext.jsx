import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { setDoc, getDoc, doc, writeBatch } from "firebase/firestore";
import BeatLoader from "react-spinners/BeatLoader";
import { getLocationWithAddress } from "../services/googleAPI";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loginSwipe, setLoginSwipe] = useState(false);
  const [loading, setLoading] = useState(false);

  const signup = async (email, password) => {
    // create the user
    await createUserWithEmailAndPassword(auth, email, password);

    // reload user
    await reloadUser();

    // create user document to db
    const docRef = doc(db, "users", auth.currentUser.uid);

    await setDoc(docRef, {
      email,
      admin: false,
    });
  };

  const login = async (email, password) => {
    // login user
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateAdmin = async (userId) => {
    //get batch
    const batch = writeBatch(db);

    //get user ref
    const userRef = doc(db, "users", userId);

    //get docsnap
    const userSnap = await getDoc(userRef);
    
    //get the value for admin
    const userAdmin = userSnap._document.data.value.mapValue.fields.admin.booleanValue;

    //update admin value
    batch.update(userRef, { admin: !userAdmin });

    //commit update
    await batch.commit();
    
  };

  const reloadUser = async () => {
    await auth.currentUser.reload();
    setCurrentUser(auth.currentUser);
    setUserEmail(auth.currentUser.email);
    return true;
  };

  useEffect(() => {
    // listen for auth-state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUserEmail(user?.email);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Location functions

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const handleSearch = async (address) => {
    const addressResponse = await getLocationWithAddress(address);

    setLocation(addressResponse.results[0].geometry.location);
    setAddress(addressResponse.results[0].formatted_address);
  };

  // Show and hide
  const [showTips, setShowTips] = useState(false);
	const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  const contextValues = {
    currentUser,
    signup,
    login,
    logout,
    reloadUser,
    setLoginSwipe,
    loginSwipe,
    handleSearch,
    location,
    setLocation,
    address,
    setAddress,
    showTips,
    setShowTips,
    updateAdmin,
		drawerIsOpen,
		setDrawerIsOpen
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {loading ? (
        <div id="initial-loader">
          <BeatLoader color={"#888"} size={50} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider as default, useAuthContext };
