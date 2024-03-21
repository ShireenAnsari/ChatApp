import React, { useState } from 'react'
import Gendercheckbox from './Gendercheckbox'
import { Link } from 'react-router-dom'
import { _useSignup } from '../../hooks/_useSignup'
const Signup = () => {
  const {loading,Signupfunc}=_useSignup()
  const [input,setInput]=useState({
    fullName:"",
    username:"",
    password:"",
    gender:""
  })
  const HandleSubmit=async(e)=>{
    e.preventDefault();
   await Signupfunc(input);

  }
  const HandlecheckBoxChange=(gender)=>{
   setInput({...input,gender})
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
  <div className='w-full p-6  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 '>
  <h1 className='text-3xl font-semibold text-center text-gray-300'>Signup
  <span className='text-blue-500'>ChatApp</span>
  </h1>
  <form onSubmit={HandleSubmit}>
    <div>
    <label className='label p-2'>
      <span className='text-base label-text text-white'>Fullname</span>
    </label>
    <input value={input.fullName}
    onChange={(e)=>setInput({...input,fullName:e.target.value})}
     type="text" placeholder="Enter username" className="input input-bordered w-full max-w-xs" />
    </div>
    <div>
    <label className='label p-2'>
      <span className='text-base label-text text-white'>Username</span>
    </label>
    <input
    onChange={(e)=>setInput({...input,username:e.target.value})}
     type="text" value={input.username} placeholder="Enter username" className="input input-bordered w-full max-w-xs" />
    </div>
    <div>
    <label className='label p-2'>
      <span className='text-base label-text text-white'>Password</span>
    </label>
    <input type="password" value={input.password}
    onChange={(e)=>setInput({...input,password:e.target.value})}
     placeholder="Enter username" className="input input-bordered w-full max-w-xs" />
    </div>
   
    <Gendercheckbox onCheckBoxchange={HandlecheckBoxChange} selectGender={input.gender}/>
    <Link to={'/login'} className='text-sm text-white  mt-2 mb-5 inline-block'>Already have an account? <b className=' text-blue-400 underline'>Login</b></Link>
    <div>
    <button className="btn btn-primary">{loading?'...':'Signup'}</button>
    </div>
    
  </form>
  </div>

    </div>
  )
}

export default Signup