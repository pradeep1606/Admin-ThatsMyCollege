'use client'

import Link from 'next/link';
import CourseField from './CourseField';

const AddCourses = () => {
    

    return (
        <div className='flex flex-col gap-6 mt-5'>
            {/* form container */}
            <div className='w-full bg-[#182237] py-4 px-10 rounded-lg'>
                <div className='text-white text-xl font-semibold mt-2 mb-5 space-x-4'>
                    <span> Add Course Details</span>
                    <Link href='/dashboard/addCollege' className='text-xs bg-teal-600 rounded-md p-1'>+Add College</Link>
                </div>
                <CourseField />
            </div>
        </div>
    );
};

export default AddCourses;
