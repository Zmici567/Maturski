async function ucitajMojeLekcije()
{
    let navbar=document.getElementById("mojeLekcije")
    navbar.classList.add("activ")

    let res = await axios.get(LINK+"/api/lekcije");
    
    if(res.data.uspesnost)
    {
        let lekcije=res.data.lekcije;
        let div=``;
        
        let mojId=localStorage.getItem("id");

        for(let i=0;i<lekcije.length;i++)
        {
            let idProf=lekcije[i].idProfesora;
            let res2= await axios.get(LINK+"/api/getOne/"+idProf)
            if(res2.data.uspesnost)
            {
                
               if(mojId===idProf)
               {
                    div+=`
                    <div class="kartica ${(i%2==0)?"levo":"desno"}">
                        <div  class="post-kartica">
                            <img src="../slike/${lekcije[i].slika}" class="slika" style="width: 220px;" /> 
                        </div>
                        <div class="naslov-kartice" >
                            <div class="naslov">
                                <h1 >${lekcije[i].naziv}</h1>
                            </div>
                            <div class="ikonice"  onclick="obrisiLekciju('${lekcije[i]._id}')">
                                <img src="../slike/kanta.png" class="ikonica2" style="height: 40px;" />
                            </div>
                        </div>
                    </div>`
               }
            }   
        }
        document.getElementById("MojLekcijeDiv").innerHTML=div;
    } 
       
} 

async function obrisiLekciju(id)
{
    if(confirm("Da li ste sigurni da zelite da obrisete Lekciju?")===true)
    {
        let res = await axios.delete(LINK+"/api/lekcija/"+id);
        if(res.data.uspesnost)
        {
            await ucitajMojeLekcije();
        }
    }
}