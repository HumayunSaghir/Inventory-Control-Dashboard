const {verifyToken} = require('../services/auth')

function softAuth(req, res, next){
    const token = req.cookies['token']

    // incase no token is there
    if(!token){
        console.log('no token found. user not attached with req.')
        return next()
    }

    // incase token is found. now we will get the user.
    const user = verifyToken(token)

    req.user = user
    console.log('user is attached with payload.')
    next()
}

module.exports = softAuth