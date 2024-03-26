'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { MdCalendarMonth, MdLocationCity, MdLocationPin, MdMessage, MdPhone, MdSchool } from 'react-icons/md'
import { FaCity, FaUniversity, FaStar } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import { CiBookmarkCheck } from "react-icons/ci";
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { fetchSingleColleges } from '@/store/slices/singleCollegeSlice';
import GetAdmin from '@/app/components/getAdmin/page';
import CourseDetails from '@/app/components/courseDetails/page';

const SingleCollegePage = () => {
    const pathname = usePathname()
    const clgId = pathname.split('/').pop();
    const { college, status, error } = useSelector((state) => state.SingleCollege);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleColleges(clgId))
    }, [clgId, dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (status === 'failed') {
        return <div>Api Error: {error}</div>;
    }
    const { _id, name, address, city, collegeType, contact, createdAt, createdBy, details, message, established, featured = false, image, isDeleted, logo, rating, state, university, updatedAt, updatedBy } = college?.data?.college || {};
    const courses = college?.data?.courses
    return (
        <div className='flex mt-4 pt-4 bg-[#182237] rounded-md'>
            {/* logo & name */}
            <div className='px-4 flex-1'>
                <div className='text-lg font-semibold'>College Details</div>
                <div className='flex-1 p-4 rounded-lg font-bold text-[#b7bac1] h-max mt-4'>
                    <div className='w-full h-32 relative overflow-hidden rounded-lg mb-5'>
                        <Image src={logo || '/no_logo.png'} alt='' fill />
                    </div>
                    {name}
                </div>
            </div>

            {/* College details */}
            <div className='flex-[3] bg-[#182237] py-2 px-3 rounded-lg space-y-4'>
                <div className='flex justify-between'>
                    <div className='space-y-2'>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex gap-3 col-span-2'>
                                <MdLocationPin className='text-xl' />
                                Address:
                                <span className='text-[#b7bac1] text-sm'>{address}</span>
                            </div>
                            <div className='flex gap-3 col-span-2'>
                                <MdPhone className='text-xl' />
                                Contact:
                                <span className='text-[#b7bac1] text-sm'>{contact?.join(', ')}</span>
                            </div>
                            <div className='flex gap-3'>
                                <MdLocationCity className='text-xl' />
                                City:
                                <span className='text-[#b7bac1] text-sm'>{city}</span>
                            </div>
                            <div className='flex gap-3'>
                                <FaCity className='text-xl' />
                                State:
                                <span className='text-[#b7bac1] text-sm'>{state}</span>
                            </div>
                            <div className='flex gap-3 col-span-2'>
                                <MdSchool className='text-xl flex-1 -ml-1' />
                                CollegeType:
                                <span className='text-[#b7bac1] text-sm flex-[18]'>{collegeType?.join(', ')}</span>
                            </div>
                            <div className='flex gap-3'>
                                <MdCalendarMonth className='text-xl' />
                                Established:
                                <span className='text-[#b7bac1] text-sm'>{established}</span>
                            </div>
                            <div className='flex gap-3 col-span-2'>
                                <FaUniversity className='text-xl' />
                                University:
                                <span className='text-[#b7bac1] text-sm'>{university}</span>
                            </div>
                            <div className='flex gap-3 col-span-2'>
                                <IoMdImages className='text-xl' />
                                Images:
                                <span>
                                    {image?.map((url, index) => (
                                        <div key={index} className='text-[#b7bac1] text-sm'>{url?.split('/').slice(-2).join('/')}</div>
                                    ))}</span>
                            </div>
                            <div className='flex gap-3 col-span-2'>
                                <MdMessage className='text-xl flex-1 -ml-1' />
                                Message:
                                <span className='text-[#b7bac1] text-sm flex-[16]'>{message}</span>
                            </div>
                            <div className='flex gap-3 col-span-2'>
                                <TbListDetails className='text-xl flex-1 -ml-1' />
                                Details:
                                <span className='text-[#b7bac1] text-sm flex-[18]'>{details}</span>
                            </div>
                            <div className='flex gap-3'>
                                <FaStar className='text-xl' />
                                Rating:
                                <span className='text-[#b7bac1] text-sm'>{rating}</span>
                            </div>
                            <div className='flex gap-3'>
                                <CiBookmarkCheck className='text-xl' />
                                Featured:
                                <span className='text-[#b7bac1] text-sm'>{featured ? 'True' : 'False'}</span>
                            </div>
                        </div>

                        {/* course details */}
                        <CourseDetails courses={courses} />

                        {/* creation detail */}
                        <div className='pt-10 mb-6'>
                            <div className='flex gap-3'>
                                isDelete :
                                <span className='text-[#b7bac1] text-sm'>{isDeleted ? 'True' : 'False'}</span>
                            </div>
                            <div className='flex gap-3'>
                                Created At :
                                <span className='text-[#b7bac1] text-sm'>{createdAt?.slice(0, 10)}</span>
                            </div>
                            <div className='flex gap-3'>
                                Created By :
                                <span className='text-[#b7bac1] text-sm'>
                                    <span className='text-[#b7bac1] text-sm'>{createdBy && createdBy !== 'NA' ?
                                        <GetAdmin id={createdBy || ''} /> :
                                        <>NA</>
                                    }</span>
                                </span>
                            </div>
                            <div className='flex gap-3'>
                                Updated By :
                                <span className='text-[#b7bac1] text-sm'>{updatedBy && updatedBy !== 'NA' ?
                                    <GetAdmin id={updatedBy || ''} /> :
                                    <>NA</>
                                }</span>
                            </div>
                            <div className='flex gap-3'>
                                Updated At :
                                <span className='text-[#b7bac1] text-sm'>{updatedAt?.slice(0, 10)}</span>
                            </div>
                        </div>
                    </div>
                    {/* edit button */}
                    <div className='px-4 flex flex-col gap-2'>
                        <Link href={`/dashboard/colleges/edit-college/${_id}`}>
                            <button className='px-3 py-1 border-none rounded-md cursor-pointer bg-teal-600'>Edit College</button>
                        </Link>
                        {courses?.courses?.length ?
                            <Link href={`/dashboard/colleges/edit-courses/${_id}-${name}`}>
                                <button className='px-3 py-1 border-none rounded-md cursor-pointer bg-teal-600'>Edit Courses</button>
                            </Link> :
                            <Link href={`/dashboard/addCourse/${_id}-${name}`}>
                                <button className='px-3 py-1 border-none rounded-md cursor-pointer bg-teal-600'>Add Courses</button>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleCollegePage
