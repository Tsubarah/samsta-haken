import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";

const useDeleteRestaurant = () => {
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteRestaurant = async (restaurant) => {
		setError(null);
		setIsError(false);
		setIsDeleting(true);

		try {
			// const storageRef = ref(
			// 	storage,
			// 	`restaurants/${image.restaurant}/${image.name}`
			// );

			// await deleteObject(storageRef);

			const dbRef = doc(db, "restaurants", restaurant.id);

			await deleteDoc(dbRef);
		} catch (e) {
			console.log(e);
			setIsError(true);
			setError(e);
		} finally {
			setIsDeleting(false);
		}
	};

	return {
		error,
		isError,
		isDeleting,
		deleteRestaurant,
	};
};

export default useDeleteRestaurant;
