'use client'
import { fetchAllusers } from '@/store/slices/userSlice'
import React, { useEffect } from 'react'
import { MdSupervisedUserCircle } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
const UserCard = () => {
  const dispatch = useDispatch()
  const { users, status } = useSelector((state) => state.User)
  useEffect(() => {
    if (status !== 'succeeded') {
      dispatch(fetchAllusers())
    }
  }, [dispatch, status])
  return (
    <div className='bg-[#182237] px-6 py-4 w-full rounded-lg flex gap-5 cursor-pointer hover:bg-[#2e374a]'>
      <MdSupervisedUserCircle className='mt-1 text-xl' />
      <div className='flex flex-col gap-2'>
        <span>Website User</span>
        <span className='text-sm font-light'>{users.length}</span>
        <span className='font-light text-sm'>
          <span className='text-lime-600'></span>All website user
        </span>
      </div>
    </div>
  )
}

export default UserCard
