import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/index";

const useGetCollection = (col) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    // Get reference to collection 'users'
    const ref = collection(db, col);
    const snapshot = await getDocs(ref);

    const docs = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setData(docs);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading,
    getData,
  };
};

export default useGetCollection;
