import { useEffect, useState } from 'react'
import { collection, query, onSnapshot, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuthContext } from '../contexts/AuthContext'

const useStreamCollection = (col) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const { filterType } = useAuthContext()
  
  useEffect(() => {
    // get reference to collection
    const colRef = collection(db, col)

    //create query ref
    const queryRef = filterType
      ? query(colRef, where("cuisine", "==", filterType))
      : query(colRef, orderBy("name", "desc"));


    // subscribe to changes in collection
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {

      const docs = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })

      //save the data
      setData(docs)
      setLoading(false)

    })

    return unsubscribe
  }, [filterType])

  return {
    data,
    loading,
  }
}

export default useStreamCollection