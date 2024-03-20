import React from 'react'
import Gendercheckbox from './Gendercheckbox'
const Signup = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
  <div className='w-full p-6  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 '>
  <h1 className='text-3xl font-semibold text-center text-gray-300'>Signup
  <span className='text-blue-500'>ChatApp</span>
  </h1>
  <form>
    <div>
    <label className='label p-2'>
      <span className='text-base label-text text-white'>Fullname</span>
    </label>
    <input type="text" placeholder="Enter username" className="input input-bordered w-full max-w-xs" />
    </div>
    <div>
    <label className='label p-2'>
      <span className='text-base label-text text-white'>Username</span>
    </label>
    <input type="text" placeholder="Enter username" className="input input-bordered w-full max-w-xs" />
    </div>
    <div>
    <label className='label p-2'>
      <span className='text-base label-text text-white'>Password</span>
    </label>
    <input type="password" placeholder="Enter username" className="input input-bordered w-full max-w-xs" />
    </div>
    <div>
    <label className='label p-2'>
      <span className='text-base label-text text-white'>Confirm Password</span>
    </label>
    <input type="password" placeholder="Enter username" className="input input-bordered w-full max-w-xs" />
    </div>
    <Gendercheckbox/>
    <a href="#" className='text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an account? <b className=' text-blue-400 underline'>Login</b></a>
    <div>
    <button className="btn btn-primary">Signup</button>
    </div>
    
  </form>
  </div>

    </div>
  )
}

export default Signup