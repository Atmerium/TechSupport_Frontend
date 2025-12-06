import { useNavigate } from 'react-router';

const NavButtons = () => {
    const navigate = useNavigate();

    return (
        <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <button className="nav-link active" onClick={() => navigate('/')}>Home</button>
            </li>
            <li className="nav-item">
                <button className="nav-link" onClick={() => navigate('/lexicon')}>Lexicon</button>
            </li>
            <li className="nav-item">
                <button className="nav-link" onClick={() => navigate('/profile')}>Profile</button>
            </li>
        </ul>
    );
};

export default NavButtons;
