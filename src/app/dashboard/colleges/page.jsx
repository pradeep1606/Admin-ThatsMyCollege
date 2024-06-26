'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Pagination from '../pagination/pagination'
import { useSelector, useDispatch } from 'react-redux';
import { fetchColleges, setStatus, deleteCollege } from '@/store/slices/collegeSlice'
import GetAdmin from '@/app/components/getAdmin/page'
import CollegeSearch from '@/app/components/collegeSearch/page'

const Colleges = () => {
  const { colleges, status, error, page } = useSelector((state) => state.AllCollege);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status !== 'succeeded') {
      dispatch(fetchColleges(page));
    }
  }, [page, status, dispatch]);

  const handleCollegeDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this college?");
    if (confirmDelete) {
      dispatch(deleteCollege(id));
      dispatch(fetchColleges(page));
    } else {
      // console.log(id)
    }
  };

  if (status === 'failed') {
    return <div>Api Error: {error}</div>;
  }
  return (
    <div className='bg-[#182237] p-4 rounded-lg mt-5'>
      <div className='flex justify-between'>
        <h2 className='mb-5 font-normal space-x-4'>
          <span className='text-lg text-[#b7bac1]'>ThatsMyCollege Colleges</span>
          <Link href='/dashboard/addCollege' className='text-xs bg-teal-600 rounded-md p-1'>+Add College</Link>
        </h2>
        <span><CollegeSearch /></span>
      </div>
      <h4>Total {colleges?.totalDocuments} Colleges</h4>
      <table className='w-full'>
        <thead>
          <tr>
            <td className='p-2'>Name</td>
            <td className='p-2'>City</td>
            <td className='p-2'>Created At</td>
            <td className='p-2'>Created By</td>
            <td className='p-2'>Updated By</td>
            <td className='p-2'>Action</td>
          </tr>
        </thead>
        {status === 'loading' ?
          <tbody><tr><td colSpan="6">Loading...</td></tr></tbody>
          :
          <tbody className='text-sm'>
            {colleges?.colleges?.map(college => (
              <tr key={college._id}>
                <td className='p-2'>
                  <div className='flex gap-2 items-center'>
                    <Image className='object-cover rounded-full w-auto' src={college?.logo || ''} alt='User' width={40} height={40} />
                    {college?.name}
                  </div>
                </td>
                <td className='p-2'>{college?.city}</td>
                <td className='p-2'>{college.createdAt?.slice(0, 10)}</td>
                <td className='p-2'>
                  {college?.createdBy && college?.createdBy !== 'NA' ?
                    <GetAdmin id={college?.createdBy} /> :
                    <span>NA</span>
                  }
                </td>
                <td className='p-2'>
                  {college?.createdBy && college?.createdBy !== 'NA' ?
                    <GetAdmin id={college?.updatedBy || ''} /> :
                    <>NA</>
                  }
                </td>
                <td className='p-2'>
                  <div className='flex gap-2'>
                    <Link href={`/dashboard/colleges/${college._id}`}>
                      <button className='px-2 py-1 border-none rounded-md cursor-pointer bg-teal-600'>View</button>
                    </Link>
                    <button className='px-2 py-1 border-none rounded-md cursor-pointer bg-[#DC143C]' onClick={() => handleCollegeDelete(college._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        }

      </table>
      <Pagination page={page} totalDocuments={colleges?.totalDocuments} setStatus={setStatus} />
    </div>
  )
}

export default Colleges
