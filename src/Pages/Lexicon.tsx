import { useNavigate } from 'react-router';
import { componentsData } from '../data/componentsData';

const Lexicon = () => {
    const navigate = useNavigate();

    const handleCardClick = (id: number) => {
        navigate(`/lexicon/${id}`);
    };

    return (
        <>
            <div className="p-3 p-md-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Lexikon</h1>
                    <p className="col-md-8 fs-4">
                        Ebben a szakaszban megtalálsz egy részletes szótárat a számítógépek legfontosabb alkatrészeiről és azok funkcióiról.
                    </p>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    {componentsData.map((component) => (
                        <div key={component.id} className="col-md-6 mb-4">
                            <div 
                                className="card h-100" 
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleCardClick(component.id)}
                            >
                                <div className="card-body">
                                    <h5 className="card-title">{component.name}</h5>
                                    <p className="card-text">{component.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Lexicon;



