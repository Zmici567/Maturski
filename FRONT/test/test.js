let pitanje=document.getElementById("pitanje");
let odgovor1=document.getElementById("odgovor1");
let odgovor2=document.getElementById("odgovor2");
let odgovor3=document.getElementById("odgovor3");

let pitanja=[];
let redBroj=0;
let poeni=0;
function ucitaj()
{
    pitanje.innerHTML=pitanja[redBroj].tekst;
    odgovor1.innerHTML=pitanja[redBroj].odgovori[0];
    odgovor2.innerHTML=pitanja[redBroj].odgovori[1];
    odgovor3.innerHTML=pitanja[redBroj].odgovori[2];
}

async function load()
{
    let res = await axios.get(LINK+"/api/getOne/"+localStorage.getItem("id"));

    if(res.data.uspesnost)
    {
        let id = location.search.substring(1);
        document.getElementById("nazad").href+="?"+id;
        console.log(res.data);

        if(res.data.user.tip===1)
        {
            let lekcije = res.data.user.uradjeneLekcije;
            console.log(lekcije);
            for(let i = 0; i<lekcije.length;i++)
            {
                
                if(lekcije[i].idLekcije===id)
                {
                    document.getElementById("greskaT").innerHTML="Već ste radili ovaj kviz!!!";
                    document.getElementById("greskaB").style.display="none";
                    document.getElementById("kraj").style.display="block";
                }
            }
        }
 
        let response = await axios.get(LINK+"/api/lekcija/"+id);
        if(response.data.uspesnost)
        {
            //console.log(response.data.lekcije.pitanja);
            pitanja=response.data.lekcije.pitanja;
            ucitaj();
        }
        else
        {
            alert(response.data.message);
            location.href=document.getElementById("nazad").href;
        }
    }
    else
    {
        alert(res.data.message);
        location.href=document.getElementById("nazad").href;
    }
}

function odgovor(o)
{
    if(o === pitanja[redBroj].tacanOdgovor)
    {
        poeni++;
        document.getElementById("TN").innerHTML="Tačan odgovor!!!";
    }
    else
    {
        document.getElementById("TN").innerHTML="Netačan odgovor!!!";
    }

    document.getElementById("teraj").style.display="block";
    setTimeout(terajDalje,5000);
}

async function terajDalje()
{
    document.getElementById("teraj").style.display="none";
    redBroj++;
    if(redBroj===pitanja.length)
    {
        document.getElementById("bodovi").innerHTML=poeni;
        document.getElementById("kraj").style.display="block";
        let userId=localStorage.getItem("id");

        let res = await axios.put(LINK + "/api/ucenik/bodovi/"+userId,{
            bodovi:poeni
        })


        console.log(res);
        res = await axios.put(LINK + "/api/ucenik/dodajLekciju/"+userId,{
            lekcija:{
                idLekcije:location.search.substring(1),
                bodovi:poeni
            }
        })
        console.log(res);
    }
    else
    {
        ucitaj();
    }
}

function izadji()
{
    location.href=document.getElementById("nazad").href
}