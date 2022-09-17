import { createContext, useContext, useState } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'

const AuthContext = createContext()

const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const contextValues = {
    currentUser,
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