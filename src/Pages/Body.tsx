import React from 'react';

interface BodyProps {
    children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
    return (
        <main className="container mt-4 flex-shrink-0">
            {children}
        </main>
    );
};

export default Body;
