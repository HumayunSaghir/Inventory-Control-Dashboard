const {handleShowHomepage} = require('../controllers/home')
const {Router} = require('express')

const router = Router()

router.get('/', handleShowHomepage)

module.exports = router
