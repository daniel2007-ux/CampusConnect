import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const StoryModal = ({setShowModal, fetchStories}) => {


    const bg_colors = ["blue", 'pink', "red", "navyblue", "peach"]

    const [mode, setMode] = useState('text')
    const [background, setBackground] = useState(bg_colors[0])
    const [text, setText] = useState('')
    const [media, setMedia] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleMediaChange = (e) => {
        const file = e.target.files?.[0];
        if(file){
            setMedia(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handel_create_story = async () => {
        
    }

  return (
    <div className='fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4'>
        <div className='w-full max-w-md'>
            <div className='text-center mb-4 flex items-center justify-between'>
                <button onClick={()=>{setShowModal(false)}} className='text-white p-2 cursor-pointer'>
                    <ArrowLeft/>
                </button>
                <h2 className='text-lg font-semibold'>Create Story</h2>
                <span className='w-10'></span>
            </div>

            <div className='rounded-lg h-96 flex items-center justify-center relative' style={{backgroundColor:background}}>
                {mode === 'text' && (
                    <textarea className='bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none' placeholder="What's on your mind?" onChange={(e)=>setText(e.target.value)} value={text} />

                )}
                {
                    mode === 'media' && previewUrl && (
                        media?.type.startsWith('image') ? ( <img src={previewUrl} alt="" className='max-h-full object-contain' />
                        ) : (
                        <video src={previewUrl} className='max-h-full object-contain'/>
                        )
                    )
                }
            </div>

            <div className='flex mt-4 gap-2'>
                {
                    bg_colors.map((color)=>(
                        <button key={color} className='w-6 h-6 rounded-full ring cursor-pointer' style={{backgroundColor:color}} onClick={()=>setBackground(color)}/>
                    ))
                }
            </div>

            <div className='flex gap-2 mt-4'>
                <button onClick={()=>{setMode('text'); setMedia(null); setPreviewUrl(null)}} className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode=== "text" ? "bg-white text-black" : "bg-zinc-800"}`}>
                    <TextIcon size={18} /> Text
                </button>
                <label className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode=== "media" ? "bg-white text-black" : "bg-zinc-800"}`}>
                    <input type="file" id="media-upload" accept='image/*, video/*' className='hidden' onChange={(e)=>{handleMediaChange(e); setMode('media')}}/>
                    <Upload size={18} />Photo/Video
                </label>
            </div >
            <button onClick={()=>toast.promise(handel_create_story(),{
                loading : 'Creating story...',
                success : <p>Story created successfully!</p>,
                error : e => <p>{e.message}</p>
            })} className='flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition cursor-pointer' >
                <Sparkle size={18} /> Create Story
            </button>
        </div>
    </div>
  )
}

export default StoryModal
