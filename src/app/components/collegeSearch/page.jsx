'use client'
import React, { useEffect, useState, useRef } from 'react';
import { MdSearch } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllColleges, fetchColleges } from '@/store/slices/collegeSlice';
import Link from 'next/link';

const CollegeSearch = () => {
    const dispatch = useDispatch();
    const { allColleges, allCollegesStatus } = useSelector((state) => state.AllCollege);
    const [searchInput, setSearchInput] = useState('');
    const [filteredColleges, setFilteredColleges] = useState([]);
    const [queryLimit, setQueryLimit] = useState('');

    // Use useRef for the searchTimer to keep its value across renders
    const searchTimer = useRef(null);

    useEffect(() => {
        if (allCollegesStatus !== 'succeeded') {
            dispatch(fetchAllColleges());
          }
    }, [dispatch, allCollegesStatus]);

    useEffect(() => {
        if (allColleges && allColleges.colleges) {
            const filtered = allColleges.colleges.filter(college =>
                college.name.toLowerCase().includes(searchInput.toLowerCase())
            );
            setFilteredColleges(filtered);
        }
    }, [allColleges, searchInput]);

    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setQueryLimit(query);
        
        // Clear the timer using the current value stored in the ref
        clearTimeout(searchTimer.current);
        // Set the timeout and store its ID in the ref
        searchTimer.current = setTimeout(() => {
            setSearchInput(query);
        }, 1000);
    };

    if (status === 'loading') {
        return <div>loading....</div>
    }

    return (
        <div className='relative'>
            <div className='flex items-center gap-2 bg-[#2e374a] p-2 rounded-lg'>
                <MdSearch />
                <input
                    onChange={handleSearchInputChange}
                    value={queryLimit}
                    className='bg-transparent border-none text-white'
                    type='text'
                    placeholder='Search college...'
                />
            </div>
            {searchInput && (
                <div className='absolute bg-[#151c2c] rounded-b-md px-4'>
                    {queryLimit ? (
                        <ul className='divide-y'>
                            {filteredColleges.map(college => (
                                <li key={college._id} className='py-1'>
                                    <Link href={`/dashboard/colleges/${college._id}`}>
                                        {college.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : <></>}
                </div>
            )}
        </div>
    );
};

export default CollegeSearch;
