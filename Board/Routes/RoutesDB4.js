// const { json } = require('express');
const express = require('express');
const ListSchema = require('../Model/ListSchema');
const router = express.Router();
const todoList = [];

const middleware = async(req, res, next)=>{ //We can define the middleware to prevent the duplicate data added in database. 
    const result = await ListSchema.find()
    const dupliCate = result.find((element)=>element.name === req.body.name)
    if(dupliCate){
        res.send({massage: "Duplicate value received"})
    }
    else{
        next()
    }
};

router.get('/', async (req, res)=>{  //Get the data from collection in database.
    const data = await ListSchema.find() //.Find the return all data of collection.
    res.send(data);
});

router.post('/', middleware, async (req, res)=>{ //use middleware to prevent the duplicate data added in database.
    data = req. body 
    if(data.name){  
        const result = await ListSchema.create(data)//insert body data inside the tasklist collection in todoList database.
        res.json({message: "Data added successfully", result: result})
    }
    else{
        res.send("Please add some data.")
    }   
});

router.get('/:item', async(req, res)=>{
    const result = await ListSchema.find({name: req.params.item}); //Get filter data to the collection.
    res.json(result)
});

router.put('/:item', async(req, res)=>{
    const result = await ListSchema.updateOne({name:req.params.item}, req.body) //Update the data.
    res.json(result)
});

router.delete('/:item', async(req, res)=>{
    const result = await ListSchema.deleteOne({name:req.params.item}) //Delete the data.
    res.json(result);
})

module.exports = router;