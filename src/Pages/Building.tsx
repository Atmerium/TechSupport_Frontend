import { useParams, NavLink } from 'react-router';

const Building = () => {
    const { category } = useParams();

    const categories = [
        { id: 'office', label: 'Irodai / Otthoni' },
        { id: 'gamer', label: 'Gamer' },
    ];

    const currentCategory = categories.find(c => c.id === category);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Számítógép Összeállítás</h2>
            
            {/* Category Navbar */}
            <div className="flex flex-wrap gap-2 mb-6 border-b pb-4">
                {categories.map((cat) => (
                    <NavLink
                        key={cat.id}
                        to={`/building/${cat.id}`}
                        className={({ isActive }) => `px-4 py-2 rounded-lg transition-colors duration-200 font-medium ${
                            isActive
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {cat.label}
                    </NavLink>
                ))}
            </div>

            <div className="mt-4">
                {currentCategory ? (
                    <>
                        <h3 className="text-xl">Kiválasztott kategória: <span className="font-semibold">{currentCategory.label}</span></h3>
                        <p className="mt-2 text-gray-600">
                            Itt jelennek majd meg a(z) {currentCategory.label.toLowerCase()} konfigurációhoz tartozó információk és alkatrészek.
                        </p>
                    </>
                ) : (
                    <p className="text-gray-600">Kérlek válassz egy kategóriát a fenti lehetőségek közül.</p>
                )}
            </div>
        </div>
    );
};

export default Building;