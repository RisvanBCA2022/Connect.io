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
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const [socket,setSocket]=useState(null)
  const {user}=useContext(AuthContext)

  const socket=useRef()
  const scrollRef=useRef()

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.member.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);


  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);


  // useEffect(()=>{
  //   socket?.on("welcome",message=>{
  //     console.log(message);
  //   })
  // },[socket])
  

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
  },[user?._id])
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

  const receiverId = currentChat.member.find(member=>member!==user._id)
  socket.current.emit("sendMessage",{
    senderId:user._id,
    receiverId,
    text:newMessage
  })

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
          {conversations.map((con,i)=>(
            <div onClick={()=>setCurrentChat(con)} key={i}>
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
            <ChatOnline
            onlineUsers={onlineUsers}
            currentId={user?._id}
            setCurrentChat={setCurrentChat}
            />

          </div>
        </div>

      </div>
    </>
  )
}

export default Messenger
