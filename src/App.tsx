import './App.css'
import { Route, Routes, Navigate } from 'react-router';
import Layout from './Pages/Layout';
import Welcome from './Pages/Welcome';
import Lexicon from './Pages/Lexicon';
import Details from './Pages/Details';
import Building from './Pages/Building';
import Comments from './Pages/Comments';
import Login from './Pages/Login';
import { AuthProvider, useAuth } from './Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import type { JSX } from 'react';
import Profile from './Pages/Profile';
import { useCookies } from 'react-cookie';
import { ThemeProvider } from './Context/ThemeContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();
  const [cookies, setCookie] = useCookies(['user']);
  const userCookie = cookies.user;
  const cookieName = typeof userCookie === 'string'
    ? userCookie
    : userCookie?.userName;
  const userName = isLoggedIn ? (cookieName || 'Látogató') : 'Látogató';
  
  const handleUpdateSuccess = (newName: string, newEmail: string) => {
    if (userCookie && typeof userCookie === 'object') {
      setCookie("user", { ...userCookie, userName: newName, userEmail: newEmail }, { path: "/", maxAge: 60 * 60 * 24 * 7, sameSite: "lax" });
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome userName={userName} />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={
          <ProtectedRoute>
            <Profile 
              role={userCookie?.role}
              token={userCookie?.token} 
              id={userCookie?.id} 
              userName={userName} 
              userEmail={userCookie?.userEmail} 
              onUpdateSuccess={handleUpdateSuccess} 
            />
          </ProtectedRoute>
        } />
        <Route path="lexicon" element={<Lexicon />} />
        <Route path="lexicon/:id" element={<Details />} />
        <Route path="building" element={<Building />} />
        <Route path="building/:category" element={<Building />} />
        <Route path="comments/:buildId" element={<Comments />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App
