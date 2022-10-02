import { useState } from "react";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";

const useDeleteImage = () => {
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteImage = async (image, restaurant) => {
		setError(null);
		setIsError(false);
		setIsDeleting(true);

		try {
			const storageRef = ref(
				storage,
				`restaurants/${restaurant.name}/${image.name}`
			);

			await deleteObject(storageRef);

			const dbRef = doc(db, "restaurants", restaurant.id);

			await updateDoc(dbRef, {
				photos: arrayRemove({
					accepted: image.accepted,
					name: image.name,
					type: image.type,
					size: image.size,
					path: image.path,
					uploaded_by_user: image.uploaded_by_user,
					restaurant: image.restaurant,
					url: image.url,
				}),
			});
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
		deleteImage,
	};
};

export default useDeleteImage;
