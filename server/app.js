require('dotenv').config()
const express = require("express")
const mysql = require("mysql2")
const path = require('path')
const router=require('./router/router')
const cors=require('cors')

const app = express()
app.use(cors({
    origin:['https://asc-hirehub.netlify.app','http://127.0.0.1:5502']
}))

const connectDB = require('./connectionDB/connectionDB')
const { link } = require("fs")

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.use(express.static('./public/main-page'))
app.use('/',router)




//main-page
app.get('/mainpage', (req, res) => {//don't use '/main-page' because this will give r=error since '/main-page' is a folder
    return res.status(200).redirect('./main-page/index1.html')//as frontend request /index1.html server redirects to ./main-page/index1.html'
    // res.sendFile(path.resolve(__dirname,'./public/main-page/index1.html'))//as frontend request /index1.html server send this file
})


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log("the server is listening at ",port)
})