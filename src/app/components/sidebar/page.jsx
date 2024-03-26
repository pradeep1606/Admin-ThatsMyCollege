'use client'
import React from 'react';
import { MdDashboard, MdLogout } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { RiSchoolFill } from "react-icons/ri";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdDashboard />,
  },
  {
    title: 'Student Admission',
    path: '/dashboard/admission',
    icon: <HiUsers />,
  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: <HiUsers />,
  },
  {
    title: 'Colleges',
    path: '/dashboard/colleges',
    icon: <RiSchoolFill />,
  }
]

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogoOut=()=>{
    localStorage.removeItem('authToken');
    router.push('/login')
    toast.success('Logout successful')
  }
  return (
    <div className='sticky top-10'>
      <div className='relative flex justify-center items-center'>
        <Image className='object-cover w-auto h-auto' src='/tmc_lightblue.png' priority={true} alt='tmc' width={80} height={70} />
        <h1 className='text-xl font-semibold'>ThatsMyCollege</h1>
      </div>
      
      <ul className='mt-10'>
        {menuItems.map((menu) =>
          <li className='' key={menu.title}>
            <Link className={`flex rounded-lg px-5 py-3 items-center gap-2 hover:bg-[#2e374a] ${pathname === menu.path ? ('bg-[#2e374a]'):('') }`} href={menu.path}>{menu.icon} {menu.title}</Link>
          </li>
        )
        }
      </ul>
      <button onClick={handleLogoOut} className='flex items-center pt-1 p-5 gap-2 cursor-pointer rounded-lg w-full border-none bg-none hover:bg-[#2e374a]'><MdLogout />Logout</button>
    </div>
  )
}

export default Sidebar;
