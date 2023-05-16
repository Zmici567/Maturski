const ex = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const upload = multer({ 
    dest: '../FRONT/SLIKE/',
    fileFilter:function(req,file,calback){
        let ext = path.extname(file.originalname);
        if(ext != '.jpg' && ext!='.png' && ext!='.jpeg' )
        {
            return calback(new Error('Only pictures are allowed'))
        }
        calback(null, true);
    }
})

const baza = require("./BAZA/baza");

const user = require("./FUNCTIONS/user");
const odeljenje= require("./FUNCTIONS/odeljenje");
const lekcija = require("./FUNCTIONS/lekcije");

const app = ex();

const PORT = 80;

app.use(cors());
app.use(ex.json());

app.listen(PORT, function (){
    console.log("Server slusa na portu: "+PORT);
})

app.use(ex.static("../FRONT/"));

baza();

app.get("/api/users",user.getUsers);
app.post("/api/Ucenik", user.postUcenik);
app.post("/api/Profesor", user.postProfesor);
app.delete("/api/users/:id",user.delete);
app.post("/api/login",user.login);
app.get("/api/getOne/:id",user.getOneUser);
app.put("/api/ucenik/podaci/:id",user.UcenikPromenaPodataka);
app.put("/api/ucenik/bodovi/:id",user.promenaBodova);
app.put("/api/ucenik/dodajLekciju/:id", user.dodavanjeLekcije)
app.get("/api/rangLista/:idOdeljenja", user.rangLitaSort)

app.get("/api/odeljenja/:id_profesora",odeljenje.get);
app.post("/api/odeljenje",odeljenje.post);
app.delete("/api/odeljenje/:id",odeljenje.delete);
app.get("/api/odeljenje/:id",odeljenje.getById);
app.put("/api/odeljenje/:id", odeljenje.izmeni);

app.get("/api/lekcije",lekcija.get);
app.get("/api/lekcija/:id", lekcija.getById);
app.delete("/api/lekcija/:id", lekcija.delete);
app.post("/api/lekcija", upload.single("slika"), lekcija.post)
