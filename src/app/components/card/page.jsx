import React from 'react'
import Admision from './Admision'
import UserCard from './UserCard'
import CollegeCard from './CollegeCard'

const Card = () => {
  return (
    <div className='flex justify-between mt-3 gap-5'>
      <Admision />
      <UserCard />
      <CollegeCard />
    </div>
  )
}

export default Card
