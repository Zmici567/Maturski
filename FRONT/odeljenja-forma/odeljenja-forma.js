

async function kreirajOdeljenje(){
    try
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
    catch(err)
    {
        console.log(err)
    }
}