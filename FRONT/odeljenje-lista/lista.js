let odeljenjeKartica=` 
<a href="../odeljenje/odeljenje.html">
    <div class="card-client">
        <div class="odeljenje">
            <h1>4/4</h1>
        </div>
        <p class="name-client"> Škola:
            <span>Gimnazija</span>
        </p>
        <div class="social-media">
        </div>
    </div>
</a>`

async function ucitaj()
{
    let div=``;
    let res= await axios.get(LINK+"/api/odeljenja/"+localStorage.getItem("id"));

    if(res.data.uspesnost)
    {
        let odeljenja=res.data.odeljenja;
        odeljenja.forEach(odeljenje => {
            div+=`
        <a href="../odeljenje/odeljenje.html?${odeljenje._id}">
            <div class="card-client">
                <div class="odeljenje">
                    <h1>${odeljenje.naziv}</h1>
                </div>
                <p class="name-client"> Škola:
                    <span>${odeljenje.skola}</span>
                </p>
                <div class="social-media">
                </div>
            </div>
        </a>`
        });
        document.getElementById("listaOdeljenja").innerHTML=div;
    }

    let navbar=document.getElementById("odeljenja")
    navbar.classList.add("activ")
}