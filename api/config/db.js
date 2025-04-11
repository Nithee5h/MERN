const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            process.env.MONGO_URI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
    } catch (err) {
        console.error(`Error: ${err}`)
    }

}

module.exports = connectDB;