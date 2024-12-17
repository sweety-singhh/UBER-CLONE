import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='h-screen relative overflow-hidden'>
    <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
    <div className='bg-white pb-8 py-4 px-4'>
                {/* image for temporary use  */}
                <h2 className='text-3xl font-semibold'>Get Started with Uber</h2>
              <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5' >Continue</Link>
            </div>
            </div>
  )
}

export default Start
