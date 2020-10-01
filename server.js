var studentcount = 0, mentorcount = 0
const PORT = process.env.PORT || 3020;
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json())
const mongodb = require("mongodb");
const mongoclient = mongodb.MongoClient;
const url = "mongodb+srv://vishnu:123abc@cluster0.o2tjj.mongodb.net/taskdata?retryWrites=true&w=majority";
const cors = require("cors")
app.use(cors({
    origin: "*"
}))

//create student and mentor........................js
app.get('/',function(req,res){
    res.write("<h1>Hello I am vishnu! Sample Node js App</h1>")
    res.end()
})

app.post("/insert", async function (req, res) {
 try{
 let client = await mongoclient.connect(url, { useUnifiedTopology: true })
 let db = client.db("react_users")
 await db.collection("users").insertOne({ "fname": req.body.fname, "lname": req.body.lname, "_id": req.body.email, })
 console.log(req.body)
 client.close()
 res.json({ message: "inserted" })
 }catch(err){
     res.json({
         message:"email already exists"
     })
 }



})


app.post("/update", async function (req, res) {
    try{
    let client = await mongoclient.connect(url, { useUnifiedTopology: true })
     let db = client.db("react_users")
     await db.collection("users").findOneAndUpdate({ "_id": req.body.email }, { "fname": req.body.fname, "lname": req.body.lname })
     client.close()
     res.json({ message: "updated" })
    }catch(err){
        res.json({
            message:"email doesn't exist "
        })
    }
})


app.post("/delete", async function (req, res) {
   try{
    let client = await mongoclient.connect(url, { useUnifiedTopology: true })
    let db = client.db("react_users")
    await db.collection("users").findOneAndDelete({ "_id": req.body.email })
    client.close()
    
    res.json({ message: "deleted" })
   }catch(err){
       res.json({
           message:"email doesn't exist"
       })
   }
})

app.get("/display", async function (req, res) {
    let client = await mongoclient.connect(url, { useUnifiedTopology: true })
    let db = client.db("react_users")
    let arr = await db.collection("users").find().toArray()
    client.close()
    res.json(arr)


})

app.listen(PORT, () => console.log(`server running on ${PORT}`));




