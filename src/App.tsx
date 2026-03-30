import './App.css'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { DashBoard } from './Pages/Dashboard'
import { Signin } from './Pages/Signin'
import { Landing } from './Pages/Landing'
import { SharedBrain } from './Pages/SharedBrain'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'  element = {<Landing />} />
          <Route path='/signin'  element = {<Signin />} />
          <Route path='/dashboard'  element = {<DashBoard />} />
          <Route path='/api/v1/brain/:shareLink' element={<SharedBrain />} />
        </Routes>

      </BrowserRouter>
     
    </>
   
       
  )
}

export default App

