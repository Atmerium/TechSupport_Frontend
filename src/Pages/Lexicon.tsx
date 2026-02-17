import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Category } from "../Interfaces/CategoryInterdace";

const Lexicon = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searched, setSearched] = useState<Category[]>([]);

  //Directs to the corresponding Details page
  const handleCardClick = (id: number) => {
    navigate(`/lexicon/${id}`);
  };

  //Gets lexicon from the database
  const fetchLexicon = async () => {
    try {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      setCategories(data);
      setSearched(data);
    } catch (error) {
      console.log("Hiba: " + error);
    }
  };

  //Handles search function
  const handleSearch = async () => {
    const tempArray: Category[] = [];
    if (search.trim() != "" && search != null) {
      categories.forEach((category) => {
        if (category.categoryName.includes(search)) {
          tempArray.push(category);
        }
      });
      setSearched(tempArray);
    }
  };

  //Runs fetchLexicon() whenever something changes
  useEffect(() => {
    fetchLexicon();
  }, []);

  //Returns the list of categories
  return (
    <>
      <div className="p-3 p-md-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Lexikon</h1>
          <p className="col-md-8 fs-4">
            Ebben a szakaszban megtalálsz egy részletes szótárat a számítógépek
            legfontosabb alkatrészeiről és azok funkcióiról.
          </p>
        </div>
        <div className="container-fluid ">
          <input
            className=""
            type="text"
            placeholder="⌕Keresés..."
            value={search}
            onInputCapture={(e) => setSearch(e.target.value)}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          {searched.map((category: Category) => (
            <div key={category.categoryId} className="col-md-6 mb-4">
              <div
                className="card h-100"
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(category.categoryId)}
              >
                <div className="card-body">
                  <h5 className="card-title">{category.categoryName}</h5>
                  <p className="card-text">{category.categoryName}</p>
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
