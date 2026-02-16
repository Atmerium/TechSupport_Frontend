import { useParams, useNavigate } from "react-router";
//import { componentsData } from "../data/componentsData";
import { useEffect, useState } from "react";
import type { Component } from "../Interfaces/ComponentInterface";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [components, setComponents] = useState<Component[]>([]);
  const navigate = useNavigate();

  //Gets details of component
  //id is underlined because typscript is stupid
  const fetchDetails = async () => {
    try {
      const res = await fetch("http://localhost:3000/components");
      const data = await res.json();
      const array: Component[] = []
      data.forEach((element: Component) => {
        if (element.categoryId == parseInt(id)) {
          array.push(element)
        }
      });
      setComponents(array);

    } catch (error) {
      console.log("Hiba: " + error);
    }
  };

  //This ⬇ is unnecesarry due to database
  // Find the component based on the ID from the URL
  // Convert id to number since useParams returns string
  //const component = componentsData.find((c) => c.id === Number(id));

  //Runs fetchDetails whenever something changes
  useEffect(() => {
    fetchDetails();
  }, []);

  //Checks if there are any components in the category
  if (components.length == 0) {
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

  //Returns the components in the category
  return (
    <div className="container mt-5">
      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate("/lexicon")}
      >
        &larr; Vissza a Lexikonhoz
      </button>

      {components.map((component: Component) => (
        <div className="card" key={component.componentId}>
          <div className="card-header bg-primary text-white">
            <h2>{component.componentBrand}</h2>
          </div>
          <div className="card-body">
            <h5 className="card-title">Rövid leírás</h5>
            <p className="card-text mb-4">{component.componentDescription}</p>

            <h5 className="card-title">Részletes információ</h5>
            <p className="card-text">{component.componentDescription}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Details;
