const Lexicon = () => {
    const components = [
        {
            id: 1,
            name: "Processzor (CPU)",
            description: "A számítógép agya. Az összes számítást és utasítást feldolgozza. A CPU sebessége (GHz-ben mérve) meghatározza, hogy milyen gyorsan dolgozik fel az adatokat."
        },
        {
            id: 2,
            name: "Memória (RAM)",
            description: "Az ideiglenes tárolóhely, ahol az aktív programok és adatok kerülnek. Minél több RAM-od van, annál több alkalmazást tudsz egyidejűleg futtatni."
        },
        {
            id: 3,
            name: "Merevlemez (HDD/SSD)",
            description: "Az állandó tárolóhely, ahol az operációs rendszer és az összes fájlod tárolódik. Az SSD gyorsabb, mint a hagyományos HDD."
        },
        {
            id: 4,
            name: "Videokártya (GPU)",
            description: "A grafikus feldolgozásért felelős alkatrész. Fontos a játékokhoz, videó szerkesztéshez és grafikai munkához."
        },
        {
            id: 5,
            name: "Alaplapja (Motherboard)",
            description: "Az összes alkatrészt összeköti. Az alaplapot választva meg, hogy milyen típusú processzort és memóriát tudsz használni."
        },
        {
            id: 6,
            name: "Tápegység (PSU)",
            description: "Az elektromos áramot biztosítja a számítógépnek. A wattszáma (W-ban mérve) meghatározza, hogy mekkora terhelést képes elbírni."
        }
    ];

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
                    {components.map((component) => (
                        <div key={component.id} className="col-md-6 mb-4">
                            <div className="card h-100">
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



