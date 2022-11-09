const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
    name :{
        required : true, //required:true used for check validation.
        type : String
    },

    // quantity :{
    //     required : true, //required:true used for check validation.
    //     type : Number
    // },

    isPurchased :{
        required : true, //required:true used for check validation.
        type : String
    }
});

module.exports = mongoose.model("tasklist", listSchema);