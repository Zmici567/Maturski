async function izmeniUcenika(){

    document.getElementById("izmeniDiv").style.display="block";

    let id=location.search.substring(1)
    let res=await axios.get(LINK+"/api/getOne/"+id)

    if(res.data.uspesnost)
    {
        let ucenik = res.data.user;
        document.getElementById("imeUcenikEdit").value=ucenik.imeIprezime;
        document.getElementById("sifraUcenikEdit").value=ucenik.password;
    }
}

async function izmeniUcenikaNone(){

    document.getElementById("izmeniDiv").style.display="none";
}

async function ucitaj()
{
    let id = location.search.substring(1);
    let res = await axios.get(LINK+"/api/getOne/"+id);
    let ucenik = res.data.user;
    if(res.data.uspesnost)
    {
        document.getElementById("text-h").innerHTML=ucenik.imeIprezime;
        document.getElementById("bodovi").innerHTML=ucenik.brojBodova;

        let div=``;
        for(let i = 0; i<ucenik.uradjeneLekcije.length;i++ )
        {
            let res = await axios.get(LINK+"/api/lekcija/"+ucenik.uradjeneLekcije[i].idLekcije);
            if(res.data.uspesnost)
            {
                let naziv=res.data.lekcije.naziv;

                div+=`<div class="lekcija"> <p>${naziv}</p> <div class="bodovi"><p class="b-text">Bodovi:</p><p>${ucenik.uradjeneLekcije[i].bodovi}</p></div> </div>`
            }
        }
        document.getElementById("container").innerHTML=div;
    }

    let userId = localStorage.getItem("id");

    res = await axios.get(LINK+"/api/getOne/"+userId);
    if(res.data.uspesnost)
    {
        let user = res.data.user;
        if(user.tip===0)
        {
            document.getElementById("nazad").href="../odeljenje/odeljenje.html?"+ucenik.idOdeljenja;
        }
        else if(user.tip === 1)
        {
            document.getElementById("nazad").href="../index.html";
            document.getElementById("dugmeEditUcenik").style.display="none"
        }
    }
}

async function UcenikIzmeni()
{
    let ime= document.getElementById("imeUcenikEdit").value
    let sifra=document.getElementById("sifraUcenikEdit").value

    let id = location.search.substring(1);

    let Ucenik={
        imeIprezime:ime,
        password:sifra
    }

    var res=await axios.put(LINK + "/api/ucenik/podaci/"+id,Ucenik);
         
        if(res.data.uspesnost)
        {
            document.getElementById("izmeniDiv").style.display="none";
            await ucitaj();
        }
        else
        {
            document.getElementById("izmeniDiv").style.display="none";
        }

}