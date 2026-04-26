import logo from '/Kép.png';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../Context/AuthContext';
import { useTheme } from '../Context/ThemeContext';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <header>
            <nav className="navbar navbar-expand-lg py-2" data-bs-theme="dark" style={{ backgroundColor: theme === 'dark' ? '#282b2e' : '#767c88', color: theme === 'dark' ? 'white' : 'white' }}>
                <div className="container-fluid">
                    <button className="navbar-brand fs-4 btn btn-link" onClick={() => navigate('/')}>
                        <img src={logo} alt="Project Logo" width="70" height="70" className="d-inline-block align-middle me-2" />
                    </button>
                    <h1 className="display-4">TechSupport</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav" >
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <button className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>Főoldal</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${location.pathname === '/lexicon' ? 'active' : ''}`} onClick={() => navigate('/lexicon')}>Lexikon</button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${location.pathname === '/building' ? 'active' : ''}`} onClick={() => navigate('/building')}>Gépösszeállítás</button>
                            </li>
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <button className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} onClick={() => navigate('/profile')}>Profil</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" onClick={() => { logout(); navigate('/'); }}>Kijelentkezés</button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <button className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} onClick={() => navigate('/login')}>Bejelentkezés</button>
                                </li>
                            )}
                        </ul>
                    </div>
                    <button className='btn btn-outline-light' onClick={toggleTheme}>
                        {theme === 'dark' ? '☀️' : '🌙'} Téma
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
