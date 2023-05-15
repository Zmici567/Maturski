async function dodajUcenikaDiv(){

    document.getElementById("divDodajUcenika").style.display="block";
}

async function dodajUcenikaDivNone(){

    document.getElementById("divDodajUcenika").style.display="none";
}

async function izmeniDiv(){

    document.getElementById("izmeniDiv").style.display="block";
}

async function izmeniNone(){

    document.getElementById("izmeniDiv").style.display="none";
}


async function ucitajOdeljenje(){
    let id=location.search.substring(1)
    let res=await axios.get(LINK+"/api/odeljenje/"+id)
    console.log(res);

    if(res.data.uspesnost)
    {
        let odeljenje = res.data.odeljenje;

        document.getElementById("odeljenjeSkola").innerHTML=odeljenje.skola;
        document.getElementById("odeljenjeNaziv").innerHTML=odeljenje.naziv;

        let div=``;
        await (odeljenje.idUcenika.forEach(await (async idUcenika => {
            let res=await axios.get(LINK+"/api/getOne/"+idUcenika);
            console.log(res);

            if(res.data.uspesnost)
            {
                let ucenik=res.data.user;
                console.log(ucenik)
                div+=`
                <div class="ucenik"> 
                    <p>${ucenik.imeIprezime}</p> 
                    <div class="ikonice">
                        <a href="../postignuca/postignuca.html?${ucenik._id}" class="a-img" style="display: flex;">
                            <img class="brisi"  src="../slike/ucenik.png">
                        </a>
                        <img class="brisi" src="../slike/kanta.png">
                    </div> 
                </div>
                `
            }
        })));
        console.log(div)
        document.getElementById("container").innerHTML=div;
    }
}

async function dodajUcenika()
{
    id=location.search.substring(1)
    try
    {
        let ime=document.getElementById("imeUcenika").value;
        let sifra= document.getElementById("sifraUcenika").value;
       
        if(ime==="")
        {
            document.getElementById("tika spic").innerHTML="Niste uneli Ime i Pezime!!!"
        }
        else if(sifra === "")
        {
            document.getElementById("tika spic").innerHTML="Niste uneli sifru!!!"
        }
        else if(sifra.length<8)
        {
            document.getElementById("tika spic").innerHTML="Sifra ima manje od 8 karaktera!!!";
        }
        else{
            let Ucenik={
                imeIprezime:(String)(document.getElementById("imeUcenika").value),
                password:(String)(document.getElementById("sifraUcenika").value),
                idOdeljenja:id
            }
            console.log("ucitaj ucenika")
            var res=await axios.post(LINK+"/api/Ucenik",Ucenik)
            console.log(res)
            if(res.data.uspesnost)
            {
                document.getElementById("divDodajUcenika").style.display="none";
                document.getElementById("imeUcenika").value="";
                document.getElementById("sifraUcenika").value="";

            }
            else
            {
                document.getElementById("tika spic").innerHTML=res.data.message;
            }
        }

        
    }
    catch(err)
    {
        console.log(err)
    }
}