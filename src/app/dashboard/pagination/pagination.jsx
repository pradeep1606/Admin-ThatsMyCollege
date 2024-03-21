import React from 'react';
import { MdArrowRight, MdOutlineArrowRight } from 'react-icons/md';

const Pagination = ({ page, setPage, totalDocuments }) => {
  const totalPages = Math.ceil(totalDocuments / 20);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex p-2 justify-between">
      <button
        onClick={handlePreviousPage}
        className={`p-2 text-black rounded-md text-sm ${page === 1 ? 'cursor-not-allowed bg-[#b7bac1]' : 'cursor-pointer bg-[#dadde2] hover:bg-white'}`}
        disabled={page === 1}
      >
        Previous
      </button>
      <button
        onClick={handleNextPage}
        className={`p-2 bg-[#b7bac1] text-black rounded-md text-sm ${page === totalPages ? 'cursor-not-allowed bg-[#b7bac1]' : 'cursor-pointer bg-[#dadde2] hover:bg-white'}`}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;