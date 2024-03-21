import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import {BiLogOut} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { _useauth } from '../../context/Authcontext'
const LogoutButton = () => {
  const [currentUser,setCurrentUser]=_useauth();
  const path=useNavigate();
  const Logout=async()=>
  {
    try {
  const res=    await axios.post('/users/Logout',{
        withCredentials: true
      })
     

      if(res.status===200)
      {
        toast.success('Logged out succcessfully');
       
          return path('/login')
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    setCurrentUser(null)
  },[])
  return (
    <div className='mt-auto flex font-semibold text-white'>
      Logout  <BiLogOut onClick={Logout} className='w-6 h-6 text-white cursor-pointer'/>
    </div>
  )
}

export default LogoutButton