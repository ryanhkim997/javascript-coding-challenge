import React from 'react';

const Paginate = ({ currentPage, photos, handlePageChange }) => {
  
  return (
    <div>
      <button onClick={() => {
        if (currentPage > 1) {
          handlePageChange(currentPage - 1);
        }
      }}>
        Previous
      </button>
      <span>
        Current Page: 
        <select value={currentPage} onChange={(e) => handlePageChange(e.target.value)}>
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
          handlePageChange(currentPage + 1);
        }
      }}>
        Next
      </button>
    </div>
  )
}

export default Paginate;