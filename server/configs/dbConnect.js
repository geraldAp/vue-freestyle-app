const mongoose = require('mongoose')

const dbConnectionHandler = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB has connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}


module.exports = dbConnectionHandler