import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const SignupPage = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { signup } = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validates that the user entered the same password in both input fields
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("The passwords does not match")
    }

    setError(null)

    // Try to sign up the user
    try {
      setLoading(true)

      await signup(emailRef.current.value, passwordRef.current.value)
      console.log("Success signing up")
      navigate('/')


      setLoading(false)

    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }


  return (
    <>
      {loading && <div>loading...</div>}

      <form onSubmit={handleSubmit}>
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-xs mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>

              <input 
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  ref={emailRef}
                  required
                  placeholder="Email" 
              />

              <input 
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="password"
                  ref={passwordRef}
                  required
                  placeholder="Password" 
              />

              <input 
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="confirm_password"
                  ref={passwordConfirmRef}
                  required
                  placeholder="Confirm Password" 
              />

              <button className="block border border-grey-light w-full p-3 rounded mb-4">
                Create Account
              </button>
            </div>

            <div className="text-grey-dark mt-6">
              Already have an account? 
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default SignupPage