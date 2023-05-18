const LEKCIJA= require("../SCHEMAS/lekcija");
const USER = require("../SCHEMAS/user");
const fs = require("fs");

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

        let ucenici = await USER.find({tip:1});
        console.log(ucenici);
        for(let i=0;i<ucenici.length;i++)
        {
            for(let j=0;j<ucenici[i].uradjeneLekcije.length;j++)
            {
                console.log(ucenici[i].uradjeneLekcije[j].idLekcije)
                if(ucenici[i].uradjeneLekcije[j].idLekcije == id)
                {
                    ucenici[i].uradjeneLekcije.splice(j,1);
                }
            }
            await ucenici[i].save();
        }

        let slika = (await LEKCIJA.findById(id)).slika;

        fs.unlink("../FRONT/slike/"+slika, function (err) {
            if (err) {
              console.error(err);
            } else {
              console.log("File removed:", slika);
            }
          });

        let deleted = await LEKCIJA.deleteOne({_id:id});

        res.json({
            uspesnost:true,
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