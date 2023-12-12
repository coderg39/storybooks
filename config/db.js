 const mongoose = require('mongoose')
 const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false, => all of these have been deprecated
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
 }

 module.exports = connectDB