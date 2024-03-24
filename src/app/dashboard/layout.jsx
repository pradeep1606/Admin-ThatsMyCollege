import React from 'react'
import Sidebar from '../components/sidebar/page'
import Navbar from '../components/navbar/page'
import ProtectedRoute from './ProtectedRoute'

const layout = ({children}) => {
  return (
    <ProtectedRoute>
      <div className='flex'>
        <div className='flex-1 bg-[#182237] p-5 h-full'>
          <Sidebar />
        </div>
        <div className='flex-[4] p-5'>
          <Navbar />
          {children}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default layout
