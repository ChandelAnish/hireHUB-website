const mysql=require('mysql2')
const userdetail={
    user:process.env.USER,
    host:process.env.HOST,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
}
const connectDB=mysql.createConnection(userdetail)

connectDB.connect((err)=>{
    if(err)throw err;
    console.log(`express connected to database : userdetails`);
})

module.exports=connectDB;