const fs = require('fs')

function createLogs(path){
    return (req, res, next)=> {
        const data = `new request recieved at ${req.url} by method ${req.method}.\n`
        
        fs.appendFile(path, data, (err) => {
            if(err){
                console.log('error in appending data to file.')
            }
        })

        next()
    }
}

module.exports = createLogs