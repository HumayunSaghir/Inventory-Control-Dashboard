const express = require('express')
const connectDatabase = require('./connections')
const path = require('path')
const cookieParser = require('cookie-parser')
const createLogs = require('./middlewares/logs')
const softAuth = require('./middlewares/auth')
const userRouter = require('./routes/users')
const homeRouter = require('./routes/home')

const port = 8000
const app = express()


// database connection
connectDatabase('mongodb://127.0.0.1:27017/inventoryDashboard')
.then(() => console.log('database connected.'))
.catch((err) => console.log('error in database connection.'))


// utiltiy middlewares
app.use(cookieParser())
app.use(express.urlencoded({extended : true}))
createLogs('./logs.txt')

// setting up view engine.
app.set('view engine',  'ejs')
app.set('views', path.resolve('./views'))

// router configurations
app.use('/users', userRouter)
app.use('/', softAuth, homeRouter)

app.listen(port, () => console.log(`server is listening on port ${port}`))