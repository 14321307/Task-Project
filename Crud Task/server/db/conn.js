const mysql=require('mysql2')

const conn=mysql.createConnection({
       
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
       
    })

  
 conn.connect((err)=> {
        if(err){
            console.log("error occurred while connecting",err.message);
        }
        else{
            console.log("connection created with Mysql successfully");
        }
     });




module.exports=conn;