import User from "../models/User"
import fs from "fs"
import imagekit from "../config/imagekit"
import ImageKit from "@imagekit/nodejs"
 
// firstly i hae to get the user data using userId
export const get_user_data =async (req, res) => {
    try {
        const {userId} = req.auth()
        const user = await User.findById(userId)
        if (!user) {
            return res.json({success: false, message: "user not found"})
        }
        res.json({success: true, user});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
    
}


// function to update user data
export const update_user_data =async (req, res) => {
    try {
        const {userId} = req.auth()
        const {username, bio, location, full_name} = req.body;

        const temp_user = await User.findById(userId)

        !username && (username = temp_user.username)

        if (temp_user.username !== username) {
            const user = User.findOne({username})
            if (user) {
                //here is where will not change the username if it is already taken
                username = temp_user.username
            }
        }

        const updateData = {
            username,
            bio,
            location,
            full_name,
        }


        const profile = req.files.profile && req.files.profile[0]
        const cover = req.files.cover && req.files.cover[0]

        if (profile) {
            const buffer = fs.readFileSync(profile.path)
        }



        if (!temp_user) {
            return res.json({success: false, message: "user not found"})
        }
        res.json({success: true, user});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
    
}