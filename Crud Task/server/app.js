require("dotenv").config();

const express=require("express");
const app=express();
const mysql =require('mysql2')  
const port=8001;


const cors=require('cors');

const bodyParser=require('body-parser');



const router=require("./routes/router");



require("./db/conn");




app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json())

app.use(router);

app.get("/",(req,res)=>{
    res.send("server start")
});

app.use(express.static('public'));
app.listen(port,()=>{
    console.log(`server start at port no: 8001` );
})   