import { Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import HomePage from './pages/HomePage'
import '../src/assets/scss/App.scss'
import SignupPage from './pages/SignupPage'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <HomePage /> }/>
        <Route path="/signup" element={ <SignupPage /> }/>
      </Routes>

      <ReactQueryDevtools position='bottom-right' />
    </div>
  )
}

export default App
