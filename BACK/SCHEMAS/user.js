const mg = require("mongoose");

let userSchema = new mg.Schema({
    tip:{
        type:Number,
        require:true
    },
    imeIprezime:{
        type:String,
        trim:true,
        require:true
    },
    email:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true,
        require:true
    },
    idProfesora:{
        type:String,
        trim:true
    }

})

module.exports = mg.model("user",userSchema);