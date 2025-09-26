import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'
import UserProfileInfo from '../components/UserProfileInfo'
import PostCards from '../components/PostCards'
import moment from 'moment'

const Profile = () => {

  const {profile_Id} = useParams()
  
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState(false)

  const fetch_user = async () => {
    setUser(dummyUserData)
    setPosts(dummyPostsData)
  }

  useEffect(()=>{
    fetch_user()
  }, [])

  return user? (
    <div className='relative h-full overflow-y-scroll bg-gray-50 p-6'>
      <div className='max-w-3xl mx-auto'>
        {/* profile cards */}
        <div className='bg-white rounded-2xl shadow overflow-hidden'>
          {/* cover prof photo */}
          <div className='h-40 md:h-56 bg-gradient-to-r from-blue-200 via-indigo-200 to-pink-200'>
            {
              user.cover_photo && <img src={user.cover_photo} alt="" className='w-full h-full object-cover' />
            }
          </div>
          {/* user information */}
          <UserProfileInfo user={user} posts={posts} profile_Id={profile_Id} setShowEdit={setShowEdit}/>
        </div>

        {/* Profile Tabs */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow p-1 flex max-w-md mx-auto">
            {["posts", "media", "likes" ].map((tab)=>(
              <button onClick={()=>setActiveTab(tab)} key={tab} className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${activeTab === tab ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          {/* Posts */}
          {activeTab === "posts" && (
            <div className='mt-6 flex flex-col items-center gap-6'>{posts.map((post)=> 
            <PostCards key={post._id} post={post}/>
            )}
            </div>
          )}
          {activeTab === "media" && (
            <div className='flex flex-wrap mt-6 max-w-6xl'>{posts.filter((post)=> post.image_urls.length > 0).map((post)=>(
              <>
              {post.image_urls.map((image, index)=> (
                <Link target='_blank' to={image} key={index} className='relative group'>
                <img src={image} key={index} alt=""  className='w-64 aspect-video object-cover'/>
                <p className='absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-xl text-white opacity-0 group-hover:opacity-100 transition duration-300'>Posted {moment(post.createdAt).fromNow()}</p>
                </Link>
              ))}
              </>
            ))
            }
            </div>
          )}

        </div>
      </div>
      {/* showEdit page */}
      {  showEdit && <p>show profile edit</p> }
    </div>
  ):(<Loading/>)
}

export default Profile
