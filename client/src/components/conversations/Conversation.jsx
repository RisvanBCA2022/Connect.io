import React, { useEffect, useState } from 'react'
import './conversation.css'
import { axiosInstance } from '../../axiosInstance'

const Conversation = ({Conversation,currentuser}) => {
  const [user,setuser]=useState(null)
  const PF =import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

  useEffect(()=>{
    const friendId = Conversation.member.find(m=>m!==currentuser._id)
    const getUser =async ()=>{
      try {
        const res = await axiosInstance("/users?userId="+friendId)    
        setuser(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getUser()
  },[currentuser,Conversation])
  return (
    <div className='conversation'>
        <img src={user?.profilePicture?user.profilePicture:PF+"person/noAvatar.png"} alt="" className='conversationImg' />
        <span className='coversationName'>{user?.username}</span>
      
    </div>
  )
}

export default Conversation
