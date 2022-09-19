import { useRef, useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import SwipeInFromRight from '../components/animations/SwipeInFromRight'
import SwipeOutToLeft from '../components/animations/SwipeOutToLeft'
import { useAuthContext } from '../contexts/AuthContext'

const SignupPage = () => {
  const [loading, setLoading] = useState(false)
  const { loginSwipe } = useAuthContext()

  console.log(loginSwipe)

  return (
    <>
      {loading && <div>loading...</div>}
      
      {loginSwipe ? <SwipeOutToLeft>
                      <Signup />
                    </SwipeOutToLeft>
                  : <Signup />
      }  

      {loginSwipe ? <SwipeInFromRight>
                      <Login />
                    </SwipeInFromRight>
                  : <Login />
      }
    </>
  )
}

export default SignupPage