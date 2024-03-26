import React from 'react'
import { MdSupervisedUserCircle } from 'react-icons/md'

const Admision = () => {
  return (
    <div className='bg-[#182237] px-6 py-4 w-full rounded-lg flex gap-5 cursor-pointer hover:bg-[#2e374a]'>
      <MdSupervisedUserCircle className='mt-1 text-xl' />
      <div className='flex flex-col gap-2'>
        <span>Admision Details</span>
        <span className='text-sm font-light'>0</span>
        <span className='font-light text-sm'>
          <span className='text-lime-600'> </span> Admission done
        </span>
      </div>
    </div>
  )
}

export default Admision
