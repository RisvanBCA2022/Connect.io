import React from 'react'
import './chatOnline.css'

const ChatOnline = () => {
  return (
    <div className='chatOnline'>
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
        <img className='chatOnlineImg' src="https://imgs.search.brave.com/X22uU9QID4EyyaV8k2Y3KrCIOq5B-GahjN_JMuwkunc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly92YXJp/ZXR5LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8xMS9T/Y3JlZW4tU2hvdC0y/MDIzLTExLTA5LWF0/LTUuMDYuMTItUE0u/cG5nP3c9MTAwMCZo/PTU2MyZjcm9wPTE" alt="" />
        <div className="chatOnlineBadge">  </div>
        </div>
        <span className="chatOnlineName">John Doe</span>
      </div>
    </div>
  )
}

export default ChatOnline
