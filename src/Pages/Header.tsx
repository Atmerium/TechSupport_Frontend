import logo from '/Kép.png';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../Context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, logout } = useAuth();

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2">
                <div className="container-fluid">
                    <button className="navbar-brand fs-4 btn btn-link" onClick={() => navigate('/')}>
                        <img src={logo} alt="Project Logo" width="70" height="70" className="d-inline-block align-middle me-2" />
                    </button>
                    <h1 className="text-white display-4">TechSupport</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>Home</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${location.pathname === '/lexicon' ? 'active' : ''}`} onClick={() => navigate('/lexicon')}>Lexicon</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${location.pathname === '/building' ? 'active' : ''}`} onClick={() => navigate('/building')}>Building</button>
                            </li>
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <button className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} onClick={() => navigate('/profile')}>Profile</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" onClick={() => { logout(); navigate('/'); }}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <button className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} onClick={() => navigate('/login')}>Login</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
