import { createContext, useContext, useState, useEffect } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import BeatLoader from "react-spinners/BeatLoader";
import { getLocationWithAddress } from "../services/googleAPI";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { findCity } from "../utils/helpers";

const AuthContext = createContext();

const useAuthContext = () => {
	return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [userEmail, setUserEmail] = useState(null);
	const [userName, setUserName] = useState(null);
	const [userImageUrl, setUserImageUrl] = useState(null);
	const [loginSwipe, setLoginSwipe] = useState(false);
	const [loading, setLoading] = useState(true);
	const [isAdmin, setIsAdmin] = useState(null);

	const signup = async (email, password, name, image) => {
		// create the user
		await createUserWithEmailAndPassword(auth, email, password);

		// set name and image
		await setDisplayNameAndPhoto(name, image);

		// reload user
		await reloadUser();

		// create user document to db
		const docRef = doc(db, "users", auth.currentUser.uid);

		await setDoc(docRef, {
			name,
			email,
			imageURL: auth.currentUser.photoURL,
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

	const setDisplayNameAndPhoto = async (displayName, image) => {
		let imageURL = auth.currentUser.photoURL;

		if (image) {
			// create a reference to upload the file to
			const fileRef = ref(
				storage,
				`users/${auth.currentUser.email}/${image.name}`
			);

			// upload image to fileRef
			const uploadResult = await uploadBytes(fileRef, image);

			// get download url to uploaded file
			imageURL = await getDownloadURL(uploadResult.ref);

			console.log("Image uploaded successfully. Download url is", imageURL);
		}

		return updateProfile(auth.currentUser, {
			displayName,
			photoURL: imageURL,
		});
	};

	const updateAdmin = async (userId, user) => {
		await updateDoc(doc(db, "users", userId), {
			admin: !user.admin,
		});
	};

	const updateRestaurantStatus = async (restaurantId, restaurant) => {
		await updateDoc(doc(db, "restaurants", restaurantId), {
			accepted: !restaurant.accepted,
		});
	};

	const reloadUser = async () => {
		await auth.currentUser.reload();
		setCurrentUser(auth.currentUser);
		setUserName(auth.currentUser.displayName);
		setUserEmail(auth.currentUser.email);
		setUserImageUrl(auth.currentUser.photoURL);
		return true;
	};

	useEffect(() => {
		// listen for auth-state changes
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setCurrentUser(user);

			if (user) {
				const ref = doc(db, "users", user.uid);
				const snapshot = await getDoc(ref);

				setIsAdmin(snapshot.data().admin);

				setUserEmail(user.email);
			}
			setLoading(false);
			setUserImageUrl(user?.photoURL);
		});

		return unsubscribe;
	}, []);

	// Location functions

	const [location, setLocation] = useState(null);
	const [address, setAddress] = useState(null);
	const [searchedCity, setSearchedCity] = useState(null);

	//* City borde vara global då den måste skickas till MAP

	const handleSearch = async (address) => {
		const addressResponse = await getLocationWithAddress(address);

		console.log(addressResponse);

		const city = findCity(addressResponse);
		// console.log("SEARCHED CITY", city);
		// setSearchedCity(city)

		setLocation(addressResponse.results[0].geometry.location);
		setAddress(addressResponse.results[0].formatted_address);
	};

	// Show and hide
	const [showTips, setShowTips] = useState(false);
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

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
		// searchedCity,
		showTips,
		setShowTips,
		updateAdmin,
		drawerIsOpen,
		setDrawerIsOpen,
		isAdmin,
		updateRestaurantStatus,
		userName,
		userImageUrl,
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
