import { useState } from "react";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";

const useDeleteImage = () => {
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteImage = async (image) => {
		setError(null);
		setIsError(false);
		setIsDeleting(true);

		try {
			const storageRef = ref(
				storage,
				`restaurants/${image.restaurant}/${image.name}`
			);

			await deleteObject(storageRef);

			const dbRef = doc(db, "image-requests", image.id);

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
		deleteImage,
	};
};

export default useDeleteImage;
