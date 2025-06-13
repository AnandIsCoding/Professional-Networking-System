import React from 'react'
import Card from './Card'

function ProfileCard() {
  return (
  <Card padding={0}>
    <div className='h-22 w-full relative rounded-md  '>
      <div className='relative w-full h-18 rounded-t-md'>
        <img src='https://plus.unsplash.com/premium_photo-1670934158407-d2009128cb02?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFubmVyfGVufDB8fDB8fHww' alt='Profile_Banner' className='w-full h-full object-cover rounded-t-md' />
      </div>
      <div className='absolute left-5 top-8 h-16 w-16 rounded-full p-[2px] bg-white z-10'>
        <img src='https://res.cloudinary.com/dm0rlehq8/image/upload/v1734635541/Tinder/jonmvwzqgpscaw1lazgz.jpg' alt='Profile_Banner' className='w-full h-full object-cover rounded-full' />
      </div>
    </div>
    
    <div className='p-4'>
      <h1 className='text-xl font-medium'>Anand Jha</h1>
      <p className='text-xs'>Software Engineer</p>
      <p className='text-xs'>Banglore baby</p>
      <p className='text-xs md:mt-2'>Uber, Google</p>
    </div>

  </Card>
  )
}

export default ProfileCard
