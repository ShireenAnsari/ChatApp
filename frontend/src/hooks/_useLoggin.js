import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	// const { setAuthUser } = useAuthContext();
    const route=useNavigate();

	const login = async (inputs) => {
		setLoading(true);
        try {
            
            setLoading(true)
           
      const res= await axios.post('http://localhost:3000/api/users/login',inputs);
      console.log(res);
           route('/');
           if(res.status===200)
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
            
           
           
            console.log(error);
        }
        finally{
            setLoading(false)
        }
	};

	return { loading, login };
};
export default useLogin;

