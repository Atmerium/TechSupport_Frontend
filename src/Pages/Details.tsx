import { useParams, useNavigate } from 'react-router';
import { componentsData } from '../data/componentsData';

const Details = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    // Find the component based on the ID from the URL
    // Convert id to number since useParams returns string
    const component = componentsData.find(c => c.id === Number(id));

    if (!component) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    Alkatrész nem található!
                    <button className="btn btn-outline-secondary ms-3" onClick={() => navigate('/lexicon')}>
                        Vissza a Lexikonhoz
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <button className="btn btn-secondary mb-4" onClick={() => navigate('/lexicon')}>
                &larr; Vissza a Lexikonhoz
            </button>
            
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h2>{component.name}</h2>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Rövid leírás</h5>
                    <p className="card-text mb-4">{component.description}</p>
                    
                    <h5 className="card-title">Részletes információ</h5>
                    <p className="card-text">{component.details}</p>
                </div>
            </div>
        </div>
    );
};

export default Details;
