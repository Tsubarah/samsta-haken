import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { useAuthContext } from '../contexts/AuthContext'
import { db, storage } from '../firebase'
import uuid from 'react-uuid'


const useUploadImage = () => {
  const [error, setError] = useState(null)
  const [isError, setIsError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(null)
  const [isUploading, setIsUploading] = useState(null)
  const [progress, setProgress] = useState(null)
  
  const { currentUser } = useAuthContext()

  const fileExtension = (image) => {
    const fileName = image.name
    const extension = fileName.substr(fileName.lastIndexOf('.'))

    return extension
  }
  
  const upload = async (image) => {
    setError(null)
    setIsError(null)
    setIsSuccess(null)
    setIsUploading(null)

    try {

      const uniqueId = uuid()
      
      // construct reference to storage
      const storageRef = ref(storage, `Users/${currentUser.uid}/${uniqueId + fileExtension(image)}`)

      // start upload of image
      const uploadTask = uploadBytesResumable(storageRef, image)

      // attach upload observer
      uploadTask.on('state_changed', (uploadTaskSnapshot) => {
        // update progress
        setProgress(
          Math.round(
            (uploadTaskSnapshot.bytesTransferred / uploadTaskSnapshot.totalBytes) * 1000
          ) / 10
        )
      })

      // wait for upload to be complete
      await uploadTask.then()

      // get download url to uploaded image
      const url = await getDownloadURL(storageRef)

      // create reference to db collection 'images'
      const collectionRef = collection(db, 'images')

      // create document in db for the uploaded image
      await addDoc(collectionRef, {
        created: serverTimestamp(),
        // This will prevent the user from adding docs with the same filename
        name: uniqueId + fileExtension(image),
        type: image.type,
        size: image.size,
        path: `images/${currentUser.uid}/${uniqueId + fileExtension(image)}`,
        user: currentUser.uid,
        url,
      })

      setProgress(null)
      setIsSuccess(true)

    } catch (e) {
      setError(e)
      setIsError(true)

    } finally {
      setIsUploading(false)
    }
  }


  return {
    error,
    isError,
    isSuccess,
    isUploading,
    progress,
    upload,
  }
}

export default useUploadImage