'use client'
import Link from 'next/link'
import React from 'react'
import FormComp from '../../../addCollege/formComp'
import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'

const EditCollege = () => {
  const pathname = usePathname()
  const clgId = pathname.split('/').pop();
  const { college, status, error } = useSelector((state) => state.SingleCollege);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Api Error: {error}</div>;
  }

  // Set initial form values based on college data
  const initialForm = {
    name: college?.data?.college?.name || '',
    address: college?.data?.college?.address || '',
    contact: college?.data?.college?.contact || '',
    city: college?.data?.college?.city || '',
    state: college?.data?.college?.state || '',
    collegeType: college?.data?.college?.collegeType || '',
    established: college?.data?.college?.established || 0,
    university: college?.data?.college?.university || '',
    logo: college?.data?.college?.logo || '',
    image: college?.data?.college?.image || '',
    message: college?.data?.college?.message || '',
    details: college?.data?.college?.details || '',
    rating: college?.data?.college?.rating || 0,
    featured: college?.data?.college?.featured || false
  };

  // console.log(initialForm.name, initialForm.city);

  return (
    <div className='flex flex-col gap-6 mt-5'>
      {/* form container */}
      <div className='w-full bg-[#182237] py-4 px-10 rounded-lg'>
        <div className='text-white text-xl font-semibold mt-2 mb-5 space-x-4'>
          <span>Edit College Details</span>
        </div>
        {/* form */}
        <FormComp initialForm={initialForm} method={'patch'} path={`/college/${clgId}`} />
      </div>
    </div>
  );
};

export default EditCollege;
