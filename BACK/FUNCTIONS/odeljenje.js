const ODELJENJE = require("../SCHEMAS/odeljenje");

async function get(req,res)
{
    try
    {
        let id = req.params.id;
        let odeljenja = await ODELJENJE.find((idProfesora)=>{
            return idProfesora===id;
        });
        res.json({
            uspesnost:true,
            odeljenja:odeljenja
        })
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            message:err.message
        })
    }
}

module.exports = new Object({
    get:get
})