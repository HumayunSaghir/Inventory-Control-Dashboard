const {Schema, model} = require('mongoose')
const {createHmac, randomBytes} = require('crypto')
const {createToken} = require('../services/auth')


const userSchema =  new Schema({
    name : {
        type : String,
    },

    email : {
        type : String,
        unique : true,
    },

    password : {
        type : String,
    },

    salt : {
        type : String,
    },

}, {timestamps : true})

// hook for hashing password on signup.
userSchema.pre('save', function(){
    const user = this

    // hashing password
    if(user.isModified('password')){
        const salt = randomBytes(16).toString()

        const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex')

        user.salt = salt
        user.password = hashedPassword
    }
})

// hook for matching password on login and returning token.
userSchema.static('matchPassword', async function(email, password){
    const user = await this.findOne({email : email})

    // incase user not found.
    if(!user){
        throw new Error('No such email registered!')
    }

    // incase user is found
    const salt = user.salt
    const hashedPassword = user.password

    const userProvidedHash = createHmac('sha256', salt)
    .update(password)
    .digest('hex')

    // when password is not matched.
    if(hashedPassword !== userProvidedHash){
        throw new Error('Incorrect Password!')
    }

    // when password is matched we have to send token
    const token = createToken(user)
    return token

})

const userModel = new model('users', userSchema)

module.exports = userModel