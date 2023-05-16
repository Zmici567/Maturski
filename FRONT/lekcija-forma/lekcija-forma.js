async function postavi()
{
    let naslov=document.getElementById("naslovLekcije").value;
    let lekcija= document.getElementById("textLekcije").value;
    let slika= document.getElementById("slikaZaLekciju").value;

//     for(let i=1;i<=brojPitanja;i++){
//         let pitanje={
//             tekst: document.getElementById("Pitanje ${brojPitanja}").value
//             odgovor1:
//             tacanOdgovor:
//         }
//    }
   


    if(naslov==="")
    {
        document.getElementById("tika spic").innerHTML="Niste uneli temu lekcije!!"
    }
    else if(lekcije==="")
    {
        document.getElementById("tika spic").innerHTML="Niste uneli text lekcije!!"
    }
    else if(slika==="")
    {
        document.getElementById("tika spic").innerHTML="Niste uneli sliku!!"
    }
    else
    {
        let res = (await axios.post(LINK+"/api/lekcija",{
            naziv:naslov,
            tekst:lekcija,
        })).data;
        if(res.uspesnost)
        {
            location.href="../lekcije/lekcije.html";
        }
        else
        {
            document.getElementById("tika spic").innerHTML=res.message;
        }
    }
}

let brojPitanja=1;
let div=``;


async function dodajPitanje()
{
    div=` 
    <div class="pitanje">
        <p class="label">Pitanje ${brojPitanja}:</p>
        <textarea class="box4" type='text' id="textPitanja${brojPitanja}"></textarea>
        <div class="odgovor">
            <div class="tacno">
                <input type="radio" id="cbx1${brojPitanja}" class="cbx1" style="display: none;" name="odgovor${brojPitanja}">
                <label for="cbx1${brojPitanja}" class="check"  >
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                </label>
            </div>
            <div class="box-odg">
                <p class="labelp">Odgovor 1:</p>
                <textarea class="box3" type='text' id="odgovor1${brojPitanja}"></textarea>
            </div>
        </div>
        <div class="odgovor">
            <div class="tacno">
                <input type="radio" id="cbx2${brojPitanja}" class="cbx1" style="display: none;"  name="odgovor${brojPitanja}">
                <label for="cbx2${brojPitanja}" class="check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                </label>
            </div>
            <div class="box-odg">
                <p class="labelp">Odgovor 2:</p>
                <textarea class="box3" type='text' id="odgovor2${brojPitanja}"></textarea>
            </div>
        </div>
        <div class="odgovor">
            <div class="tacno">
                <input type="radio" id="cbx3${brojPitanja}" class="cbx1" style="display: none;"  name="odgovor${brojPitanja}">
                <label for="cbx3${brojPitanja}" class="check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                </label>
            </div>
            <div class="box-odg">
                <p class="labelp">Odgovor 3:</p>
                <textarea class="box3" type='text' id="odgovor3${brojPitanja}"></textarea>
            </div>
        </div>
    </div>
    <br>
    <hr class="linija">
    <br>`

    //document.getElementById("svaPitanja").innerHTML+=div;
    document.getElementById("svaPitanja").insertAdjacentHTML('beforeend', div);

    brojPitanja++;
}


async function ucitajFormuLekcije()
{
    div=` 
    <div class="pitanje">
        <p class="label">Pitanje ${brojPitanja}:</p>
        <textarea class="box4" type='text' id="textPitanja${brojPitanja}"></textarea>
        <div class="odgovor">
            <div class="tacno">
                <input type="radio" id="cbx1${brojPitanja}"  class="cbx1" style="display: none;" name="odgovor${brojPitanja}">
                <label for="cbx1${brojPitanja}" class="check"  >
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                </label>
            </div>
            <div class="box-odg">
                <p class="labelp">Odgovor 1:</p>
                <textarea class="box3" type='text' id="odgovor1${brojPitanja}"></textarea>
            </div>
        </div>
        <div class="odgovor">
            <div class="tacno">
                <input type="radio" id="cbx2${brojPitanja}"  class="cbx1" style="display: none;"  name="odgovor${brojPitanja}">
                <label for="cbx2${brojPitanja}" class="check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                </label>
            </div>
            <div class="box-odg">
                <p class="labelp">Odgovor 2:</p>
                <textarea class="box3" type='text' id="odgovor2${brojPitanja}"></textarea>
            </div>
        </div>
        <div class="odgovor">
            <div class="tacno">
                <input type="radio" id="cbx3${brojPitanja}"  class="cbx1" style="display: none;"  name="odgovor${brojPitanja}">
                <label for="cbx3${brojPitanja}" class="check">
                    <svg width="18px" height="18px" viewBox="0 0 18 18">
                        <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                        <polyline points="1 9 7 14 15 4"></polyline>
                    </svg>
                </label>
            </div>
            <div class="box-odg">
                <p class="labelp">Odgovor 3:</p>
                <textarea class="box3" type='text' id="odgovor3${brojPitanja}"></textarea>
            </div>
        </div>
    </div>
    <br>
    <hr class="linija">
    <br>`
    document.getElementById("svaPitanja").innerHTML=div;
    brojPitanja++;
}