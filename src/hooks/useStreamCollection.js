import { useEffect, useState } from 'react'
import { collection, query, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const useStreamCollection = (col, ...queryContraints) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // get reference to collection
    const colRef = collection(db, col)
    // const queryRef = query(colRef, ...queryContraints)

    // subscribe to changes in collection
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      // received a snapshot
      const docs = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })

      setData(docs)
      setLoading(false)
    })

    return unsubscribe
  }, [])
  return {
    data,
    loading,
  }
}

export default useStreamCollection