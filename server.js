const express = require('express');
const cors= require('cors');
const app= express();   
const mysql= require('mysql');
const PORT=process.env.PORT || 3002;
app.use(express.json());
app.use(cors());


const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"CRUD"
})
// get all members
app.get('/',(err,res)=>{
   const sql="SELECT * FROM TODO";
   db.query(sql,(err,data)=>{
    if(err) return app.json("ERROR");
    return res.json((data));
   })
   
});
// creating member
app.post('/create',(req,res)=>{
    const sql="INSERT INTO TODO (`id`,`name`,`description`) VALUES (?)";
    const val=[req.body.id,req.body.name,req.body.description];
    db.query(sql,[val],(err,data)=>{
        if(err) return app.json("ERROR");
        
        return res.json({mess:"INSERTED VALUES ..."});
    })
})
//delete member using id
app.delete('/:id',(req,res)=>{
   const sql="DELETE FROM TODO WHERE id=?";
   const v=req.params.id;
   console.log(v);
   db.query(sql,v,(err,data)=>{
    if(err) return res.json("ERROR");
    
    return res.json({mess:"Deleted VALUES ..."});
})}
)

//updating member using id
app.put('/:id',(req,res)=>{
    const sql="UPDATE TODO SET name=? , description=? WHERE id=?";
    const val=[req.body.name,req.body.description];
    console.log(val);
    db.query(sql,[...val,req.params.id],(err,data)=>{
        if(err) return res.json("ERROR");
        return res.json({mess:`UPDATED ${req.params.id}`}) 

    })
})




app.listen(PORT,()=>{console.log(`listening on port ${PORT}`);});