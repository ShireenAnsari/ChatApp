import React from 'react'
import Conversation from './conversation'
import _useGetConversation from '../../hooks/_useGetConversation'
import { getRandomEmoji } from '../../utils/emojis'
const Conversations = () => {
	const{loading,conversations}=_useGetConversation()
	// console.log(conversations.data)
	const convo=conversations?.data
	console.log(convo?.fullName)
  return (
    <div className='py-2 flex flex-col overflow-auto'>
		{convo?.map((c,idx)=>(
			<Conversation
			key={c._id}
			conversation={c}
			emoji={getRandomEmoji()}
			lastidx={idx===convo.length-1}
			 />
		))}
		{loading?<span className='loading loading-spinner mx-auto'></span>:null}
		
       
	</div>
  )
}

export default Conversations