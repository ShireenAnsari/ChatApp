import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/login"
import Signup from "./pages/signup/signup"
import { _useauth } from "./context/Authcontext";


function App() {
  const [currentUser]=_useauth();
console.log({currentUser})
  console.log(currentUser);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={currentUser?<Navigate  to={'/'}/>:<Signup/>}/>
      </Routes>
    {/* login */}
    {/* <Login/> */}
    {/* <Signup/> */}
    
    </div>
  )
}

export default App
