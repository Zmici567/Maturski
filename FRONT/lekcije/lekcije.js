async function ucitajLekcije()
{
    let navbar=document.getElementById("lekcije")
    navbar.classList.add("activ")
    let idKor=localStorage.getItem("id");
   
    let res = await axios.get(LINK+"/api/lekcije");
    
        if(res.data.uspesnost)
        {
            let lekcije=res.data.lekcije;
            let div=``;

            if(idKor!=null)
            {
                for(let i=0;i<lekcije.length;i++)
                {
                    let idProf=lekcije[i].idProfesora;
                    let res2= await axios.get(LINK+"/api/getOne/"+idProf)
                    if(res2.data.uspesnost)
                    {
                        console.log(5)
                        let prof=res2.data.user.imeIprezime;
                        console.log(prof)
                
                        div+=`
                            <div class="kartica ${(i%2==0)?"levo":"desno"}">
                                <div  class="post-kartica">
                                    <img src="../slike/${lekcije[i].slika}" class="slika" style="width: 220px;" /> 
                                </div>
                                <div class="naslov-kartice" >
                                    <div class="naslov"> <p>Autor lekcije: ${prof}</p><h1 >${lekcije[i].naziv}</h1></div>
                                    <div class="autor-kartice" id="pokreniLekciju?${i}"><a href="../lekcija-test/lekcija-test.html?${lekcije[i]._id}"><div class="cta">
                                        <span  class="hover-underline-animation" >Pokreni lekciju</span>
                                        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                                            <path class="strelica" transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                                        </svg>
                                    </div> </a></div>
                                </div>
                            </div>`
                        

                    }  
                    document.getElementById("lekcijeDiv").innerHTML=div;
            }  } 
             else
            {
                for(let i=0;i<lekcije.length;i++)
                {
                    let idProf=lekcije[i].idProfesora;
                    let res2= await axios.get(LINK+"/api/getOne/"+idProf)
                    if(res2.data.uspesnost)
                    {
                        console.log(5)
                        let prof=res2.data.user.imeIprezime;
                        console.log(prof)
                   
                        div+=`
                            <div class="kartica ${(i%2==0)?"levo":"desno"}">
                                <div  class="post-kartica">
                                    <img src="../slike/${lekcije[i].slika}" class="slika" style="width: 220px;" /> 
                                </div>
                                <div class="naslov-kartice" >
                                    <div class="naslov"> <p>Autor lekcije: ${prof}</p><h1 >${lekcije[i].naziv}</h1></div>
                                    <div class="autor-kartice" id="pokreniLekciju "><a href="../lekcija-test/lekcija-test.html?${lekcije[i]._id}"><div class="cta">
                                        <span  class="hover-underline-animation" style="display: none;>Pokreni lekciju</span>
                                        <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                                            <path class="strelica" transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                                        </svg>
                                    </div> </a></div>
                                </div>
                            </div>`
                        
    
                    }  
             
                }
                document.getElementById("lekcijeDiv").innerHTML=div;
            }
           

            
          
         

        }


}

