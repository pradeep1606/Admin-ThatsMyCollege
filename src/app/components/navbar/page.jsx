'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { MdKeyboardArrowDown, MdNotifications, MdOutlineChat, MdPublic, MdSearch } from 'react-icons/md'

const Navbar = () => {
  const pathname = usePathname();
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
              <span className='font-medium'>Pradeep Maurya</span>
              <span className='text-xs text-[#b7bac1] flex justify-end'>Administrator</span>
            </div>
            <div className='flex gap-2'>
              <Link href='/dashboard/profile'>
                <Image className='object-cover border rounded-full' src='/avatar.png' width='40' height='40' alt='user' />
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

export default Navbar
