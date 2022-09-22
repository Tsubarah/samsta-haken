import { useEffect, useState } from "react";
import { collection } from "firebase/firestore";
import { db } from "../firebase/index";

const useGetCollection = (col) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const ref = collection(db, col);

		const unsubscribe = onSnapshot(ref, (snapshot) => {
			const docs = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});

			setData(docs);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	return {
		data,
		loading,
	};
};

export default useGetCollection;
