import { setPage } from '@/store/slices/collegeSlice';
import React from 'react';
import { MdArrowRight, MdOutlineArrowRight } from 'react-icons/md';
import { useDispatch } from 'react-redux';

const Pagination = ({ page, totalDocuments, setStatus }) => {
  const dispatch = useDispatch();
  const totalPages = Math.ceil(totalDocuments / 20);

  const handleNextPage = () => {
    dispatch(setPage(page + 1));
    dispatch(setStatus('loading'));
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
      dispatch(setStatus('loading'));
    }
  };

  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
    dispatch(setStatus('loading'));
  };

  // Generate page buttons dynamically
  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-2 py-1 rounded-md text-sm ${page === i ? 'bg-[#b7bac1] text-black' : ''}`}
        >
          {i}
        </button>
      );
    }
    return buttons;
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
      <div className='text-xs flex justify-center items-center'>
        {renderPageButtons()}
      </div>
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
