


const express = require('express');
const app = express();
app.use(express.json());


let mysql = require("mysql");
let conexion = mysql.createConnection({
    hots: "localhost:3306",
    database: "planillas",
    user: "root",
    password: "root"

});

app.post('/prueba',(req,res)=> {
    const infoprueba = req.body;
    const requiredKeys = ["p1"]
    try{
        if (Object.keys(infoprueba).includes("p1"))
        {
            const sql  = "INSERT INTO pruebas (nombre) VALUES (req.body)"
            

            res.send("dato insertado");
            
            console.log("dato a insertar", req.body);
        }
        else{
            res.sendStatus(500)
            console.log("pailas, no se pudo");
        }
    }
    catch{
        res.sendStatus(500);
    }
});

app.get('/partidos',(req, res)=>{
    console.log("alguien hizo get en la ruta /partidos");
    res.send('Aun no hay partidos');
    
});

app.post("/partidos/nuevo",(req,res) => {
    const infoPartido = req.body;

    try{
        if (Object.keys(infoPartido).includes("equipo1") && Object.keys(infoPartido).includes("equipo2"))
    {
        res.send("partido creado");
            res.status(200);
            console.log("partido a crear", req.body);
            
        }
        else{
            res.sendStatus(500);
            console.log("debes ingresar el nombre de ambos equipos")
        }
    }
        catch{
            res.sendStatus(500);
        }
        
    
});


app.get('/partidos/n/equipon',(req, res)=>{
    console.log("alguien hizo get en la ruta /partidos/n");
    conexion.collection("equipos").find({}).limit(50).toArray((err,result)=> {
        if (err){
            res.status(400).send("error consultando los equipos");
        }
        else{
            res.json(result);
            res.sendStatus(200);
        }
    })
});


app.post("/partidos/n/equipon",(req,res) => {
    const infEquipo = req.body;
    const requiredKeys = ["j1" ,"j2", "j3", "j4", "j5", "j6"]
    try{
        if (requiredKeys.every(key => Object.keys(infEquipo).includes(key))){

            res.send("Equipo creado");
            conexion.collection("equipos").insertOne(infEquipo), (err,result) =>{
                if(err){
                    console.log(err);
                    res.sendStatus(500);
                }
                else{
                    res.sendStatus(200);
                    console.log(result);
                }
            }
            res.status(200);
            console.log("equipo a crear", req.body);
        }
        else{
            res.sendStatus(500);
            console.log("debes tener mínimo 6 jugadores para crear el equipo");
        }
    }

    catch{
        res.sendStatus(500);
    }

});





const main =() =>{
    conexion.connect ((err)=>{
        if(err){
            console.error("Error conectando a la base de datos");
        }else {
        console.log("conexión exitosa");
        return app.listen(5000, () => {
            console.log('usando puerto 5000');
        });
    }
    })

    
};


main();