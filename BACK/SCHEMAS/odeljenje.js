const mg = require("mongoose");

let odeljenjeSchema= new mg.Schema({
    naziv:{
        type:String,
        trim:true,
        require:true
    },
    skola:{
        type:String,
        trim:true,
        require:true
    },
    idProfesora:{
        type:String,
        trim:true,
        require:true
    },
    idUcenika:[{
        type:String,
        trim:true,
        require:true
    }]
})

module.exports=mg.model("odeljenje",odeljenjeSchema);