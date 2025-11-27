import logo from '/Kép.png';
import NavButtons from './NavButtons';

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-2">
                <div className="container-fluid">
                    <a className="navbar-brand fs-4" href="#">
                        <img src={logo} alt="Project Logo" width="70" height="70" className="d-inline-block align-middle me-2" />
                    </a>
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
