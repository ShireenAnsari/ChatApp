import axios from "axios"
import { useEffect, useState } from "react"

const _useGetConversation = () => {
  const [loading,setLoading]=useState(false)
  const [conversations,setconversation]=useState([])
  const GetConversation=async()=>{
    try {
        setLoading(true)
        const res=await axios.get('/users/getsidebarusers',{withCredentials:true})
        console.log(res);
        setconversation(res?.data)
    } catch (error) {
        console.log(error)
    }
    finally{
        setLoading(false)
    }
}
  useEffect(()=>{
    GetConversation()
  },[])
  return {loading,conversations}
}

export default _useGetConversation