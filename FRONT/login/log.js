

async function prijaviSE()
{
    let email = document.getElementById("cirko").value;
    let password = document.getElementById("sojic").value;

    let res = await axios.post(LINK+"/api/login",{
        email:email,
        password:password
    })
    if(res.data.uspesnost)
    {
        console.log(res.data.id);
        localStorage.setItem("id",res.data.id);
        location.href="/";
    }
    else
    {
        console.log(res.data.message);
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