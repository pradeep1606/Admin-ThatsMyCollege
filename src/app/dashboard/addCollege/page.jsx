'use client'
import Link from 'next/link'
import React from 'react'
import FormComp from './formComp'

const initialForm = {
  name: '',
  address: '',
  contact: '',
  city: '',
  state: '',
  collegeType: '',
  established: 0,
  university: '',
  logo: '',
  image: '',
  message: '',
  details: '',
  rating: 0,
  featured: false
}

const AddCollege = () => {
  return (
    <div className='flex flex-col gap-6 mt-5'>
      {/* form container */}
      <div className='w-full bg-[#182237] py-4 px-10 rounded-lg'>
        <div className='text-white text-xl font-semibold mt-2 mb-5 space-x-4'>
          <span>Add College Details</span>
          <Link href='/dashboard/addCourse' className='text-xs bg-teal-600 rounded-md p-1'>+Add Course</Link>
        </div>
        {/* form */}
        <FormComp initialForm={initialForm} method={'post'} path='/college' />
      </div>
    </div>
  )
}

export default AddCollege
