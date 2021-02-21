// var express = require('express')
// // eslint-disable-next-line no-unused-vars
// var path = require('path')
// var serveStatic = require('serve-static')
// // eslint-disable-next-line no-undef
// app = express()
// // eslint-disable-next-line no-undef
// app.use(serveStatic(__dirname + "/dist"))
// var port = process.env.PORT || 5000
// // eslint-disable-next-line no-undef
// app.listen(port)
// console.log('server started '+ port)


const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const buildLocation = 'dist'
app.use(express.static(`${buildLocation}`))
app.use((req, res, next) => {
    if (!req.originalUrl.includes(buildLocation)) {
        res.sendFile(`${__dirname}/${buildLocation}/index.html`);
    } else {
        next()
    }
})
app.listen(port, () => console.info(`Server running on port ${port}`))




