import React from 'react'
import './message.css'
import { format } from 'timeago.js';



const Message = ({message,own}) => {
  return (
    <div className={own?"message own":"message"}>
        <div className="messageTop">
            <img
            className='messageImg'
             src="https://imgs.search.brave.com/6IT59uEkaIRef7x2PVhd8-if-e32GFsN1tGuZgZAuFU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly92YXJp/ZXR5LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8xMS9T/Y3JlZW4tU2hvdC0y/MDIzLTExLTA5LWF0/LTUuMDYuMTItUE0u/cG5nP3c9MTAwMCZo/PTU2MyZjcm9wPTE" alt="" />
             <p className='messageText'>
              {message?.text}
              </p>
        </div>
        <div className="messageBottom" >{format(message?.createdAt)}</div>
    </div>
  )
}

export default Message
