const mg = require("mongoose");

const odeljenjeSchema = require("./odeljenje");
const lekcijeSchema = require("./lekcija")

let uradjenaLekcija = new mg.Schema({
    idLekcije:{
        type:mg.Schema.Types.ObjectId,
        ref:"lekcija",
        require:true
    },
    bodovi:{
        type:Number,
        require:true
    }
})

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
    idOdeljenja:{
        type:mg.Schema.Types.ObjectId,
        ref:"odeljenje"
    },
    brojBodova:{
        type:Number,
    },
    uradjeneLekcije:[uradjenaLekcija]

})

module.exports = mg.model("user",userSchema);