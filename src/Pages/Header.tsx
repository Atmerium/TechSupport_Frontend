import logo from '/Kép.png';
import NavButtons from './NavButtons';
import { useNavigate } from 'react-router';

const Header = () => {
    const navigate = useNavigate();

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
                        <NavButtons />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
