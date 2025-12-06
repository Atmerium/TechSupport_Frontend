import './App.css'
import { Route, Routes } from 'react-router';
import Header from './Pages/Header';
import Body from './Pages/Body';
import Welcome from './Pages/Welcome';
import Lexicon from './Pages/Lexicon';
import Footer from './Pages/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<Welcome />} />
          <Route path="tickets" element={<div className="p-5"><h2>Tickets Page</h2><p>Your tickets will be displayed here.</p></div>} />
          <Route path="profile" element={<div className="p-5"><h2>Profile Page</h2><p>Your profile information will be displayed here.</p></div>} />
          <Route path="lexicon" element={<Lexicon />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
