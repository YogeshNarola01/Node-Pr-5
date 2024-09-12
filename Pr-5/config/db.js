const mongoose = require('mongoose')
 const ConnectDb = async() => {
    try {
        const db = await mongoose.connect('mongodb://localhost:27017/pr-5')
        console.log(`mongodb connected = ${db.connection.host}`);
    } catch (error) {
        console.log(error);
    }
 }
 module.exports = ConnectDb