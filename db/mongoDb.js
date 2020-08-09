const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI || "mongodb+srv://jatin19:jatin1903@cluster0.mwozi.mongodb.net/TestECOMM?retryWrites=true&w=majority"

mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true}).catch(err=>console.log(err))

const db = mongoose.connection
db.once('open',()=>{
    console.log('Connected to DB')
})

