async function prijaviSE()
{
    let email = document.getElementById("cirko").value;
    let password = document.getElementById("sojic").value;


    if(email==="")
    {
        document.getElementById("tika spic").innerHTML="Niste uneli Email!!!"
    }
    else if(password === "")
    {
        document.getElementById("tika spic").innerHTML="Niste uneli sifru!!!"
    }
    else
    {
        let res = await axios.post(LINK+"/api/login",{
            email:email,
            password:password
        })
        if(res.data.uspesnost)
        {
            localStorage.setItem("id",res.data.id);
            location.href="/";
        }
        else
        {
            if(res.data.message === "404 not found")
            {
                document.getElementById("tika spic").innerHTML="Pogresan Email/Ime i Prezime ili Password";
            }
            else
            {
                document.getElementById("tika spic").innerHTML=res.data.message;
            }
        }
    }
}