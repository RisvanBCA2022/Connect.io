import React, { useContext, useEffect, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import './messenger.css'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
// import { axios } from 'axios';

const Messenger = () => {

  const [conversations,setConversations]=useState([])
  
  const {user}=useContext(AuthContext)

  // useEffect(()=>{
  //   const getConversations= async ()=>{
  //     try {
  //       const res=await axios.get("/conversations/"+user._id)
  //       console.log(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getConversations()
  // },[user])
  return (
    <>
      <Topbar/>
      <div className='messenger'>
        <div className='chatMenu'>
          <div className="chatMenuWrapper">
            <input type="text" placeholder='search friends' className='chatMenuInput' />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className='chatBox'>
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message/>
              <Message own={true} />
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>

            </div>
            <div className="chatBoxBottom">
              <textarea className='chatMessageInput' placeholder='write something...'></textarea>
              <button className='chatSubmitButton' >Send</button>
            </div>
          </div>
        </div>
        <div className='chatOnline'>
          <div className="chatOnlineWrapper">
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>
            <ChatOnline/>

          </div>
        </div>

      </div>
    </>
  )
}

export default Messenger
