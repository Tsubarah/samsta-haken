import { useEffect, useState } from "react";
import {
	collection,
	query,
	onSnapshot,
	where,
	orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const useStreamCollection = (col, isAdmin) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const { filterType, currentCity, searchedCity } = useAuthContext();

	useEffect(() => {
		// get reference to collection
		const colRef = collection(db, col);
		let queryRef;

		if ((searchedCity || currentCity) && filterType === null) {
			queryRef = isAdmin
				? query(colRef, where("city", "==", searchedCity || currentCity))
				: query(
						colRef,
						where("accepted", "==", true),
						where("city", "==", searchedCity || currentCity)
				  );
		} else if (filterType !== null && (currentCity || searchedCity)) {
			queryRef = isAdmin
				? query(
						colRef,
						where(filterType.type, "==", filterType.value),
						where("city", "==", searchedCity || currentCity)
				  )
				: query(
						colRef,
						where(filterType.type, "==", filterType.value),
						where("accepted", "==", true),
						where("city", "==", searchedCity || currentCity)
				  );
		} else if (filterType) {
			queryRef = isAdmin
				? query(colRef, where(filterType.type, "==", filterType.value))
				: query(
						colRef,
						where(filterType.type, "==", filterType.value),
						where("accepted", "==", true)
				  );
		} else {
			queryRef = isAdmin
				? query(colRef)
				: query(colRef, where("accepted", "==", true));
		}

		// subscribe to changes in collection
		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			const docs = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});

			//save the data
			setData(docs);
			setLoading(false);
		});

		return unsubscribe;
	}, [filterType, searchedCity, currentCity]);

	return {
		data,
		loading,
	};
};

export default useStreamCollection;
