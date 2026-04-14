import { Outlet } from 'react-router';
import Header from './Header';
import { useTheme } from '../Context/ThemeContext';

const Layout = () => {
    const { theme } = useTheme();
    return (
        <div className="d-flex flex-column min-vh-100 bg-body text-body" data-bs-theme = {theme}>
            <Header />
            <main className="container mt-4 flex-shrink-0">
                <Outlet />
            </main>
            <footer className="footer mt-auto py-3" style={{ backgroundColor: theme === 'dark' ? '#343a40' : 'gray', color: theme === 'dark' ? 'white' : 'white' }}>
                <div className="container text-center">
                    <span>© 2025 <a href="https://github.com/Atmerium/TechSupport_Frontend">TechSupport</a>. All rights reserved.</span>
                </div>
            </footer>
        </div>
    )
};

export default Layout;
