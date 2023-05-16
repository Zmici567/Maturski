const mg = require("mongoose");

let pitanjeSchema=new mg.Schema({
    tekst: {
        type: String,
        required: true,
        trim: true
    },
    odgovori: [{
        type: String,
        required: true,
        trim: true
    }],
    tacanOdgovor: {
        type: Number,
        required: true,
    }
    
})

let lekcijaSchema= new mg.Schema({
    naziv: {
        type: String,
        required: true,
        trim:true,
    },
    slika:{
        type:String,
        required:true,
        trim:true,
    },
    tekst:{
        type:String,
        required:true,
        trim:true,
    },
    idProfesora:{
        require:true,
        type: mg.Schema.Types.ObjectId,
        ref:'user'
    },
    pitanja:[{
        type: pitanjeSchema,
        required: true,
    }]

})

module.exports=mg.model("lekcija",lekcijaSchema);