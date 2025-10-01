import User from './../models/User.js';
import { Inngest } from 'inngest';


// Create a client to send and receive events
export const inngest = new Inngest({ id: "CampusConnect-app" });


//Function to get user data and store it in a database
const sync_user_creation = inngest.createFunction(
    {id: 'sync-user-from-clerk'},
    {event: 'clark/user.created'},
    async ({event}) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        let username = email_addresses[0].email_addresses.split('@')[0]

        // check availability of username
        const user = await User.findOne({username})

        if (user) {
            username = username + Math.floor(Math.random() * 10000)
        }

        const user_data = {
            _id: id,
            email: email_addresses[0].email_address,
            full_name: first_name + " " + last_name,
            profile_picture: image_url,
            username
        }

        await user.create(user_data)
    }
)

// Inngest function to update user data in database
const sync_user_updation = inngest.createFunction(
    {id: 'update-user-from-clerk'},
    {event: 'clark/user.updated'},
    async ({event}) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data

        const update_user_data = {
            full_name: first_name + " " + last_name,
            email: email_addresses[0].email_address,
            profile_picture: image_url
        }
        await User.findByIdAndUpdate(id, update_user_data)
    }
)

// Inngest function to delete user data in database
const sync_user_deletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    {event: 'clark/user.deleted'},
    async ({event}) => {
        const {id} = event.data

        await User.findByIdAndDelete(id)
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [
    sync_user_creation,
    sync_user_updation,
    sync_user_deletion
];