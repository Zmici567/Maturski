async function izmeniUcenika(){

    document.getElementById("izmeniDiv").style.display="block";
}

async function izmeniUcenikaNone(){

    document.getElementById("izmeniDiv").style.display="none";
}

async function ucitaj()
{
    let id = location.search.substring(1);
    console.log(id);
    let res = await axios.get(LINK+"/api/getOne/"+id);
    if(res.data.uspesnost)
    {
        let ucenik = res.data.user;
        console.log(ucenik);
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

    let userId;
}