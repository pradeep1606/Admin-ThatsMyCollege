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
  const firstName = userProfile?.user.firstName; // Access firstName using optional chaining
  const lastName = userProfile?.user.lastName; // Access lastName using optional chaining
  const role = userProfile?.user.role; // Access role using optional chaining
  const profilePic = userProfile?.user.profilePic; // Access profilePic using optional chaining

  return (
    <div className='flex items-center justify-between p-4 rounded-lg bg-[#182237]'>
      <div className='text-[#b7bac1] font-bold capitalize'>{pathname.split('/').pop()}</div>
      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-2 bg-[#2e374a] p-2 rounded-lg'>
          <MdSearch />
          <input className='bg-transparent border-none text-white' type='text' placeholder='Search...' />
        </div>
        <div className='flex gap-5'>
          <div className='flex justify-center items-center gap-5'>
            <MdOutlineChat className='rounded-full bg-[#2e374a] h-8 w-8 p-2' size={20} />
            <MdNotifications className='rounded-full bg-[#2e374a] h-8 w-8 p-2' size={20} />
            <MdPublic className='rounded-full bg-[#2e374a] h-8 w-8 p-2' size={20} />
          </div>
          <div className='flex items-center gap-5'>
            <div className='flex flex-col'>
              <span className='font-medium'>{firstName} {lastName}</span> {/* Concatenate firstName and lastName */}
              <span className='text-xs text-[#b7bac1] flex justify-end'>{role}</span>
            </div>
            <div className='flex gap-2'>
              <Link href='/dashboard/profile'>
                <Image className='object-cover border rounded-full' src={profilePic || '/avatar.png'} width='40' height='40' alt='user' />
              </Link>
              {/* dropdown button */}
              {/* <button><MdKeyboardArrowDown className='text-lg' /></button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
