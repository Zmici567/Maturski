const ex = require("express");
const cors = require("cors");

const baza = require("./BAZA/baza");

const user = require("./FUNCTIONS/user");

const app = ex();

const PORT = 80;

app.use(cors());
app.use(ex.json());

app.listen(PORT, function (){
    console.log("Server slusa na portu: "+PORT);
})

baza();

app.get("/api/users",user.getUsers);
app.post("/api/Ucenik", user.postUcenik);
app.post("/api/Profesor", user.postProfesor);
app.delete("/api/users/:id",user.delete);