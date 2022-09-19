import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login, currentUser, loginSwipe, setLoginSwipe } = useAuthContext()
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Try to log in the user
    try {
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      console.log("Success logging in as:", currentUser)
      // navigate('/')
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <div>Loading..</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="bg-grey-lighter flex flex-col">
          <div className="container max-w-xs mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="flex justify-center flex-col bg-white px-6 pt-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Login</h1>

              <input 
                  type="text"
                  className="block border border-grey-light p-3 rounded mb-4"
                  name="email"
                  ref={emailRef}
                  placeholder="Email" 
              />

              <input 
                  type="password"
                  className="block border border-grey-light p-3 rounded mb-4"
                  name="password"
                  ref={passwordRef}
                  placeholder="Password" 
              />

              <button className="block border border-grey-light p-3 rounded">
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="text-grey-dark mb-5 flex flex-col justify-center">
        <p className="m-auto py-4">Don't have an account?</p>
        <button className="px-8 h-8" onClick={() => {setLoginSwipe(false)}}>
        Create account
        </button>
      </div>
    </>
  )
}

export default Login