const USER = require("../SCHEMAS/user");
const ODELJENJE = require("../SCHEMAS/odeljenje");

async function postUcenik(req,res)
{
    try
    {
        let ucenik = new USER({
            tip:1,
            imeIprezime:req.body.imeIprezime,
            password:req.body.password,
            idOdeljenja:req.body.idOdeljenja,
            brojBodova:0,
            uradjeneLekcije:[]
        })
        let saved = await ucenik.save();
        let idOdeljenja = req.body.idOdeljenja;
        let id = saved._id;

        let odeljenje=await ODELJENJE.findById(idOdeljenja);
        odeljenje.idUcenika.push(id);
        await odeljenje.save();

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

async function login(req,res)
{
    try
    {
        let email = req.body.email;
        let password = req.body.password;
        let users = await USER.find();
        console.log(users.length);
        let t=false;
        for(let i=0;i<users.length;i++)
        {
            if(users[i].password===password && (users[i].email===email || users[i].imeIprezime===email))
            {
                res.json({
                    uspesnost:true,
                    id:users[i]._id
                })
                t=true;
                break;
            }
        }
        if(!t)
        {
            res.json({
                uspesnost:false,
                message:"404 not found"
            })
        }
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            message:err.message
        })
    }
}

async function getOneUser(req,res)
{
    try
    {
        let user= await USER.findById(req.params.id);
        if(user!==null)
        {
            res.json({
                uspesnost:true,
                user:user
            })
        }
        else{
            res.json({
                uspesnost:false,
                message:"404"
            })
        }
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            message:err.message
        })
    }
}

async function UcenikPromenaPodataka(req,res)
{
    try
    {
        let id = req.params.id;
        let imeIPrezime = req.body.imeIPrezime;
        let password = req.body.password;

        let ucenik = await USER.findById(id);
        ucenik.imeIprezime=imeIPrezime;
        ucenik.password=password
        let saved = await ucenik.save();
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

async function bodovi(req,res)
{
    try
    {
        let id = req.params.id;
        let bodovi = req.body.bodovi;
        
        let ucenik = await USER.findById(id);
        ucenik.bodovi+=bodovi;
        let saved=ucenik.save();
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

async function dodajLekciju(req,res)
{
    try
    {
        let id = req.params.id;
        let lekcija = req.body.lekcija;
        let ucenik = await USER.findById(id);
        ucenik.uradjeneLekcije.push(lekcija);
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
    delete:del,
    login:login,
    getOneUser:getOneUser,
    UcenikPromenaPodataka:UcenikPromenaPodataka,
    promenaBodova:bodovi,
    dodavanjeLekcije:dodajLekciju,
}))