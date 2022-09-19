import { useRef, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { signup, setLoginSwipe } = useAuthContext()
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(emailRef)

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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 z-10">
        <form onSubmit={handleSubmit}>
          <div className="bg-grey-lighter flex flex-col">
            <div className="container max-w-xs mx-auto flex-1 flex flex-col items-center justify-center px-2">
              <div className="flex justify-center flex-col bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Sign up</h1>

                <input 
                    type="text"
                    className="block border border-grey-light p-3 rounded mb-4"
                    name="email"
                    ref={emailRef}
                    required
                    placeholder="Email" 
                />

                <input 
                    type="password"
                    className="block border border-grey-light p-3 rounded mb-4"
                    name="password"
                    ref={passwordRef}
                    required
                    placeholder="Password" 
                />

                <input 
                    type="password"
                    className="block border border-grey-light p-3 rounded mb-4"
                    name="confirm_password"
                    ref={passwordConfirmRef}
                    required
                    placeholder="Confirm Password" 
                />

                <button className="block border border-grey-light p-3 rounded">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className="flex flex-col justify-center text-grey-dark w-full">
          <p>Already have an account?</p> 
          <button className="px-8 h-8" onClick={() => {setLoginSwipe(true)}}>
            Login
          </button>
        </div>
      </div>
    </>
  )
}

export default Signup