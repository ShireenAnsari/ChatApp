import { useNavigate } from "react-router-dom";
import MessageContainer from "../../components/messages/Messagecontainer";
import Sidebartab from "../../components/sidebar/Sidebar";
import { _useauth } from "../../context/Authcontext";
import { useEffect } from "react";



const Home = () => {
	const [currentUser]=_useauth();
	const path=useNavigate();
	useEffect(()=>{
		if(currentUser===null)
		{
		return	path('/login');
	
		}
	},[])
	
	return (
		<div className='flex sm:h-[500px] md:h-[650px] w-[900px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebartab/>
			<MessageContainer />
		</div>
	);
};
export default Home;
