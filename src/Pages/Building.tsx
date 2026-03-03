import { useParams, NavLink } from 'react-router';

const Building = () => {
    const { category, price } = useParams();

    const categories = [
        { id: 'office', label: 'Irodai / Otthoni' },
        { id: 'gamer', label: 'Gamer' },
    ];

    const priceTiers = [
        { id: 'entry', label: 'Belépő szint' },
        { id: 'mid', label: 'Középkategória' },
        { id: 'high', label: 'Prémium / High-End' },
    ];

    const currentCategory = categories.find(c => c.id === category);
    const currentPrice = priceTiers.find(p => p.id === price);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Számítógép Összeállítás</h2>
            
            <div className="d-flex flex-wrap gap-2 mb-4 border-bottom pb-4">
                {categories.map((cat) => (
                    <NavLink
                        key={cat.id}
                        to={`/building/${cat.id}`}
                        className={({ isActive }) => `btn ${
                            isActive
                                ? 'btn-primary'
                                : 'btn-outline-primary'
                        } me-2 mb-2`}
                    >
                        {cat.label}
                    </NavLink>
                ))}
            </div>

            {category && (
                <div className="d-flex flex-wrap gap-2 mb-4">
                    {priceTiers.map((tier) => (
                        <NavLink
                            key={tier.id}
                            to={`/building/${category}/${tier.id}`}
                            className={({ isActive }) => `btn btn-sm ${
                                isActive
                                    ? 'btn-success'
                                    : 'btn-outline-success'
                            } me-2 mb-2`}
                        >
                            {tier.label}
                        </NavLink>
                    ))}
                </div>
            )}

            <div className="mt-4 p-4 bg-light rounded border">
                {!category ? (
                    <p className="text-secondary fst-italic">Kérlek, válassz egy kategóriát a kezdéshez!</p>
                ) : !price ? (
                    <div className="text-center py-4">
                        <h3 className="h4 fw-bold text-primary">{currentCategory?.label}</h3>
                        <p className="text-secondary mt-2">Most válassz egy árkategóriát a fenti gombok közül!</p>
                    </div>
                ) : (
                    <div>
                        <h3 className="h4 fw-bold text-dark">
                            {currentCategory?.label} - <span className="text-success">{currentPrice?.label}</span>
                        </h3>
                        <div className="mt-3 p-3 bg-white shadow-sm rounded border-start border-success border-4">
                            <p className="text-dark">
                                Itt listázzuk majd a konkrét alkatrészeket a(z) <strong>{currentPrice?.label.toLowerCase()}</strong> igényekhez.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Building;