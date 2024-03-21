import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const Auth = createContext();
export const _useauth = () => useContext(Auth);

const Authcontext = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
console.log(currentUser);
  const _useCurrentUser = async () => {
    try {
      const { data } = await axios.get("/users/get-current", {
        withCredentials: true
      });
      console.log(data);
      setCurrentUser(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:3000/api";
    axios.defaults.withCredentials = true;
    
    if (window) {
      _useCurrentUser();
    }
  }, []);

  return (
    <Auth.Provider value={[currentUser,setCurrentUser]}>
      {children}
    </Auth.Provider>
  );
};

export default Authcontext;
