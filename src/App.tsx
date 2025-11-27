import './App.css'
import Header from './Pages/Header';
import Body from './Pages/Body';
import Welcome from './Pages/Welcome';
import Footer from './Pages/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Body>
        <Welcome />
      </Body>
      <Footer />
    </div>
  )
}

export default App
