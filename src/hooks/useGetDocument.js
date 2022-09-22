import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const useGetDocument = (col, id) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const ref = doc(db, col, id);

	useEffect(() => {
		const unsubscribe = onSnapshot(ref, (snapshot) => {
			if (!snapshot.exists()) {
				setData(false);
				setLoading(false);
				return;
			}

			setData({ id: snapshot.id, ...snapshot.data() });
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	return {
		data,
		loading,
	};
};

export default useGetDocument;
