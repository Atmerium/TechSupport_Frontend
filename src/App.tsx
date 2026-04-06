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
import Profile from './Pages/Profile';
import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();
  const [cookies] = useCookies(['user']);
  const userCookie = cookies.user;
  const cookieName = typeof userCookie === 'string'
    ? userCookie
    : userCookie?.username || userCookie?.userName;
  const userName = isLoggedIn ? (cookieName || 'Látogató') : 'Látogató';
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome userName={userName} />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="lexicon" element={<Lexicon />} />
        <Route path="lexicon/:id" element={<Details />} />
        <Route path="building" element={<Building />} />
        <Route path="building/:category" element={<Building />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App
