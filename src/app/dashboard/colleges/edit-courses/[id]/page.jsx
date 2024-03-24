'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import EditCourseField from '../EditCourseField'

const EditCourse = () => {
  const pathname = usePathname();
  const parts = pathname.split("/").pop().split("-");
  const clgId = parts[0].trim();
  const clgName = decodeURIComponent(parts.slice(1).join('-').trim());
  console.log(clgId, clgName)
  return (
    <div className='flex flex-col gap-6 mt-5'>
      {/* form container */}
      <div className='w-full bg-[#182237] py-4 px-10 rounded-lg'>
        <div className='text-white text-xl font-semibold mt-2 mb-5 space-x-4'>
          <span> Edit Course Details</span>
        </div>
        <EditCourseField clgId={clgId} clgName={clgName} />
      </div>
    </div>
  )
}

export default EditCourse
