const ODELJENJE = require("../SCHEMAS/odeljenje");
const USER = require("../SCHEMAS/user");

async function get(req,res)
{
    try
    {
        let id = req.params.id_profesora;
        let odeljenja = await ODELJENJE.find({idProfesora:id});
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
async function getById(req,res)
{
    try
    {
        let id = req.params.id;
        let odeljenja = await ODELJENJE.findById(id);
        res.json({
            uspesnost:true,
            odeljenje:odeljenja
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

async function post(req,res)
{
    try
    {
        let odeljenje = new ODELJENJE({
            naziv:req.body.naziv,
            skola:req.body.skola,
            idProfesora:req.body.idProfesora,
            idUcenika:[]
        })
        let saved = await odeljenje.save();
        res.json({
            uspesnost:true,
            saved:saved
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

async function del(req,res)
{
    try
    {
        await USER.deleteMany({idOdeljenja:req.params.id})
        await ODELJENJE.deleteOne({_id:req.params.id})
        res.json({uspesnost:true})
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            message:err.message
        })
    }
}

async function izmeni(req,res)
{
    try
    {
        let odeljenje = await ODELJENJE.findById(req.params.id)
        odeljenje.naziv = req.body.naziv;
        odeljenje.skola = req.body.skola;
        let saved = await odeljenje.save();
        res.json({
            uspesnost:true,
            saved:saved
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
    get:get,
    post:post,
    delete:del,
    getById:getById,
    izmeni:izmeni
})