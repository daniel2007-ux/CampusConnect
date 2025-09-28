import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { Image, X } from 'lucide-react'
import toast from 'react-hot-toast'

const CreatePost = () => {

  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const user = dummyUserData

  const handle_submit =async () => {
    
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <div className='max-w-6xl mx-auto p-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Create Post</h1>
          <p className='text-slate-600'>Share your thoughts and experience with the world.</p>
        </div>

        {/* where to create post */}
        <div className='max-w-xl bg-white p-4 sm:p-8 sm:pb-3 rounded-xl shadow-md space-y-4'>
          <div className='flex iyems-center gap-3'>
            <img src={user.profile_picture} className='rounded-full w-12 h-12 shadow' alt="" />
            <div>
              <h2 className='font-semibold'>{user.full_name}</h2>
              <p className='text-sm text-gray-500'>@{user.username}</p>
            </div>
          </div>

          {/* Place to Input text */}
          <textarea className='w-full resize-none max-h-20 mt-4 text-sm outline-none placeholder-gray-400' placeholder="what's happening" onChange={(e)=>setContent(e.target.value)} value={content}/>

          {/* place to add Image */}

          {
            images.length > 0 && <div className='flex flex-wrap mt-4 gap-2'>
              {images.map((image, index)=>(
                <div key={index} className='relative group'>
                  <img src={URL.createObjectURL(image)} alt="" className='h-20 rounded-md'/>
                  <div onClick={()=>setImages(images.filter((_, index)=> index !== i))} className='absolute hidden group-hoveer:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer'>
                    <X className='w-6 h-6 text-white'/>
                  </div>
                </div>
              ))}
            </div>
          }

          <div className='flex items-center justify-between pt-3 border-t border-gray-300'>
            <label htmlFor='images' className='flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer'>
              <Image className='size-6'/>
            </label>
            <input type="file" id='images' accept='image/*' hidden multiple onChange={(e)=>setImages([...images, ...e.target.files])}/>
            <button disabled={loading} onClick={()=>toast.promise(handle_submit(),
            {
              loading : 'uploading...',
              success : <p>Post Added</p>,
              error : <p>Post Not Added</p>
            }
            )} className='text-sm bg-gradient-to-r from-blue-500 to-indigo-700 hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition text-white font-medium px-8 py-2 rounded-md cursor-pointer'>Post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
