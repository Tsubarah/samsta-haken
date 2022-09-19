import { useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { useAuthContext } from '../contexts/AuthContext'

const SignupPage = () => {
  const [loading, setLoading] = useState(false)
  const { loginSwipe } = useAuthContext()

  console.log(loginSwipe)

  return (
    <>
      {loading && <div>loading...</div>}
      
      <div className={`flex w-[200%] transition duration-500 ${loginSwipe ? "-translate-x-1/2" : ""}`}>
        <div className="grid place-content-center h-screen w-full">
          <Signup />
        </div>
        <div className="grid place-content-center h-screen w-full">
          <Login />
        </div>
      </div>
    </>
  )
}

export default SignupPage