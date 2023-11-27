import React, { useContext, useEffect, useRef, useState } from 'react'
import Topbar from '../../components/topbar/Topbar'
import './messenger.css'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { AuthContext } from '../../context/AuthContext'
 import { axiosInstance } from '../../axiosInstance'
 import {io} from "socket.io-client"

const Messenger = () => {

  const [conversations,setConversations]=useState([])
  const [currentChat,setCurrentChat]=useState(null)
  const [messages,setMessages]=useState([])
  const [newMessage,setnewMessage]=useState([])
  const [socket,setSocket]=useState(null)


  const scrollRef=useRef()

  useEffect(()=>{
    setSocket(io("ws://localhost:8900"))
  },[])

  
  const {user}=useContext(AuthContext)

  useEffect(()=>{
    const getConversations= async ()=>{
      try {
        const res=await axiosInstance.get("/conversations/"+user._id)
        setConversations(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getConversations()
  },[user._id])
useEffect(()=>{
  const getmessages= async ()=>{

  try {
      const res= await axiosInstance.get("/messages/"+currentChat?._id)
      setMessages(res.data)
    } 
   catch (error) {
    console.log(error);
  }
}
  getmessages()
  
},[currentChat])
console.log(messages);


const handlesubmit = async(e)=>{
  e.preventDefault()
  const message ={
    sender:user._id,
    text:newMessage,
    conversationId:currentChat._id,
  }

  try {
    const res=await axiosInstance.post("/messages",message)
    setMessages([...messages,res.data])
    setnewMessage("")
  } catch (error) {
    console.log(error);
  }
}

useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior:"smooth"})
},[messages])
  return (
    <>
      <Topbar/>
      <div className='messenger'>
        <div className='chatMenu'>
          <div className="chatMenuWrapper">
            <input type="text" placeholder='search friends' className='chatMenuInput' />
          {conversations.map((con)=>(
            <div onClick={()=>setCurrentChat(con)}>
                 <Conversation Conversation={con} currentuser={user} />
            </div>
          ))}
          </div>
        </div>
        <div className='chatBox'>
          <div className="chatBoxWrapper">
            {
              currentChat?
              <>
            
            <div className="chatBoxTop">
              {messages.map(m=>(
                <div ref={scrollRef}>

                  <Message message={m} own={m.sender ===user._id} />
                </div>

              ))}
              

            </div>
            <div className="chatBoxBottom">
              <textarea className='chatMessageInput' placeholder='write something...' onChange={(e)=>setnewMessage(e.target.value)}
              value={newMessage}></textarea>
              <button className='chatSubmitButton' onClick={handlesubmit} >Send</button>
            </div></>:<span className='noConversationText'>Open a conversation to start a chat</span>}
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
