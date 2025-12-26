import { useState } from "react";
import "./pokeList.css";
import PokeListItem from "./pokeListItem";

const PokeList = ({ pokemons }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 28;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokemons = pokemons.slice(startIndex, endIndex);

  const totalPages = Math.ceil(pokemons.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pokelist_container">
      <div className="pokelist">
        {currentPokemons.map((item) => (
          <PokeListItem key={item.url} pokemon={item} />
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination_btn"
        >
          이전
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={`pagination_number ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination_btn"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default PokeList;
