function handleShowHomepage(req, res){
    console.log(req.user)
    return res.status(200).render('home')
}

module.exports = {
    handleShowHomepage,
}