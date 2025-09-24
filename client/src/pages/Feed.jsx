import React, { useEffect, useState } from 'react'
import { assets, dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading';
import StoriesBar from '../components/StoriesBar';
import PostCards from '../components/PostCards';

const Feed = () => {
  
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true);
  
  
  const fetch_feeds = async () => {
    setFeeds(dummyPostsData)
    setLoading(false);
  }
  
  useEffect(()=>{
    fetch_feeds();
  }, [])


  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* stories and post */}
      <div> 
        <StoriesBar/>
        <div className='p-4 space-y-6' >
          {feeds.map((post)=>(
            <PostCards key={post._id} post={post}/>
          ))}
        </div>
      </div>

      {/* righthand sidebar */}
      <div className='max-xl:hidden sticky top-0'>
        <div className='max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow'>
          <h3 className='text-slate-800 font-semibold'>Sponsored</h3>
          <img src={assets.sponsored_img} alt="" className='w-75 h-50 rounded-md' />
          <p className='text-slate-600'>Email Marketing</p>
          <p className='text-slate-400'>Get more customers with our email marketing tools. Built for results</p>
        </div>
      </div>
    </div>
  ) : <Loading/>
}

export default Feed
