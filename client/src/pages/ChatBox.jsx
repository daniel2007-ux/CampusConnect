import React, { useEffect, useRef, useState } from 'react'
import { dummyMessagesData, dummyUserData } from '../assets/assets'
import { ImageIcon, SendHorizonal } from 'lucide-react'

const ChatBox = () => {

  const messages = dummyMessagesData
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user, setUser] = useState(dummyUserData);
  const messagesEndRef = useRef(null)


  const send_message =async () => {
    
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior : 'smooth'})
  }, [messages])


  return user && (
    <div className='flex flex-col h-screen'>
      <div className='flex items-center gap-2 p-2 md:px-10 xl:pl-42 bg-gradient-to-r from-blue-50 to indigo-60 border-b border-gray-300'>
        <img src={user.profile_picture} className='size-8 rounded-full' alt="" />
        <div>
          <p className='font-medium'>{user.full_name}</p>
          <p className='text-sm text-gray-500 -mt-1.5'>@{user.username}</p>
        </div>
      </div>
      <div className='p-5 md:px-10 h-full overflow-y-scroll'>
        <div className='space-y-4 max-w-4xl mx-auto'>
          {
            messages.toSorted((a,b)=> new Date(a.createdAt) - new Date(b.createdAt)).map((messages, index)=> (
              <div key={index} className={`flex flex-col ${messages.to_user_id !== user._id ? "items-start" : "items-end"}`}>
                <div className={`p-2 text-sm max-w-sm bg-white text-slate-700 rounded-lg shadow ${messages.to_user_id !== user._id ? 'rounded-bl-none' : 'rounded-br-none'}`}>
                  {messages.message_type === 'image' && <img src={messages.media_url} className='w-full max-w-sm rounded-lg mb-1' alt="" />}
                  <p>
                    {messages.text}
                  </p>
                </div>
              </div>
            ))
          }
          <div ref={messagesEndRef}/>
        </div>
      </div>
      <div className='px-4'>
        <div className='flex items-center gap-3 pl-5 p-1.5 bg-white w-full max-w-xl mx-auto border border-gray-200 shadow rounded-full mb-5'>
          <input type="text" className='flex-1 outline-none text-slate-700' placeholder='Type a message' onKeyDown={e=>e.key === 'Enter' && send_message()} onChange={(e)=>setText(e.target.value)} value={text}/>
          <label htmlFor="image">
            {image ? <img src={URL.createObjectURL(image)} className='h-8 grounded ' alt="" /> : <ImageIcon/>}
            <input type="file" name="" id="image" accept='image/*' hidden  multiple onChange={(e)=> setImage(e.target.files[0])}/>
          </label>
          <button onClick={send_message} className='bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-800 hover:to-indigo-900 active:scale-95 cursor-pointer text-white p-2.5 rounded-full' >
            <SendHorizonal size={18}/>
          </button>
        </div>
      </div>
    </div> 
  )
}

export default ChatBox
