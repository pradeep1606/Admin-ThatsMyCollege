'use client'
import { fetchColleges } from '@/store/slices/collegeSlice'
import React, { useEffect } from 'react'
import { MdSupervisedUserCircle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

const CollegeCard = () => {
  const { colleges, status, page } = useSelector((state) => state.AllCollege);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status !== 'succeeded') {
      dispatch(fetchColleges(page));
    }
  }, [ page, status, dispatch]);
  return (
    <div className='bg-[#182237] px-6 py-4 w-full rounded-lg flex gap-5 cursor-pointer hover:bg-[#2e374a]'>
      <MdSupervisedUserCircle className='mt-1 text-xl' />
      <div className='flex flex-col gap-2'>
        <span>Total College</span>
        <span className='text-sm font-light'>{colleges?.totalDocuments}</span>
        <span className='font-light text-sm'>
          <span className='text-lime-600'> </span> Total colleges listed
        </span>
      </div>
    </div>
  )
}

export default CollegeCard
