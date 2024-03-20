import MessageContainer from "../../components/messages/Messagecontainer";
import Sidebartab from "../../components/sidebar/Sidebar";



const Home = () => {
	return (
		<div className='flex sm:h-[500px] md:h-[650px] w-[900px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			<Sidebartab/>
			<MessageContainer />
		</div>
	);
};
export default Home;
