import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useAuthContext } from "../contexts/AuthContext";
import { db, storage } from "../firebase";
import { getFileExtension } from "../utils/helpers";
import uuid from "react-uuid";

const useUploadImage = () => {
	const [error, setError] = useState(null);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(null);

	const { currentUser, isAdmin } = useAuthContext();

	const uploadImage = async (image, restaurant) => {
		setError(null);
		setIsError(null);
		setIsSuccess(false);
		setUploadProgress(null);

		try {
			const uniqueId = uuid();

			// construct reference to storage
			const storageRef = ref(
				storage,
				`restaurants/${restaurant.name}/${uniqueId + getFileExtension(image)}`
			);

			// start upload of image
			const uploadTask = uploadBytesResumable(storageRef, image);

			// attach upload observer
			uploadTask.on("state_changed", (uploadTaskSnapshot) => {
				// update progress
				setUploadProgress(
					Math.round(
						(uploadTaskSnapshot.bytesTransferred /
							uploadTaskSnapshot.totalBytes) *
							1000
					) / 10
				);
			});

			// wait for upload to be complete
			await uploadTask.then();

			// get download url to uploaded image
			const url = await getDownloadURL(storageRef);

			const uploadRef = doc(db, "restaurants", restaurant.id);

			if (!isAdmin) {
				// create document in db for the uploaded image
				await updateDoc(uploadRef, {
					photos: arrayUnion({
						accepted: false,
						// This will prevent the user from adding docs with the same filename
						name: uniqueId + getFileExtension(image),
						type: image.type,
						size: image.size,
						path: storageRef.fullPath,
						uploaded_by_user: currentUser.displayName,
						restaurant: restaurant.name,
						url: url,
					}),
				});
			} else {
				// create document in db for the uploaded image
				await updateDoc(uploadRef, {
					photos: arrayUnion({
						accepted: true,
						// This will prevent the user from adding docs with the same filename
						name: uniqueId + getFileExtension(image),
						type: image.type,
						size: image.size,
						path: storageRef.fullPath,
						uploaded_by_user: currentUser.displayName,
						restaurant: restaurant.name,
						url: url,
					}),
				});
			}

			setIsSuccess(true);
			setUploadProgress(null);
		} catch (e) {
			setError(e);
			setIsError(true);
		} finally {
			setUploadProgress(null);
		}
	};

	return {
		error,
		isError,
		isSuccess,
		uploadProgress,
		uploadImage,
	};
};

export default useUploadImage;
