

async function kreirajOdeljenje(){
    try
    {
        let skola=document.getElementById("skola").value;
        let naziv=document.getElementById("odeljenje").value;
    
        if(skola==="")
        {
            document.getElementById("tika spic").innerHTML="Niste uneli skolu!!!"
        }
        else if(naziv === "")
        {
            document.getElementById("tika spic").innerHTML="Niste uneli odeljenje!!!"
        }
        else if(!naziv.includes('/'))
        {
            document.getElementById("tika spic").innerHTML="Zapisati odeljenje u obliku '<i>razred</i>/<i>odeljenje</i>'";
        }
        else
        {
            let Odeljenje={
                skola:(String)(document.getElementById("skola").value),
                naziv:(String)(document.getElementById("odeljenje").value),
                idProfesora:localStorage.getItem("id")
            }
            console.log(5)
            var res=await axios.post(LINK + "/api/odeljenje",Odeljenje);
            console.log(res)  
            if(res.data.uspesnost)
            {
                location.href="../odeljenje-lista/lista.html";
            }
            else
            {
                      
            }
        }

       
    }
    catch(err)
    {
        console.log(err)
    }
}