const {Router} = require('express')
const {showSignupPage, handleValidateSignup, handleShowLogin, handleValidateLogin} = require('../controllers/users')

const router = Router()

router.get('/signup', showSignupPage)
router.post('/validateSignup', handleValidateSignup)
router.get('/login', handleShowLogin)
router.post('/validateLogin', handleValidateLogin)

module.exports = router