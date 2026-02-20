import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Part } from "../Interfaces/PartInterdace";

const Lexicon = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Part[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searched, setSearched] = useState<Part[]>([]);

  const handleCardClick = (id: number) => {
    navigate(`/lexicon/${id}`);
  };

  
  const fetchLexicon = async () => {
    try {
      const res = await fetch("http://localhost:3000/parts");
      const data = await res.json();
      setCategories(data);
      setSearched(data);
    } catch (error) {
      console.log("Hiba: " + error);
    }
  };

  const handleSearch = () => {
    if (search.trim() === "") {
      setSearched(categories);
    } else {
      const tempArray = categories.filter((part) =>
        part.partName.toLowerCase().includes(search.toLowerCase())
      );
      setSearched(tempArray);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [search, categories]);

  useEffect(() => {
    fetchLexicon();
  }, []);

  return (
    <>
      <div className="p-3 p-md-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Lexikon</h1>
          <p className="col-md-8 fs-4">
            Ebben a szakaszban megtalálsz egy részletes leíratot a számítógépek
            legfontosabb alkatrészeiről és azok funkcióiról.
          </p>
        </div>
        <div className="container-fluid ">
          <input
            className=""
            type="text"
            placeholder="⌕Keresés..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          {searched.map((part: Part) => {
            if (part.partVisible != false) {
              return (
                <>
                  <div key={part.partId} className="col-md-6 mb-4">
                    <div
                      className="card h-100"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleCardClick(part.partId)}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{part.partName}</h5>
                        <p className="card-text">{part.partDescription}</p>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Lexicon;
