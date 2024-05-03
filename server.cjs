

const cors = require('cors');
const lod = require('lodash');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());

let mysql = require("mysql");
let conexion = mysql.createConnection({
    host: "localhost",
    port: "3306",
    database: "planillas",
    user: "root",
    password: "root"

});


app.get('/partidos',(req, res)=>{
    console.log("alguien hizo get en la ruta /partidos");
    res.send('Aun no hay partidos');
    
});

app.post("/partidos/nuevo",(req,res) => {
    const infoPartido = req.body;
    let id= null;
    console.log(req.body)
    try{
        if (Object.keys(req.body) !== null)
    {   
        const valores= [req.body.ciudad,req.body.escenario,req.body.division,req.body.categoria, req.body.fechaYHora];
        console.log(valores);
        
        const sql ="INSERT INTO partidos (ciudad,escenario,division,categoria,fecha) VALUES (?,?,?,?,?)";
        const sqlg="SELECT last_insert_id() AS last_id";
        
        
        conexion.query(sql, valores, (error, results)=>{
            if (error) {
                console.error("error al insertar datos", error);
            }
        }
        
        );

        conexion.query(sqlg,(error,results) => {
            if (error){
                console.error(error);
                
            }

        id= results[0].last_id;
        const sqle="INSERT INTO equipos (nombre,partidos_idpartido) VALUES (?,?)";

        });
        const valores1= [req.body.equipo1,id];
        
        conexion.query(sqle,valores1, (error,results)=>{
            
            
            if (error){
                console.error(error);
                
            }

        });

        const valores2= [req.body.equipo2,id];
        
        conexion.query(sqle,valores2, (error,results)=>{
            
            
            if (error){
                console.error(error);
                
            }

        });

        

        
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

app.post("/partidos/setn",(req, res)=>{
    const infoSets = req.body;
    try{
        if (Object.keys(req.body) !==null){
            const valores1 = [req.body.puntosASet1, req.body.puntosBSet1 , 1 ,3];
            const valores2 = [req.body.puntosASet2, req.body.puntosBSet2 , 2 ,3];
            const valores3 = [req.body.puntosASet3, req.body.puntosBSet3 , 3 ,3];
            console.log(valores1);
            console.log(valores2);
            console.log(valores3);
            const sql = "INSERT INTO sets (puntosEqA, puntosEqB, numeroSet, partidos_idpartido) VALUES (?,?,?,?)";
            conexion.query(sql,valores1,(error, results)=>{
                if (error){
                    console.error("error al insertar set", error);
                }
            })
            conexion.query(sql,valores2,(error, results)=>{
                if (error){
                    console.error("error al insertar set", error);
                }
            })
            conexion.query(sql,valores3,(error, results)=>{
                if (error){
                    console.error("error al insertar set", error);
                }
            })

            res.send("sets creados");
            res.status(200);
            console.log("datos insertados",req.body);
        }

        else{
            res.sendStatus(500);
            console.log("debe haber información de los sets")
        }

    }
    catch{
        res.sendStatus(500)
    }
}

);

app.post("/partidos/equipon",(req,res) => {
    const infEquipo = req.body;
    console.log(req.body);
    try{
        if(Object.keys(req.body) !== null)
        {
            const valores=[req.body.nombre,1]
            const sql = "INSERT INTO equipos(nombre, partidos_idpartido) VALUES (?,?)"  
            conexion.query(sql, valores,(error, results)=>{
                if (error){
                    console.error("error al insertar equipo", error);
                }
            }
        )
        res.send("equipo creado");
        res.status(200)
        console.log("equipo a crear", req.body);
        }
        else{
            res.sendStatus(500);
            console.log("debes ingresar un pinche nombre")
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
            console.log(err)
        }else {
        console.log("conexión exitosa");
        return app.listen(5000, () => {
            console.log('usando puerto 5000');
        });
    }
    })

    
};


main();

