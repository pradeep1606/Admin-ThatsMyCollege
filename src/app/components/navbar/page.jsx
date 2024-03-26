'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const pathname = usePathname();
  const { userProfile } = useSelector((state) => state.auth);
  const firstName = userProfile?.user?.firstName;
  const lastName = userProfile?.user?.lastName;
  const role = userProfile?.user?.role;
  const profilePic = userProfile?.user?.profilePic;
  const email = userProfile?.user?.email;
  const id = userProfile?.user?._id;
  return (
    <div className='flex items-center justify-between p-4 rounded-lg bg-[#182237]'>
      {/* admin details */}
      <div className='flex items-center gap-5'>
        <div className='flex gap-2'>
          <Link href={`/dashboard/users/${'Admin Profile'}&${id}`}>
            <Image className='object-cover border rounded-full' src={profilePic || '/avatar.png'} width='40' height='40' alt='user' />
          </Link>
        </div>
        <div className='flex flex-col'>
          <span className='font-medium'>{firstName} {lastName}</span>
          {role && (
            <span className='text-xs text-[#b7bac1]'>{role[role.length - 1]}</span>
          )}
          <span className='text-xs text-[#b7bac1]'>{email}</span>
        </div>
      </div>

      <div className='flex gap-6'>
        {/* search */}
        <div className='flex items-center gap-2 bg-[#2e374a] p-2 rounded-lg'>
          <MdSearch />
          <input className='bg-transparent border-none text-white' type='text' placeholder='Search...' />
        </div>
        {/* icons */}
        <div className='flex justify-center items-center gap-5'>
          <MdOutlineChat className='rounded-full bg-[#2e374a] h-8 w-8 p-2' size={20} />
          <MdNotifications className='rounded-full bg-[#2e374a] h-8 w-8 p-2' size={20} />
          <MdPublic className='rounded-full bg-[#2e374a] h-8 w-8 p-2' size={20} />
        </div>
      </div>
    </div>
  )
}

export default Navbar;
