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
			const dbRef = doc(db, "restaurants", restaurant.id);

			await deleteDoc(dbRef);

			if (restaurant.photos.length) {
				restaurant.photos.forEach(async (photo) => {
					const storageRef = ref(
						storage,
						`restaurants/${restaurant.name}/${photo.name}`
					);

					await deleteObject(storageRef);
				});
			}
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
