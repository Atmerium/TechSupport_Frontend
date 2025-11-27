const NavButtons = () => {
    return (
        <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Tickets</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Profile</a>
            </li>
        </ul>
    );
};

export default NavButtons;
