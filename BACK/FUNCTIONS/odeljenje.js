const ODELJENJE = require("../SCHEMAS/odeljenje");

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

async function addUcenik(req,res)
{
    try
    {
        let id = req.params.id;
        let idUcenika = req.body.idUcenika;
        let odeljenje = await ODELJENJE.findById(id);
        odeljenje.idUcenika.push(idUcenika);
        let updated = await odeljenje.save();
        res.json({
            uspesnost:true,
            updated:updated
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
    addUcenik:addUcenik,
    getById:getById
})