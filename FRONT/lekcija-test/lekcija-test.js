async function load()
{
    let id =location.search.substring(1);

    let res=await axios.get(LINK+"/api/lekcija/"+id);

    if(res.data.uspesnost)
    {
        let lekcija=res.data.lekcije;
        let div=`
        <br>
        <a href="../lekcije/lekcije.html" class="dugmenazad"> <img src="../slike/back (1).png" class="nav-slika" style="height: 20px; margin-right: 10px;" />NAZAD</a><br>
        <div class="log"> <br>
            <h1>${lekcija.naziv}</h1> <br><br>
        <div class="lekcija">
            <img src="../slike/${lekcija.slika}" alt="" style="width: 100%;">
        </div>

            <div class="lekcija">
                <p>${lekcija.tekst}</p>
            </div>
            


            <br>
            <div class="pokreni-test"><a href="../test/test.html?${id}" class="cta">
                <span  class="hover-underline-animation">Pokreni test</span>
                <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                    <path class="strelica" transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                </svg>
            </div> </a></div><br>

        </div>
        <br><br><br>
        `
        document.getElementById("lekcija").innerHTML=div;
    }
}