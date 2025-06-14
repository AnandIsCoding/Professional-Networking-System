import React from 'react'
import { FaImage } from "react-icons/fa6";
import { FcGallery } from "react-icons/fc";


function WritePostModal() {
    
  return (
    <div>
      <textarea rows={8} placeholder='What do you want to talk about ? ' className='my-3 outline-none text-xl p-2 w-[100%]'></textarea>

      <div>
        <img src='https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='image' className='w-20 h-20 rounded-xl' />
      </div>

      <div className='flex justify-between'>
        {/* input */}
        <div className='my-2'>
            <label htmlFor='inputfile' className='cursor-pointer'> <FcGallery size={25} color='blue' /> </label>
            <input id='inputfile' className='hidden' type='file' />
        </div>
        {/* post it */}
        <div className='bg-blue-700 rounded-xl px-5 py-2 cursor-pointer h-fit text-white' >Post</div>
      </div>
    </div>
  )
}

export default WritePostModal