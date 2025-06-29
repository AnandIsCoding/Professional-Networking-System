import React from 'react'
import Card from './Card'

function ProfileCard({user}) {
  // console.log(user.profilePic)
  
  return (
  <Card padding={0}>
    <div className='h-22 w-full relative rounded-md  '>
      <div className='relative w-full h-18 rounded-t-md'>
        <img src={user?.profileBanner} alt='Profile_Banner' className='w-full h-full object-cover rounded-t-md' />
      </div>
      <div className='absolute left-5 top-8 h-16 w-16 rounded-full p-[2px] bg-white z-10'>
        <img src={user?.profilePic} alt='Profile_Banner' className='w-full h-full object-cover rounded-full' />
      </div>
    </div>
    
    <div className='p-4'>
      <h1 className='text-xl font-medium'>{user?.fullName}</h1>
      <p className='text-xs'>{user?.headline}</p>
      <p className='text-xs'>{user?.currentLocation}</p>
      <p className='text-xs md:mt-2'>{user?.currentCompany}</p>
    </div>

  </Card>
  )
}

export default ProfileCard
