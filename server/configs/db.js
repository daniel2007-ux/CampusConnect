import mongoose from 'mongoose';

const connect_db = async () => {
    try {
        mongoose.connection.on('connected', ()=> console.log('Database connected'))
        await mongoose.connect(`${process.env.MONGODB_URL}/connect`)
    } catch (error) {
        console.log(error.message)
    }
}

export default connect_db