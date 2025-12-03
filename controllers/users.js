const userModel = require('../models/users')
const {createToken} = require('../services/auth')

function showSignupPage(req, res){
    return res.status(200).render('signup')
}

async function handleValidateSignup(req, res){
    const {name, email, password} = req.body

    const createdUser = await userModel.create({
        name : name,
        email : email, 
        password : password,
    })

    // sending token to client.
    const token = createToken(createdUser)
    res.cookie('token', token)

    // redirecting to homepage.
    return res.status(201).redirect('/')
}

function handleShowLogin(req, res){
    return res.status(200).render('login')
}

async function handleValidateLogin(req, res){
    const {email, password} = req.body

    let token;

    try{
        token = await userModel.matchPassword(email, password)
        res.cookie('token', token)
        return res.status(200).redirect('/')
    }
    catch(e){
        return res.status(401).render('signin', {
            message : err.message,
        })
    }
}

module.exports = {
    showSignupPage,
    handleValidateSignup,
    handleShowLogin,
    handleValidateLogin,
}