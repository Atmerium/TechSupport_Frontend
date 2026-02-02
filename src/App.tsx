import './App.css'
import { Route, Routes, Navigate } from 'react-router';
import Layout from './Pages/Layout';
import Welcome from './Pages/Welcome';
import Lexicon from './Pages/Lexicon';
import Details from './Pages/Details';
import Building from './Pages/Building';
import Login from './Pages/Login';
import { AuthProvider, useAuth } from './Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import type { JSX } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
  
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />}/>
          <Route path="login" element={<Login />} />
          <Route path="profile" element={
            <ProtectedRoute>
              <div className="p-5"><h2>Profile Page</h2><p>Your profile information will be displayed here.</p></div>
            </ProtectedRoute>
          } />
          <Route path="lexicon" element={<Lexicon />} />
          <Route path="lexicon/:id" element={<Details />} />
          <Route path="building" element={<Building />} />
          <Route path="building/:category" element={<Building />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
