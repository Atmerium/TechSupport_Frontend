import { useState, useEffect } from 'react';
import type { Build } from '../Interfaces/BuildsInterface';

const Building = () => {
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

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Számítógép Összeállítás</h2>
            <div className="row justify-content-center mb-5">
                <div className="col-md-8">
                    <h4 className="text-center mb-3">Válassz felhasználási területet:</h4>
                    <div className="d-flex justify-content-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setSelectedCategory(cat.id);
                                    setSelectedClass(null);
                                }}
                                className={`btn btn-lg px-5 py-3 ${
                                    selectedCategory === cat.id 
                                    ? 'btn-primary shadow-lg' 
                                    : 'btn-outline-primary'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {selectedCategory && (
                <div className="row justify-content-center mb-5 animate-in fade-in">
                    <div className="col-md-8">
                        <h4 className="text-center mb-3">Válassz teljesítményszintet:</h4>
                        <div className="d-flex justify-content-center flex-wrap gap-2">
                            {classes.map((cls) => (
                                <button
                                    key={cls.id}
                                    onClick={() => setSelectedClass(cls.id)}
                                    className={`btn ${
                                        selectedClass === cls.id 
                                        ? 'btn-success shadow' 
                                        : 'btn-outline-success'
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
                <div className="col-md-10">
                    <div className="card shadow border-0">
                        <div className="card-header bg-light">
                            <h5 className="mb-0">Kiválasztott konfiguráció leírása</h5>
                        </div>
                        <div className="card-body p-4" style={{ minHeight: '200px' }}>
                            {!selectedCategory ? (
                                <p className="text-muted text-center my-5 fst-italic">
                                    Kérlek, válassz egy felhasználási területet a kezdéshez!
                                </p>
                            ) : !selectedClass ? (
                                <p className="text-muted text-center my-5 fst-italic">
                                    Most válassz egy teljesítményszintet!
                                </p>
                            ) : selectedBuild ? (
                                <div>
                                    <h3 className="card-title text-primary fw-bold mb-3">
                                        {selectedBuild.buildName}
                                    </h3>
                                    <div className="p-3 bg-light rounded border">
                                        <p className="card-text fs-5" style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                                            {selectedBuild.buildDescription}
                                        </p>
                                    </div>
                                    <div className="mt-3 text-end">
                                        <small className="text-muted">
                                            Kategória: {categories.find(c => c.id === selectedBuild.buildCategory)?.label} | 
                                            Szint: {classes.find(c => c.id === selectedBuild.buildClass)?.label}
                                        </small>
                                    </div>
                                </div>
                            ) : (
                                <div className="alert alert-warning text-center">
                                    Nem található ilyen összeállítás az adatbázisban. 
                                    (Kategória: {selectedCategory}, Szint: {selectedClass})
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