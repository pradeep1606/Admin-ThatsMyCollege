'use client'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Search from '../../components/userSearch/page'
import Link from 'next/link'
import Pagination from '../pagination/pagination'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllusers } from '@/store/slices/userSlice'
import UserSearch from '@/app/components/userSearch/page'

const User = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.User)
  useEffect(() => {
    if (status !== 'succeeded') {
      dispatch(fetchAllusers())
    }
  }, [dispatch, status])

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (status === 'failed') {
    return <div>Api Error: {error}</div>;
  }
  return (
    <div className='bg-[#182237] p-4 rounded-lg mt-5'>
      <div className='flex justify-between'>
        <h2 className='text-lg mb-5 text-[#b7bac1] font-normal'>ThatsMyCollege Users</h2>
        <span><UserSearch /></span>
      </div>
      <div>Total {users.length} Users</div>
      <table className='w-full'>
        <thead>
          <tr>
            <td className='p-2'>Name</td>
            <td className='p-2'>Mobile</td>
            <td className='p-2'>Email</td>
            <td className='p-2'>Created At</td>
            <td className='p-2'>Role</td>
            <td className='p-2'>Action</td>
          </tr>
        </thead>
        <tbody className='text-sm'>
          {users?.map((user, index) => {
            return (
              <tr key={user._id}>
                <td className='p-2'>
                  <div className='flex gap-2 items-center'>
                    <Image className='object-cover rounded-full ' src={user?.profilePic || '/no_image.png'} alt='User' width={40} height={40} />
                    {user?.firstName + " " + user?.lastName}
                  </div>
                </td>
                <td className='p-2'>{user?.phone}</td>
                <td className='p-2'>{user?.email}</td>
                <td className='p-2'>{user?.createdAt?.slice(0, 10)}</td>
                <td className='p-2'>{Array.isArray(user?.role) && user?.role.length > 0 ? user?.role.join(', ') : 'USER'}</td>
                <td className='p-2'>
                  <div className='flex gap-2'>
                    <Link href={`/dashboard/users/${'User Details'}&${user?._id}`}>
                      <button className='px-2 py-1 border-none rounded-md cursor-pointer bg-teal-600'>View</button>
                    </Link>
                    <button className='px-2 py-1 border-none rounded-md cursor-pointer bg-[#DC143C]'>Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <Pagination /> */}
    </div>
  );
};

export default User;
