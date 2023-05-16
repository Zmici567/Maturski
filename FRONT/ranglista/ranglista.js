async function UcitajRangLitu(){
    document.getElementById("nazad").href+=location.search;
    let res = await axios.get(LINK+ "/api/rangLista/"+location.search.substring(1));
    if(res.data.uspesnost)
    {
        let ucenici=res.data.users;
        console.log(ucenici);
        document.getElementById("1mestoN").innerHTML=ucenici[0].imeIprezime;
        document.getElementById("1mestoB").innerHTML=ucenici[0].brojBodova;

        document.getElementById("2mestoN").innerHTML=ucenici[1].imeIprezime;
        document.getElementById("2mestoB").innerHTML=ucenici[1].brojBodova;

        document.getElementById("3mestoN").innerHTML=ucenici[2].imeIprezime;
        document.getElementById("3mestoB").innerHTML=ucenici[2].brojBodova;

        let div='';
        for(let i =3; i<ucenici.length;i++)
        {
            div+=`<div class="tron2"><h3>${ucenici[i].imeIprezime}</h3><h3 class="bodovi">${ucenici[i].brojBodova}</h3></div>`
        }
        
        document.getElementById("ostali").innerHTML=div;

    }
}
