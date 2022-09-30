import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase/index";

const useGetFilteredCollection = (col, title, value) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = collection(db, col);
    const q = query(ref, where(title, "==", value))

    const unsubscribe = onSnapshot(q, (snapshot) => {
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

export default useGetFilteredCollection;
