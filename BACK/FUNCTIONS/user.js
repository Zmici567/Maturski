const USER = require("../SCHEMAS/user");

async function postUcenik(req,res)
{
    try
    {
        let ucenik = new USER({
            tip:1,
            imeIprezime:req.body.imeIprezime,
            password:req.body.password,
            idProfesora:req.body.idProfesora
        })
        let saved = await ucenik.save();
        res.json({
            uspesnost:true,
            sacuvano:saved
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

async function postProfesor(req,res)
{
    try
    {
        let ucenik = new USER({
            tip:0,
            imeIprezime:req.body.imeIprezime,
            password:req.body.password,
            email:req.body.email
        })
        let saved = await ucenik.save();
        res.json({
            uspesnost:true,
            sacuvano:saved
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

async function getUsers(req,res)
{
    try
    {
        let users = await USER.find();
        res.json({
            uspesnost:true,
            korisnici:users
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
        id=req.params.id;
        const deleted = await USER.deleteOne({_id:id});
        res.json({uspesnost:true});
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            message:err.message
        })
    }
}

module.exports = (new Object({
    postUcenik:postUcenik,
    getUsers:getUsers,
    postProfesor:postProfesor,
    delete:del
}))