import { BadgeCheck, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const StoryViewer = ({ viewStories, setViewStories }) => {

    const [progress, setProgress] = useState(0)

    useEffect(()=>{
        let timer;
        let progressInterval;

        if (viewStories && viewStories.media_type !=='video') {
            setProgress(0)

            const duration = 10000; //10seconds
            const setTime = 100; // update every 100ms
            let elapsed = 0;

            progressInterval = setInterval(()=>{
                elapsed += setTime;
                setProgress((elapsed/duration) * 100);
            }, setTime)

            timer = setTimeout(()=>{
                setViewStories(null)
            }, duration)
        }
        return ()=>{
            clearTimeout(timer);
            clearInterval(progressInterval);
        }

    },[viewStories, setViewStories])

    const handleClose =() => {
        setViewStories(null)
    }

    if (!viewStories) {
        return null;
        
    }

    const render_story_content =()=>{
        switch (viewStories.media_type) {
            case 'image':
                return (
                    <img src={viewStories.media_url} alt="" className='max-w-full max-h-screen object-contain'/>
                );
            case 'video':
                return (
                    <video onEnded={()=>setViewStories(null)} src={viewStories.media_url} className='max-h-screen'  autoPlay controls/>
                );
            case 'text':
                return (
                    <div className='w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center'>
                        {viewStories.content}
                    </div>
                );
            default:
                return null;
        }
    }
  return (
    <div className='fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center ' style={{backgroundColor: viewStories.media_type === 'text' ? viewStories.background_color : "black"}}>
      
      {/* Progress Bar */}
      <div className='absolute top-0 left-0 w-full h-1 bg-grey-700'>
        <div className='h-full bg-white transition-all duration-100 linear' style={{width:`${progress}%`}}>

        </div>
      </div>
      {/* Users Info */}
      <div className='absolute top-4 left-4 flex items-center space-x-3 p-2 px-4 sm:p-4 sm:px-8 backdrop-blur-2xl rounded bg-black/50'>
      <img src={viewStories.user?.profile_picture} alt="" className='size-7 sm-size-8 rounded-full object-cover border border-white' />
        <div className='text-white font-medium flex items-center gap-1.5' >
            <span >{viewStories.user?.full_name}</span>
            <BadgeCheck size={18}/>
            {/* <p className='text-white/60 text-sm'>{moment(viewStories.createdAt).fromNow()}</p> */}
        </div>
      </div>
      {/* Close Story  Button*/}
      <button onClick={handleClose} className='absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none'>
        <X className='w-6 h-6 hover:scale-120 transition cursor-pointer'/>
      </button>
      {/* story content wrapper */}
      <div className='max-w-[90vw] max-h-[90vw] flex items-center justify-center'>
        {render_story_content()}
      </div>
    </div>
  )
}

export default StoryViewer
