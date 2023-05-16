async function ucitajLekcije()
{
    let navbar=document.getElementById("lekcije")
    navbar.classList.add("activ")
    let id=localStorage.getItem("id");
    if(id!=null)
    document.getElementById("pokreniLekciju").style.display="flex"
}