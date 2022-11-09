const express = require("express");
const app = express();
const port = 8000;
const fs = require("fs");
const cors = require("cors");
// const cookie = require("cookie")
const Route = require("./Routes/RoutesDB4");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://Root:Admin@cluster0.wbuelpl.mongodb.net/?retryWrites=true&w=majority",{
//     useNewUrlParser: true
// })
// mongoose.connection
// .once("open", ()=>{console.log("Connected to DataBase")})
// .on("error", (err)=>{console.log("Some error occurred", err)})


//Established the connection to the database.
const db = "mongodb+srv://Root:Admin@cluster0.hxkywyj.mongodb.net/todoList?retryWrites=true&w=majority"
mongoose.connect(db).then(()=>{ 
    console.log('Database conencted successfuly');
}).catch((err)=>{ 
    console.log("Error received= " + err)
})

const middleware = (req, res, next)=>{
    fs.readFile("logs.txt", "utf8", (err, data)=>{
        fs.appendFile('logs.txt', '\nrequest url:-'+req.url+'  || request method:-'+req.method+' || Logtime:-'+new Date()+' || request body:-'+JSON.stringify(req.body), (err)=>{
            console.log(err)
        })
    })
    next();
};

app.use(cors()); //By default cors() allows all the origins to accept request.
// app.use(cookie());
app.use(bodyParser.json());
app.use(middleware);
app.use("/api", Route);

app.listen(port, ()=>{
    console.log(`This server running on Port No: ${port}`);
});
