import React from 'react';

import '../styles/Paginate.css';

const Paginate = ({ currentPage, photos, setCurrentPage }) => {
  return (
    <div className="Paginate">
      {/* Moves to previous page */}
      <button className="prev-button" onClick={() => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }}>
        Previous
      </button>
      <span>
        Current Page:
        {/* Allows for user to choose any page to skip to */}
        <select className="page-select" value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))}> {/* string => number */}
          {photos.map((_, i) => {
            const countPage = i * 18;
            return (
              countPage < photos.length 
              ? <option key={i}>{i + 1}</option>
              : null
            );
          })}
        </select>
      </span>
      {/* Moves to next page */}
      <button className="next-button" onClick={() => {
        if (currentPage * 18 < photos.length) {
          setCurrentPage(currentPage + 1);
        }
      }}>
        Next
      </button>
    </div>
  )
}

export default Paginate;