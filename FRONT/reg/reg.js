const LINK = "http://localhost";

async function registrujSE()
{ 
    try
    {

        if((String)(document.getElementById("passwordProf").value)===(String)(document.getElementById("passwordProfPot").value))
        {
            let Profesor={
                imeIprezime:(String)(document.getElementById("ImePrezimeProf").value),
                email:(String)(document.getElementById("emailProf").value),
                password:(String)(document.getElementById("passwordProf").value)
            }
            console.log(1);
            var res=await axios.post(LINK + "/api/Profesor",Profesor);
            console.log(res)    
            let id=res.data.sacuvano._id;
            console.log(id);
            localStorage.setItem("id",id);
        }
        else
        {
            console.log("nisu jednaki")
        }
       
    }
    catch(err)
    {
        console.log(err);
    }

}