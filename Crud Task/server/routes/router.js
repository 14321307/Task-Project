const express=require("express");
const router=new express.Router()
const conn=require("../db/conn")




router.post("/create",(req,res)=>{
    // console.log(req.body);

    const {id,fname,lname,location,email,Dob,education,About}= req.body;

    if(!fname || !lname || !location || !email || !Dob || !education){

      res.status(422).json("please fill the all details")

    }


try{

conn.query("SELECT * FROM detail WHERE email=?",email,(err,result)=>{
    if((result.length)){
        res.status(422).json("This data is already exist ")
    }
    else{
        conn.query("INSERT INTO detail SET ?",{id,fname,lname,location,email,Dob,education,About},(err,result)=>{
            if(err){
                console.log("err"+ err);
            }else{
                res.status(201).json(req.body);
            }
        })
    }

})

}

catch(error){

    res.status(422).json(error)

}
})


router.get("/getuser",(req,res)=>{

    conn.query("SELECT * FROM student.detail",(err,result)=>{
        if(err){
            res.status(422).json("no data available")
        }
        else{
            res.status(201).json(result);
        }
    })

})



router.delete(`/deleteuser/:id`,(req,res)=>{



    const {id}=req.params;
    conn.query("DELETE FROM student.detail WHERE id =? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error")
        }
        else{
            res.status(201).json(result);
        }
    })


    

}
)

router.get(`/induser/:id`,(req,res)=>{



    const {id}=req.params;
    conn.query("SELECT * FROM student.detail WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error")
        }
        else{
            res.status(201).json(result);
        }
    })


})

router.patch('/updateuser/:id',(req,res)=>{


    const {id}=req.params;
    const data=req.body;
conn.query("UPDATE student.detail SET ? WHERE id=?",[data,id],(err,result)=>{
    if(err){
        res.status(422).json({message:"error"})
    }else{
        res.status(201).json(result)
        }
})
})




module.exports=router;