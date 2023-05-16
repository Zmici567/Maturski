const LEKCIJA= require("../SCHEMAS/lekcija");

async function get(req,res)
{
    try
    {
        let lekcije = await LEKCIJA.find();
        res.json({
            uspesnost:true,
            lekcije:lekcije,
        });
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
        let lekcije = await LEKCIJA.findById(id);
        res.json({
            uspesnost:true,
            lekcije:lekcije,
        });
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
        let id = req.params.id;

        let deleted = await LEKCIJA.deleteOne({_id:id});

        res.json({
            uspesnost:true,
            deleted:deleted
        })
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            message:err.message
        });
    }
}

async function post(req,res)
{
    try
    {
        console.log(req.body.pitanja);
        let newLekcija = new LEKCIJA({
            naziv:req.body.naziv,
            slika:req.file.filename,
            tekst:req.body.tekst,
            idProfesora:req.body.idProfesora,
            pitanja:JSON.parse(req.body.pitanja),
        })
        let saved = await newLekcija.save();
        res.json({
            uspesnost:true,
            saved:saved,
        });
    }
    catch(err)
    {
        res.json({
            uspesnost:false,
            message:err.message
        });
    }
}

module.exports=new Object({
    get:get,
    getById:getById,
    delete:del,
    post:post
})