import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const useGetDocument = (col, id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    // get reference to document in collection col
    const ref = doc(db, col, id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      setData(false);
      setLoading(false);
      return;
    }

    setData(snapshot.data());
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

export default useGetDocument;
