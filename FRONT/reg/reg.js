
async function registrujSE()
{ 
    try
    {

        let ImeIPrezime = document.getElementById("IiP").value;
        let email = document.getElementById("email").value;
        let pass = document.getElementById("pass").value;
        let cpass = document.getElementById("cpass").value;

        if(ImeIPrezime==="")
        {
            document.getElementById("tika spic").innerHTML="Niste uneli Ime i Pezime!!!"
        }
        else if(email==="")
        {
            document.getElementById("tika spic").innerHTML="Niste uneli Email!!!"
        }
        else if(pass === "")
        {
            document.getElementById("tika spic").innerHTML="Niste uneli sifru!!!"
        }
        else if(pass!==cpass)
        {
            document.getElementById("tika spic").innerHTML="Sifre se ne poklapaju!!!";
        }
        else if(!email.includes('@'))
        {
            document.getElementById("tika spic").innerHTML="Email nije validan!!!";
        }
        else if(pass.length<8)
        {
            document.getElementById("tika spic").innerHTML="Sifra ima manje od 8 karaktera!!!";
        }
        else
        {
            let t=false;
            let u=false;
            let v=false;
            for(let i=0;i<pass.length;i++) 
            {
                let element=pass.charCodeAt(i);
                if(element>=97 && element<=122)
                {
                    t=true;
                }
                else if(element>=65 && element<=90)
                {
                    u=true;
                }
                else if(element>=48 && element<=57)
                {
                    v=true;
                }
            }
            if(!t || !u || !v)
            {
                document.getElementById("tika spic").innerHTML="Sifra nije dovoljno sigurna";
            }
            else
            {
                let res = (await axios.post(LINK+"api/Profesor",{
                    imeIprezime:ImeIPrezime,
                    password:pass,
                    email:email
                })).data;
                if(res.uspesnost)
                {
                    location.href="/";
                }
                else
                {
                    document.getElementById("tika spic").innerHTML=res.message;
                }
            }
        }
       
    }
    catch(err)
    {
        console.log(err);
    }

}