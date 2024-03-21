import Image from 'next/image'
import React from 'react'
import { MdEmail, MdPhone, MdSchool } from 'react-icons/md'
import { FaUser } from "react-icons/fa";
import Link from 'next/link';

const page = () => {
  return (
    <div className='flex gap-6 mt-5'>
            {/* info container */}
            <div className='flex-1 bg-[#182237] p-4 rounded-lg font-bold text-[#b7bac1] h-max'>
                <div className='w-full h-48 relative overflow-hidden rounded-lg mb-5'>
                    <Image src='/avatar.png' alt='' fill />
                </div>
                Pradeep Maurya
            </div>
            {/* form container */}
            <div className='flex-[3] bg-[#182237] p-4 rounded-lg space-y-4'>
                <div className='text-lg font-semibold'>My Profile</div>
                <div className='flex justify-between'>
                <div>
                    <div className='flex gap-3'>
                        <MdEmail className='text-2xl' />
                        Email :
                        <span className='text-[#b7bac1]'> pradeepmaurya1606@gmail.com</span>
                    </div>
                    <div className='flex gap-3'>
                        <MdPhone className='text-2xl' />
                        Mobile :
                        <span className='text-[#b7bac1]'> 6388924753</span>
                    </div>
                    <div className='flex gap-3'>
                        <MdSchool className='text-2xl' />
                        Qualification :
                        <span className='text-[#b7bac1]'> B.tech</span>
                    </div>
                    <div className='flex gap-3'>
                        <FaUser className='text-2xl' />
                        Gender :
                        <span className='text-[#b7bac1]'> B.tech</span>
                    </div>

                    <div className='mt-20 mb-6'>
                        <div className='flex gap-3'>
                            Created At :
                            <span className='text-[#b7bac1]'> 10/03/2047</span>
                        </div>
                        <div className='flex gap-3'>
                            Updated At :
                            <span className='text-[#b7bac1]'> 10/03/2047</span>
                        </div>
                        <div className='flex gap-3'>
                            Created By :
                            <span className='text-[#b7bac1]'> Self</span>
                        </div>
                        <div className='flex gap-3'>
                            Created By :
                            <span className='text-[#b7bac1]'> Self</span>
                        </div>
                    </div>
                </div>
                <div className='px-4'>
                    <Link href='/dashboard/profile/edit-profile'>
                        <button className='px-3 py-1 border-none rounded-md cursor-pointer bg-teal-600'>Edit</button>
                    </Link>
                </div>
                </div>
            </div>
        </div>
  )
}

export default page
