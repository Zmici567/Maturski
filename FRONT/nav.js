
let body=document.body.innerHTML;
let nav=`
<div class="nav">
    <input type="checkbox" id="nav-check">
    <div class="nav-header">
        <div class="nav-title">
            <img src="../slike/g109.png" class="nav-slika" style="height: 60px;" />
        </div>
    </div>

    <div class="nav-btn">
        <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
        </label>
    </div>

    <div class="nav-links">
    <a class="navbar" id="pocetna" href="../index.html"  >Početna</a>
    <a class="navbar" id="oNama" href="#onama" >O nama</a>
    <a class="navbar" id="lekcije" href="../lekcije/lekcije.html">Lekcije</a>
    <a class="navbar" id="odeljenja" href="../odeljenje-lista/lista.html" style="display: none;" >Odeljenja</a>
    <a class="navbar" id="mojeLekcije" href="../moje-lekcije/moje-lekvije.html" style="display: none;">Moje lekcije</a>
    <a class="navbar" id="PrijaviSE" href="../login/log.html" >Prijavi se</a>
    <div class="navImeDiv" id="navIme"  style="display: none;"><div class="ImePrezimeDugme" id="imePrezime" onclick="odjaviDiv()"><img src="../slike/ucenik.png" class="korisnik" /></div></div>
    <a href="../postignuca/postignuca.html" id="postignucaMob" style="display: none;"><div class="navOdjavi"><p>POSTIGNUCA</p></div></a>
    <div class="navOdjavi" id="odjaviMob" onclick="odjaviMeMob()" style="display: none;> <img src="../slike/logOut.png" class="odjavi" /> <p>Odjavi se</p> </div>
</div>


    <div class="divOdjaviSE" id="odjaviMe" style="display:none;">
        <div class="divSpic">  <img src="../slike/spic.png" class="spic"/> </div>
          <div class="odjavise"> 
          <a id="postignucaLink" href="../postignuca/postignuca.html" ><div class="odjaviDugme" id="postignuca" style="display: none;"><p>POSTIGNUCA</p></div></a>
            <div class="odjaviDugme" onclick="odjaviMe()"> <img src="../slike/logOut.png" class="odjavi" /> <p>Odjavi se</p> </div>
          </div>
      </div>
    </div>
</div>
${body}`

try
{ 
    document.body.innerHTML="";
    document.body.innerHTML=nav;
}
catch(err)
{
    console.log(err.message);
}



let id=localStorage.getItem("id");



async function test()
{
    console.log(1);
    if(id!==null)
    {
        document.getElementById("PrijaviSE").style.display="none";
        document.getElementById("navIme").style.display="flex"
        if(window.innerWidth<=1070)
        {
            document.getElementById("odjaviMob").style.display="flex"
        }
        
        window.addEventListener("resize",()=>{
            if(window.innerWidth<=1070)
            {
                document.getElementById("odjaviMob").style.display="flex"
                document.getElementById("odjaviMe").style.display="none";
            }
            else
            {
                document.getElementById("odjaviMob").style.display="none"
            }
        })

        let res=await axios.get(LINK+"/api/getOne/"+id);
        console.log(res);
        if(res.data.uspesnost)
        {
            let user=res.data.user;
            document.getElementById("imePrezime").innerHTML+=user.imeIprezime;

            console.log(user.tip===1);
            if(user.tip===0)
            {
                document.getElementById("odeljenja").style.display="block"
                document.getElementById("mojeLekcije").style.display="block"
                document.getElementById("oNama").style.display="none"
            }
            else if(user.tip===1)
            {

                document.getElementById("oNama").style.display="none"
                document.getElementById("postignuca").style.display="block"
                document.getElementById("postignucaMob").style.display="block"
                document.getElementById("postignucaMob").href+="?"+user._id;
                document.getElementById("postignucaLink").href+="?"+user._id;
            }
        }
        

    }
}
test()

let provera=0;
function odjaviDiv()
{
    if(window.innerWidth>1070)
    {
        if(provera===0)
        {
            console.log(2);
            document.getElementById("odjaviMe").style.display="block";
            provera=1;
        }
        else if(provera===1)
        {
            console.log(3);
            document.getElementById("odjaviMe").style.display="none";

            provera=0;
        }
    }  
}

function odjaviMe(){
    localStorage.removeItem("id");
    location.reload();
}