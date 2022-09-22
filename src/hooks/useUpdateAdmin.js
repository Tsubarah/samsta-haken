import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { updateMetadata } from "@firebase/storage";

const useUpdateAdmin = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateData = async () => {
    setLoading(true);

    const ref = doc(db, "users", id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      setData(false);
      setLoading(false);
      return;
    }

    setData(snapshot.data());
    snapshot.data().updateDoc()
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading,
    updateData,
  };
};

export default useUpdateAdmin;
