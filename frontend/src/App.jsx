import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import LandingPage from './pages/landing.jsx';

function App() {
  

  return (
    <div>
      <Router>

        <Routes>

          <Route path='/' element={<LandingPage />} />

        </Routes>


      </Router>

    </div>
    
  )
}

export default App
