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

	const { filterType, currentCity, searchedCity, searchParams } =
		useAuthContext();

	const city = searchParams.get("city");

	useEffect(() => {
		// get reference to collection
		const colRef = collection(db, col);
		let queryRef;

		if (city && filterType === null) {
			console.log("city & filterType = null");
			queryRef = isAdmin
				? query(colRef, where("city", "==", city))
				: query(
						colRef,
						where("accepted", "==", true),
						where("city", "==", city)
				  );
		} else if (filterType !== null && city) {
			console.log("FilterType != null & city");
			queryRef = isAdmin
				? query(
						colRef,
						where(filterType.type, "==", filterType.value),
						where("city", "==", city)
				  )
				: query(
						colRef,
						where(filterType.type, "==", filterType.value),
						where("accepted", "==", true),
						where("city", "==", city)
				  );
		} else if (filterType && !city) {
			console.log("filterType BARA");
			queryRef = isAdmin
				? query(colRef, where(filterType.type, "==", filterType.value))
				: query(
						colRef,
						where(filterType.type, "==", filterType.value),
						where("accepted", "==", true)
				  );
		} else {
			console.log("INGEN STAD");
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
