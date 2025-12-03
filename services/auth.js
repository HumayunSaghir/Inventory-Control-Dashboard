const JWT = require('jsonwebtoken')
const secretKey = '$32968110#'

// this will return token.
function createToken(user){
    const payload = {
        _id : user._id,
        email : user.email,
        name : user.name,
    }

    return JWT.sign(payload, secretKey)
}

// this will return payload.
function verifyToken(token){
    try{
        const user = JWT.verify(token, secretKey)
        return user
    }
    catch(e){
        console.log('error in verifying token.')
    }
}

module.exports = {
    createToken,
    verifyToken,
}