
const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");


const jwt = require('jsonwebtoken');

Router.get("/",authenticationToken,(req,res)=>{
mysqlConnection.query("SELECT * from customer", async(err, rows, fields)=>{
    if(!err)
    {
        await res.send(rows);
    }
    else{
      console.log(err);
    
    }
    })
    })

    // get customer details

    Router.get('/display/:name', (req ,res)=>{
        mysqlConnection.query("SELECT * FROM customer WHERE name =?",[req.params.name], async(err,rows,fields)=>{
            if(!err){
                await res.send(rows);
            }
            else{
                console.log(err);
            }
        })
        
    })


    // delete customer details
   
  Router.delete('/:age', (req ,res)=>{
    mysqlConnection.query("DELETE FROM customer WHERE age =?",[req.params.age], async(err,rows,fields)=>{
        if(!err){
            await res.send("delete successfully");
        }
        else{
            console.log(err);
        }
    })
  })

  //create customer details

Router.post('/', authenticationToken,(req ,res)=>{
    let customer = req.body;
    let insert = "insert into customer values('"+customer.name+"','"+customer.age+"',"+customer.phonenum+",'"+customer.branch+"');"
      mysqlConnection.query(insert, async(err,rows,fields)=>{
        if(!err){
            await res.send("insert successfully");
        }
        else{
            console.log(err);
        }
    })
    
})

Router.post('/login',(req, res) => {
    const admin = {
    name : "subasundar",
    password : "12345678"
    }
    const userName = req.body.username
    const password = req.body.password
    
    if(userName == admin.name && password == admin.password) {
    const user = { name: userName }
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({
    success : 1,
    access_token: token
    })
    }else {
    res.json({
    success:0,
    message : 'Access Denied!'
    })
    }
    })
    
    function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
    return res.send('Please enter valid token')
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
    return res.send('Unauthorized user')
    }
    
    req.user = user
    next()
    })
    }
    
    
    
    
    
 // update customer details

Router.put('/', (req ,res)=>{
    let customer = req.body;
    let update = "update customer set name='"+customer.name+"',age='"+customer.age+"',phonenum="+customer.phonenum+" where branch='"+customer.branch+"';"
    mysqlConnection.query(update, async(err,rows,fields)=>{
        if(!err){
            await res.send("Update successfully");
        }
        else{
            console.log(err);
        }
    })
    
})
module.exports = Router;



