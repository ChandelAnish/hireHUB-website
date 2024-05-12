const mysql=require('mysql2')
const userdetail={
    user:'root',
    host:'localhost',
    password:'235689',
    database:'userdetails'
}
const connectDB=mysql.createConnection(userdetail)

connectDB.connect((err)=>{
    if(err)throw err;
    console.log(`express connected to database : userdetails`);
})

module.exports=connectDB;