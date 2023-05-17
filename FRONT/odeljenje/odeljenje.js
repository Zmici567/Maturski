async function dodajUcenikaDiv(){

    document.getElementById("divDodajUcenika").style.display="block";
}

async function dodajUcenikaDivNone(){

    document.getElementById("divDodajUcenika").style.display="none";
}

async function izmeniDiv(){

    document.getElementById("izmeniDiv").style.display="block";
    

    let id=location.search.substring(1)
    let res=await axios.get(LINK+"/api/odeljenje/"+id)

    if(res.data.uspesnost)
    {
        let odeljenje = res.data.odeljenje;
        document.getElementById("editSkola").value=odeljenje.skola;
        document.getElementById("editOdeljenje").value=odeljenje.naziv;
    }
}

async function izmeniNone(){

    document.getElementById("izmeniDiv").style.display="none";
}


async function ucitajOdeljenje(){
    let id=location.search.substring(1)
    let res=await axios.get(LINK+"/api/odeljenje/"+id)

    if(res.data.uspesnost)
    {
        let odeljenje = res.data.odeljenje;

        document.getElementById("odeljenjeSkola").innerHTML=odeljenje.skola;
        document.getElementById("odeljenjeNaziv").innerHTML=odeljenje.naziv;

        let div=``;
        
        let idUcenika=odeljenje.idUcenika;
        for(let i=0;i<idUcenika.length;i++)
        {
            let res=await axios.get(LINK+"/api/getOne/"+idUcenika[i]);
            if(res.data.uspesnost)
            {
                let ucenik=res.data.user;
                div+=`
                <div class="ucenik"> 
                    <p>${ucenik.imeIprezime}</p> 
                    <div class="ikonice">
                        <a href="../postignuca/postignuca.html?${ucenik._id}" class="a-img" style="display: flex;">
                            <img class="brisi"  src="../slike/ucenik.png">
                        </a>
                        <div class="brisiU" onclick="obrisiUcenika('${ucenik._id}')"><img class="brisi" src="../slike/kanta.png"></div>
                    </div> 
                </div>
                `
            }
        }

        
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
            var res=await axios.post(LINK+"/api/Ucenik",Ucenik)
            if(res.data.uspesnost)
            {
                document.getElementById("divDodajUcenika").style.display="none";
                document.getElementById("imeUcenika").value="";
                document.getElementById("sifraUcenika").value="";
                await ucitajOdeljenje();
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

async function obrisiUcenika(id)
{
    if(confirm("Da li ste sigurni da zelite da obrisete ucenika?")===true)
    {
        let res = await axios.delete(LINK+"/api/users/"+id);
        if(res.data.uspesnost)
        {
            await ucitajOdeljenje();
        }
    }
}

async function brisiOdeljenje(id)
{
    if(confirm("Da li ste sigurni da zelite da obrisete odeljenje?")===true)
    {
        let res = await axios.delete(LINK+"/api/odeljenje/"+id);
        if(res.data.uspesnost)
        {
            location.href="../odeljenje-lista/lista.html";
        }
    }
}

async function izmeniOdeljenje()
{
    let skola= document.getElementById("editSkola").value
    let odeljenje=document.getElementById("editOdeljenje").value

    let id=location.search.substring(1)

        let Odeljenje={
            skola:skola,
            naziv:odeljenje
        }
        var res=await axios.put(LINK + "/api/odeljenje/"+id,Odeljenje);
        if(res.data.uspesnost)
        {
            document.getElementById("izmeniDiv").style.display="none";
            await ucitajOdeljenje();
        }
        else
        {
            document.getElementById("izmeniDiv").style.display="none";
        }

}

document.getElementById("jebenilink").href+="?"+location.search.substring(1);