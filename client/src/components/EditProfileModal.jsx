import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { Pencil } from 'lucide-react'

const EditProfileModal = ({setShowEdit}) => {

    const user = dummyUserData

    const [ editProfile, setEditProfile] = useState({
        username: user.username,
        bio: user.bio,
        location: user.location,
        profile_picture: null,
        cover_photo: null,
        full_name: user.full_name,
    })


    const handle_edit_save = async (e) => {
        e.preventDefault();
    }

return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-110 h-screen overflow-y-scroll bg-black/50'>
        <div className="max-w-2xl sm:py-6 mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
                <h1 className='text-2xl font-bold text-gray-900 mb-6'>Edit Profile</h1>
                <form action="" className='space-y-4' onSubmit={handle_edit_save}>
                    {/* Profile Picture */}
                    <div className='flex flex-col items-start gap-3'>
                        <label htmlFor="profile_picture" className='block text-sm font-medium text-gray-700 mb-1'>
                            Profile Picture
                            <input hidden type="file" accept='image/*' id='profile_picture' className='w-full p-3 border border-gray-200 rounded-lg' onChange={(e)=>setEditProfile({...editProfile, profile_picture: e.target.files[0]})} />
                            <div className='relative group'>
                                <img src={editProfile.profile_picture ? URL.createObjectURL(editProfile.profile_picture): user.profile_picture} className='w-24 h-24 rounded-full object-cover mt-2'/>
                                <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-90 transition-opacity cursor-pointer'>
                                        <Pencil className='w-5 h-5 text-white'/>
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Cover Picture */}
                    <div className='flex flex-col items-start gap-3'>
                        <label htmlFor="cover_photo" className='block text-sm font-medium'>
                            <input hidden type="file" accept='image/*' id='cover_photo' className='w-full p-3 border border-gray-200 rounded-lg' onChange={(e)=>setEditProfile({...editProfile, cover_photo: e.target.files[0]})} />
                            <div className='group/cover relative'>
                                <img src={editProfile.cover_photo ? URL.createObjectURL(editProfile.cover_photo) : user.cover_photo} alt="" className='w-80 h-40 rounded-lg bg-blue-700 object-cover'/>

                                <div className ='absolute hidden group-hover/cover:flex top-0 left-0 right-0 bottom-0 bg-black/20 rounded-lg items-center justify-center cursor-pointer'>
                                    <Pencil className='w-5 h-5 text-white'/>
                                </div>

                            </div>
                        </label>
                    </div>

                    {/* Inputs  for f_name*/}
                    <div className="">
                        <label htmlFor="" className='block text-sm font-medium text-medium text-gray-700 mb-1'>Name</label>
                        <input type="text" className='w-full p-3 border border-gray-200 rounded-lg' placeholder='Enter Your Full Name' onChange={(e)=>setEditProfile({...editProfile, full_name: e.target.value}) } value={editProfile.full_name}/>
                    </div>

                    {/* Inputs for username */}
                    <div className="">
                        <label htmlFor="" className='block text-sm font-medium text-medium text-gray-700 mb-1'>User Name</label>
                        <input type="text" className='w-full p-3 border border-gray-200 rounded-lg' placeholder='Enter Your username' onChange={(e)=>setEditProfile({...editProfile, username: e.target.value}) } value={editProfile.username}/>
                    </div>
                    {/* Inputs for bio*/}
                    <div className="">
                        <label htmlFor="" className='block text-sm font-medium text-medium text-gray-700 mb-1'>Bio</label>
                        <textarea rows={3} className='w-full p-3 border border-gray-200 rounded-lg' placeholder='Enter a short bio' onChange={(e)=>setEditProfile({...editProfile, bio: e.target.value}) } value={editProfile.bio}/>
                    </div>

                    {/* Inputs for location */}
                    <div className="">
                        <label htmlFor="" className='block text-sm font-medium text-medium text-gray-700 mb-1'>Location</label>
                        <input type="text" className='w-full p-3 border border-gray-200 rounded-lg' placeholder='Please enter your location' onChange={(e)=>setEditProfile({...editProfile, location: e.target.value}) } value={editProfile.location}/>
                    </div>

                    {/* buttons */}
                    <div className="flex justify-end space-x-3 pt-6">
                        <button onClick={()=>setShowEdit(false)} type='button' className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer'>
                            Cancel
                        </button>
                        <button type='submit' className='px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition cursor-pointer'>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)
}

export default EditProfileModal
