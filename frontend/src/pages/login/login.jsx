import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogin from '../../hooks/_useLoggin.js';
import { _useauth } from '../../context/Authcontext.jsx';

const Login = () => {

  const [input,setInput]=useState({
    username:"",
    password:""
  })
  const {loading,login}=useLogin()
  const HandleSubmit=async(e)=>{
    e.preventDefault();
   await login(input);

  }
  const path=useNavigate();
  const [currentUser]=_useauth();
  console.log(currentUser);
 useEffect(()=>{
  if(currentUser)
  {
 return  path('/');
  }
 },[currentUser])
 
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto '>
  <div className='w-full p-6  bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 '>
  <h1 className='text-3xl font-semibold text-center text-gray-300'>Login
  <span className='text-blue-500'>ChatApp</span>
  </h1>
  <form onSubmit={HandleSubmit}>
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
    <Link to={'/signup'} className='text-sm text-white mb-5 mt-2 inline-block'>Don't have an account? <b className=' text-blue-400 underline'>Signup</b></Link>
    <div>
    <button type='submit' className="btn w-full btn-primary">Login</button>
    </div>
    
  </form>
  </div>

    </div>
  )
}

export default Login