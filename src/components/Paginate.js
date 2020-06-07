import React from 'react';

import '../styles/Paginate.css';

const Paginate = ({ currentPage, photos, setCurrentPage }) => {
  return (
    <div>
      <button onClick={() => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }}>
        Previous
      </button>
      <span>
        Current Page: 
        <select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))}> {/* string => number */}
          {photos.map((val, i) => {
            const countPage = i * 18;
            return (
              countPage < photos.length 
              ? <option key={i}>{i + 1}</option>
              : null
            );
          })}
        </select>
      </span>
      <button onClick={() => {
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