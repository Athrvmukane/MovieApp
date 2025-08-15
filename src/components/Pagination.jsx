import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pagesToShow = 5; // Number of page buttons to display around the current page
  let startPage, endPage;

  if (totalPages <= pagesToShow) {
    // Less than 'pagesToShow' total pages, show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // More than 'pagesToShow' total pages, calculate start and end pages
    const maxPagesBeforeCurrentPage = Math.floor(pagesToShow / 2);
    const maxPagesAfterCurrentPage = Math.ceil(pagesToShow / 2) - 1;

    if (currentPage <= maxPagesBeforeCurrentPage) {
      // Current page is near the beginning
      startPage = 1;
      endPage = pagesToShow;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // Current page is near the end
      startPage = totalPages - pagesToShow + 1;
      endPage = totalPages;
    } else {
      // Current page is somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  const pageNumbers = Array.from({ length: (endPage + 1) - startPage }, (_, i) => startPage + i);

  return (
    <nav className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 my-8"> {/* Added flex-wrap and adjusted gap */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-2 py-1 sm:px-4 sm:py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 pagination-button text-sm sm:text-base"
      >
        First
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 sm:px-4 sm:py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 pagination-button text-sm sm:text-base"
      >
        Previous
      </button>

      {startPage > 1 && (
        <span className="px-1 py-1 sm:px-4 sm:py-2 text-gray-400 text-sm sm:text-base">...</span>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg transition duration-200 pagination-button text-sm sm:text-base ${
            currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <span className="px-1 py-1 sm:px-4 sm:py-2 text-gray-400 text-sm sm:text-base">...</span>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 sm:px-4 sm:py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 pagination-button text-sm sm:text-base"
      >
        Next
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 sm:px-4 sm:py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 pagination-button text-sm sm:text-base"
      >
        Last
      </button>
    </nav>
  );
};

export default Pagination;
