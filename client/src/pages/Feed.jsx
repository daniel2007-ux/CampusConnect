import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'
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
      <div>

      </div>
    </div>
  ) : <Loading/>
}

export default Feed
