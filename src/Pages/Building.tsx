import { useState, useEffect } from 'react';
import type { Build } from '../Interfaces/BuildsInterface';
import { useNavigate } from 'react-router';
import { useTheme } from '../Context/ThemeContext';

const Building = () => {
    const navigate = useNavigate();
    const [builds, setBuilds] = useState<Build[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedClass, setSelectedClass] = useState<number | null>(null);

    useEffect(() => {
        const fetchBuilds = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3000/builds');
                if (!response.ok) {
                    throw new Error('Failed to fetch builds');
                }
                const data = await response.json();
                setBuilds(data);
            } catch (err) {
                console.error(err);
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchBuilds();
    }, []);

    const categories = [
        { id: 1, label: 'Irodai / Otthoni' },
        { id: 2, label: 'Gamer' },
    ];

    const classes = [
        { id: 1, label: 'Belépő szint' },
        { id: 2, label: 'Középkategória' },
        { id: 3, label: 'Prémium / High-End' },
    ];

    const selectedBuild = builds.find(b => 
        b.buildCategory === selectedCategory && 
        b.buildClass === selectedClass
    );

    if (loading) {
        return <div className="container mt-5 text-center"><div className="spinner-border text-primary"></div><p>Építések betöltése...</p></div>;
    }
    if (error) {
        return <div className="container mt-5 alert alert-danger">Hiba: {error}</div>;
    }

    const { theme } = useTheme();

    return (
        <div className="container mt-4 p-3 p-md-4 rounded shadow bg-body-tertiary animate-in fade-in">
            <h2 className="mb-4 text-center">Számítógép Összeállítás</h2>
            
            <div className="row justify-content-center mb-4 mb-md-5">
                <div className="col-12 col-md-10 col-lg-8">
                    <h4 className="text-center mb-3 fs-5 fs-md-4">Válassz felhasználási területet:</h4>
                    <div className="d-flex justify-content-center flex-wrap gap-2 gap-md-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setSelectedCategory(cat.id);
                                    setSelectedClass(null);
                                }}
                                className={`btn px-4 py-2 px-md-5 py-md-3 fw-bold w-100 w-sm-auto ${
                                    selectedCategory === cat.id 
                                    ? 'btn-primary shadow-lg' 
                                    : (theme === 'dark' ? 'btn-secondary' : 'btn-outline-primary') 
                                }`}
                                style={{ flex: '1 1 auto', maxWidth: '300px' }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {selectedCategory && (
                <div className="row justify-content-center mb-4 mb-md-5 animate-in fade-in">
                    <div className="col-12 col-md-10 col-lg-8">
                        <h4 className="text-center mb-3 fs-5 fs-md-4">Válassz teljesítményszintet:</h4>
                        <div className="d-flex justify-content-center flex-wrap gap-2">
                            {classes.map((cls) => (
                                <button
                                    key={cls.id}
                                    onClick={() => setSelectedClass(cls.id)}
                                    className={`btn fw-semibold flex-grow-1 flex-md-grow-0 ${
                                        selectedClass === cls.id 
                                        ? 'btn-success shadow' 
                                        : (theme === 'dark' ? 'btn-secondary' : 'btn-outline-success')
                                    }`}
                                >
                                    {cls.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    <div className="card shadow border-0">
                        <div className="card-header bg-body-tertiary">
                            <h5 className="mb-0 fs-6 fs-md-5">Kiválasztott konfiguráció leírása</h5>
                        </div>
                        <div className="card-body p-3 p-md-4" style={{ minHeight: '200px' }}>
                            {!selectedCategory ? (
                                <p className="text-muted text-center my-4 my-md-5 fst-italic">
                                    Kérlek, válassz egy felhasználási területet a kezdéshez!
                                </p>
                            ) : !selectedClass ? (
                                <p className="text-muted text-center my-4 my-md-5 fst-italic">
                                    Most válassz egy teljesítményszintet!
                                </p>
                            ) : selectedBuild ? (
                                <div>
                                    <h3 className="card-title text-primary fw-bold mb-3 fs-4 fs-md-3">
                                        {selectedBuild.buildName}
                                    </h3>
                                    <div className="p-2 p-md-3 bg-body-tertiary rounded border">
                                        <p className="card-text fs-6 fs-md-5" style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                                            {selectedBuild.buildDescription}
                                        </p>
                                    </div>
                                    <div className="mt-3 text-end">
                                        <small className="text-muted d-block d-md-inline">
                                            Kategória: {categories.find(c => c.id === selectedBuild.buildCategory)?.label} | 
                                            Szint: {classes.find(c => c.id === selectedBuild.buildClass)?.label}
                                        </small>
                                    </div>
                                    <div className="text-center text-md-end mt-3">
                                        <button 
                                            className="btn btn-primary w-100 w-md-auto"
                                            onClick={() => navigate(`/comments/${selectedBuild.buildId}`)}>
                                            Kommentek megtekintése
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="alert alert-warning text-center">
                                    Nem található ilyen összeállítás az adatbázisban. 
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Building;