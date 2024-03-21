'use client'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { fetchCourses } from '@/store/slices/singleCollegeSlice';

const CourseDetails = ({ courses }) => {
    const allCourse = courses?.data?.courses
    // console.log(typeof allCourse, allCourse)
    return (
        <div className='pt-6'>
            <h3>Course Details:</h3>
            <div className='text-sm pt-2 px-4 space-y-2 text-[#b7bac1]'>
                {allCourse?.map((course, index) => {
                    return (
                        <div key={index} className='grid grid-cols-3 border p-2 rounded-lg'>
                            <div>Course Name: {course.courseName}</div>
                            <div className='col-span-2'>Full Name: {course.fullName}</div>
                            <div className='col-span-3'>Branches: {course.branches.join(', ')}</div>
                            <div>Fees: {course.fee}</div>
                            <div>Eligibility: {course.eligibility}</div>
                            <div>Duration: {course.duration}</div>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}

export default CourseDetails
