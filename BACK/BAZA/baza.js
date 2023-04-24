const mg = require("mongoose");

async function connect()
{
    let link = "mongodb+srv://zmilica567:zmilica567@cluster0.mx9bgs5.mongodb.net/MATURSKI?retryWrites=true&w=majority"
    try
    {
        await mg.connect(link);
        console.log("Baza je uspesna!!!");
    }
    catch(err)
    {
        console.log("Baza nije uspesna!!!\n"+err.message);
    }
}

module.exports=connect;