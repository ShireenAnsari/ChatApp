import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
  <div className='w-full p-6  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 '>
  <h1 className='text-3xl font-semibold text-center text-gray-300'>Login
  <span className='text-blue-500'>ChatApp</span>
  </h1>
  <form>
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
    <a href="#" className='text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block'>Don't have an accout?</a>
    <div>
    <button className="btn w-full btn-primary">Login</button>
    </div>
    
  </form>
  </div>

    </div>
  )
}

export default Login