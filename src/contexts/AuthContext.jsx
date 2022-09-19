import { createContext, useContext, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db, storage } from '../firebase'
import BeatLoader from 'react-spinners/BeatLoader'

const AuthContext = createContext()

const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const signup = async (email, password) => {
    // create the user
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const contextValues = {
    currentUser,
    signup,
  }

  return (
    <AuthContext.Provider value={contextValues}>
      {loading ? (
        <div id="initial-loader">
          <BeatLoader color={'#888'} size={50} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}


export {
  AuthContextProvider as default,
  useAuthContext,
}