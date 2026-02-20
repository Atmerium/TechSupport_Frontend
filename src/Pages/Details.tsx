import { useParams, useNavigate } from "react-router";
//import { componentsData } from "../data/componentsData";
import { useEffect, useState } from "react";
import type { Brand } from "../Interfaces/BrandInterface";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [brands, setComponents] = useState<Brand[]>([]);
  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
      const res = await fetch("http://localhost:3000/brands");
      const data = await res.json();
      const filteredData = data.filter((c: Brand) => c.partId === Number(id));
      setComponents(filteredData);
    } catch (error) {
      console.log("Hiba: " + error);
    }
  };

  const component = brands.find((c) => c.partId === Number(id));

  useEffect(() => {
    fetchDetails();
  }, []);

  if (!component) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Alkatrész nem található!
          <button
            className="btn btn-outline-secondary ms-3"
            onClick={() => navigate("/lexicon")}
          >
            Vissza a Lexikonhoz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate("/lexicon")}
      >
        &larr; Vissza a Lexikonhoz
      </button>

      {brands.map((component: Brand) => (
        <div className="card" key={component.descriptionId}>
          <div className="card-header bg-primary text-white">
            <h2>{component.descriptionBrand }</h2>
          </div>
          <div className="card-body">
            <h5 className="card-title">Részletes információ</h5>
            <p className="card-text">{component.dDescription}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Details;
