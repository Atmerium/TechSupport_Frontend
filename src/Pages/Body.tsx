import { Outlet } from 'react-router';

const Body = () => {
    return (
        <main className="container mt-4 flex-shrink-0">
            <Outlet />
        </main>
    )
};

export default Body;
