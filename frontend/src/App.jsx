import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import LandingPage from './pages/landing.jsx';
import SignIn from './pages/authentication.jsx';

function App() {
  

  return (
    <div>
      <Router>

        <Routes>

          <Route path='/' element={<LandingPage />} />

          <Route path='/auth' element={<SignIn />} />

        </Routes>


      </Router>

    </div>
    
  )
}

export default App
