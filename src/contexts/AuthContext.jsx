import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import {
	setDoc,
	doc,
	updateDoc,
	getDoc,
	arrayUnion,
	deleteDoc,
} from "firebase/firestore";
import BeatLoader from "react-spinners/BeatLoader";
import { getLocationWithAddress } from "../services/googleAPI";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { findSearchedCity } from "../utils/helpers";

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
	const [restaurantData, setRestaurantData] = useState(null);

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
		setIsAdmin(false);
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

			console.log(
				"Image uploaded successfully. Download url is",
				imageURL
			);
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

	const updateRestaurantPhoto = async (photo) => {
		const ref = doc(db, "restaurants", photo.restaurantId);

		await updateDoc(ref, {
			photos: arrayUnion({
				accepted: true,
				name: photo.name,
				type: photo.type,
				size: photo.size,
				path: photo.path,
				uploaded_by_user: photo.uploaded_by_user,
				restaurant: photo.restaurant,
				url: photo.url,
			}),
		});

		await deleteDoc(doc(db, "image-requests", photo.id));
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

	const [address, setAddress] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();


	const handleSearch = async (address) => {
		const addressResponse = await getLocationWithAddress(address);

		const city = findSearchedCity(addressResponse);
		const lat = addressResponse.results[0].geometry.location.lat;
		const lng = addressResponse.results[0].geometry.location.lng;

		setSearchParams({ city: city, lat: lat, lng: lng });
		setAddress(addressResponse.results[0].formatted_address);
	};

	// Show and hide
	const [showTips, setShowTips] = useState(false);
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const [showRestaurantCard, setShowRestaurantCard] = useState(false);
	const [filterType, setFilterType] = useState(null);

	const contextValues = {
		currentUser,
		signup,
		login,
		logout,
		reloadUser,
		setLoginSwipe,
		loginSwipe,
		handleSearch,
		address,
		setAddress,
		showTips,
		searchParams,
		setSearchParams,
		setShowTips,
		updateAdmin,
		drawerIsOpen,
		setDrawerIsOpen,
		isAdmin,
		updateRestaurantStatus,
		updateRestaurantPhoto,
		userName,
		userImageUrl,
		setRestaurantData,
		restaurantData,
		setShowRestaurantCard,
		showRestaurantCard,
		filterType,
		setFilterType,
	};

	return (
		<AuthContext.Provider value={contextValues}>
			{loading ? (
				<div id="initial-loader" className="flex align-middle justify-center">
					<BeatLoader color={"#888"} size={50} />
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	);
};

export { AuthContextProvider as default, useAuthContext };
