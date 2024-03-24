'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { MdEmail, MdPhone, MdSchool } from 'react-icons/md'
import { FaUser } from "react-icons/fa";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '@/store/slices/userSlice';
import { usePathname } from 'next/navigation';

const SingleUserPage = () => {
    const pathname = usePathname();
    const userId = pathname.split('/').pop();
    const dispatch = useDispatch();
    const { singleUser, status1, error1 } = useSelector(state => state.User);

    useEffect(() => {
        if (status !== 'succeeded') {
            dispatch(fetchSingleUser(userId))
        }
    }, [dispatch, userId])

    if (status1 === 'loading') {
        return <div>Loading...</div>;
    }
    if (status1 === 'failed') {
        return <div>Api Error: {error1}</div>;
    }

    const { createdAt, email, firstName, gender, isDeleted, lastName, phone, profilePic, qualification, role, updatedAt, _id } = singleUser?.data || {};

    return (
        <div className='flex gap-6 mt-5'>
            {/* info container */}
            <div className='flex-1 bg-[#182237] p-4 rounded-lg font-bold text-[#b7bac1] h-max'>
                <div className='w-full h-48 relative overflow-hidden rounded-lg mb-5'>
                    <Image src={profilePic || '/avatar.png'} alt='' fill />
                </div>
                {firstName + ' ' + lastName}<br />
            </div>

            {/* User details */}
            <div className='flex-[3] bg-[#182237] p-4 rounded-lg space-y-4'>
                <div className='text-lg font-semibold'>User Details</div>
                <div className='flex justify-between'>
                    <div>
                        <div className='flex gap-3'>
                            <MdEmail className='text-2xl' />
                            Role :
                            <span className='text-[#b7bac1]'>{role}</span>
                        </div>
                        <div className='flex gap-3'>
                            <MdEmail className='text-2xl' />
                            Email :
                            <span className='text-[#b7bac1]'>{email}</span>
                        </div>
                        <div className='flex gap-3'>
                            <MdPhone className='text-2xl' />
                            Mobile :
                            <span className='text-[#b7bac1]'>{phone}</span>
                        </div>
                        <div className='flex gap-3'>
                            <MdSchool className='text-2xl' />
                            Qualification :
                            <span className='text-[#b7bac1]'>{qualification}</span>
                        </div>
                        <div className='flex gap-3'>
                            <FaUser className='text-2xl' />
                            Gender :
                            <span className='text-[#b7bac1]'>{gender}</span>
                        </div>

                        <div className='mt-20 mb-6'>
                            <div className='flex gap-3'>
                                isDeleted :
                                <span className='text-[#b7bac1]'>{isDeleted ? 'True' : 'False'}</span>
                            </div>
                            <div className='flex gap-3'>
                                Created At :
                                <span className='text-[#b7bac1]'>{createdAt?.slice(0, 10)}</span>
                            </div>
                            <div className='flex gap-3'>
                                Updated At :
                                <span className='text-[#b7bac1]'>{updatedAt?.slice(0, 10)}</span>
                            </div>
                        </div>
                    </div>
                    <div className='px-4'>
                        <Link href='/dashboard/users/edit-user'>
                            <button className='px-3 py-1 border-none rounded-md cursor-pointer bg-teal-600'>Edit</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleUserPage
