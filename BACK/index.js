const ex = require("express");
const cors = require("cors");

const baza = require("./BAZA/baza");

const user = require("./FUNCTIONS/user");
const odeljenje= require("./FUNCTIONS/odeljenje")

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

app.get("/api/odeljenja/:id_profesora",odeljenje.get);
app.post("/api/odeljenje",odeljenje.post);
app.delete("/api/odeljenje/:id",odeljenje.delete);
app.put("/api/odeljenje/:id", odeljenje.addUcenik);
