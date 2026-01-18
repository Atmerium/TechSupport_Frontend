import { Outlet } from 'react-router';
import Header from './Header';

const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="container mt-4 flex-shrink-0">
                <Outlet />
            </main>
            <footer className="footer mt-auto py-3 bg-dark text-white">
                <div className="container text-center">
                    <span>© 2025 <a href="https://github.com/Atmerium/TechSupport_Frontend">TechSupport</a>. All rights reserved.</span>
                </div>
            </footer>
        </div>
    )
};

export default Layout;
