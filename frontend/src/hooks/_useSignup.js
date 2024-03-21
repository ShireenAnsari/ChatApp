import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast'
export const _useSignup=()=>{
    const [loading,setLoading]=useState(false);
    const Signupfunc=async(inputs)=>{
        console.log(inputs)

        try {
            
            setLoading(true)
      const res= await axios.post('http://localhost:3000/api/users/signUp',inputs);
      console.log(res);
           
           if(res.status===201)
           {
            toast.success('User created successfully Now you can Login');
           }
          
        } catch (error) {
            if(error.response.status===409)
            {
                toast.error(error.response?.data.message);
                console.log(error.response.data.message)
            }
            if(error.response.status===400)
            {
                toast.error(error.response?.data.message);
                console.log(error.response.data.message)
            }
            if(error.response.status===401)
            {
                toast.error(error.response?.data.message);
                console.log(error.response.data.message)
            }
            if(error.response.status===500)
            {
                toast.error(error.response?.data.message);
                console.log(error.response.data.message)
            }
           
           
            console.log(error);
        }
        finally{
            setLoading(false)
        }
    }
    return {Signupfunc,loading}
}

