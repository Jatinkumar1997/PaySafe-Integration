const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required:true,
        trim:true
    },
    DOB_day:{
        type:Number,
        required:true,
        trim:true
    },
    DOB_month:{
        type:Number,
        required:true,
        trim:true
    },
    DOB_year:{
        type:Number,
        required:true,
        trim:true
    },
    customerToken:{
        type:String,
        required:false
    },
    merchRefs:[{
        merchRefNum:{
            type:String
        }
    }],
    tokens:[{
        token: {
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})


userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id:user._id.toString() }, 'secret')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to retrive User')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User
