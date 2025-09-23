import React, { useState } from 'react'
import {BadgeCheck, Heart} from 'lucide-react'
import moment from 'moment'
import { dummyUserData } from '../assets/assets'

const PostCards = ({post}) => {

    const hashTagged_post = post.content.replace(/(#\w+)/g, '<span class="text-blue-600">$1</span>' )


    const [Likes, setLikes] =  useState(post.likes_count)
    
    const current_user = dummyUserData

  return (
    <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>
      {/* users info */}
      <div className='inline-flex items-center gap-3 cursor-pointer'>
        <img src={post.user.profile_picture} alt="" className='w-10 h-10 rounded-full shadow'/>
        <div className='flex items-center space-x1'>
            <span>{post.user.full_name}</span>
            <BadgeCheck className='w-4 h-4 text-blue-500'/>
        </div>
        <div className='text-grey-500 text-sm'>@{post.user.username} • {moment(post.createdAt).fromNow()}</div>
      </div>
      {/* post content */}
      {post.content && <div className='text-grey-800 text-sm whitespace-pre-line' dangerouslySetInnerHTML={{__html: hashTagged_post}}/>}

      {/* post image */}
      <div className='grid grid-cols-2 gap-2'>
        {post.image_urls.map((img,index) =>(
            <img src={img} key={index} className={`w-full h-48 object-cover rounded-lg ${post.image_urls.length ===1 && 'col-span-2 h-auto'}`} alt="" />
        ))}
      </div>

      {/* Action Btn */}
      <div className='flex items-center gap-4 text-grey-600 text-sm pt-2 border-t border-grey-300'>
        <div>
            <Heart className={`w-4 h-4 cursor-pointer ${Likes.includes(current_user._id) && 'text-red-500 fill-red-500'}`}/>
            <span>{Likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default PostCards
