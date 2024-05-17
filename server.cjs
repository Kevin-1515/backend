

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

app.post("/partidos/nuevo", (req, res) => {
    const infoPartido = req.body;

    try {
        if (infoPartido.equipo1 && infoPartido.equipo2) {
            const valoresPartido = [infoPartido.ciudad, infoPartido.escenario, infoPartido.division, infoPartido.categoria, infoPartido.fechaYHora];
            const sqlInsertPartido = "INSERT INTO partidos (ciudad, escenario, division, categoria, fecha) VALUES (?, ?, ?, ?, ?)";
            const sqlLastInsertId = "SELECT LAST_INSERT_ID() AS last_id";
            const sqlInsertEquipo = "INSERT INTO equipos (nombre, partidos_idpartido) VALUES (?, ?)";

            conexion.query(sqlInsertPartido, valoresPartido, (error, results) => {
                if (error) {
                    console.error("Error al insertar datos del partido", error);
                    return res.status(500).send("Error interno del servidor");
                }

                conexion.query(sqlLastInsertId, (error, results) => {
                    if (error) {
                        console.error("Error al obtener el ID del partido", error);
                        return res.status(500).send("Error interno del servidor");
                    }

                    const idPartido = results[0].last_id;
                    const valoresEquipo1 = [infoPartido.equipo1, idPartido];
                    const valoresEquipo2 = [infoPartido.equipo2, idPartido];

                    // Insertar equipo 1
                    conexion.query(sqlInsertEquipo, valoresEquipo1, (error, results) => {
                        if (error) {
                            console.error("Error al insertar equipo 1", error);
                            return res.status(500).send("Error interno del servidor");
                        }

                        // Insertar equipo 2
                        conexion.query(sqlInsertEquipo, valoresEquipo2, (error, results) => {
                            if (error) {
                                console.error("Error al insertar equipo 2", error);
                                return res.status(500).send("Error interno del servidor");
                            }

                            res.status(200).send("Partido y equipos insertados correctamente");
                        });
                    });
                });
            });
        } else {
            res.status(400).send("Debes ingresar el nombre de ambos equipos");
        }
    } catch (error) {
        console.error("Error en la solicitud", error);
        res.status(500).send("Error interno del servidor");
    }
});


app.get('/partidos/n/jugador',(req, res)=>{
    console.log("alguien hizo get en la ruta /jugadores/n");
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
            const valores1 = [req.body.puntosASet1, req.body.puntosBSet1 , 1 ,12];
            const valores2 = [req.body.puntosASet2, req.body.puntosBSet2 , 2 ,12];
            const valores3 = [req.body.puntosASet3, req.body.puntosBSet3 , 3 ,12];
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

app.post("/partidos/jugadorn",(req,res) => {
    const infjug = req.body;
    console.log(req.body);
    try{
        if(Object.keys(req.body) !== null)
        {
            const sql = "INSERT INTO jugadores(nombre,numero, equipos_idequipo) VALUES (?,?,?)"
            const valores1e1=[req.body.e1j1,req.body.e1n1,1]
            const valores2e1=[req.body.e1j2,req.body.e1n2,1]  
            const valores3e1=[req.body.e1j3,req.body.e1n3,1]  
            const valores4e1=[req.body.e1j4,req.body.e1n4,1]  
            const valores5e1=[req.body.e1j5,req.body.e1n5,1]  
            const valores6e1=[req.body.e1j6,req.body.e1n6,1]  
            const valores1e2=[req.body.e2j1,req.body.e2n1,2]  
            const valores2e2=[req.body.e2j2,req.body.e2n2,2]  
            const valores3e2=[req.body.e2j3,req.body.e2n3,2]  
            const valores4e2=[req.body.e2j4,req.body.e2n4,2]
            const valores5e2=[req.body.e2j5,req.body.e2n5,2]
            const valores6e2=[req.body.e2j6,req.body.e2n6,2]  
            conexion.query(sql, valores1e1,(error, results)=>{
                if (error){
                    console.error("error al insertar jugador", error);
                }
            }
            )
            conexion.query(sql, valores2e1,(error, results)=>{
                if (error){
                    console.error("error al insertar jugador", error);
                }
            }
            )
            conexion.query(sql, valores3e1,(error, results)=>{
                if (error){
                    console.error("error al insertar jugador", error);
                }
            }
            )
            conexion.query(sql, valores4e1,(error, results)=>{
                if (error){
                    console.error("error al insertar jugador", error);
                }
            }
            )
            conexion.query(sql, valores5e1,(error, results)=>{
                if (error){
                    console.error("error al insertar jugador", error);
                }
            }
            )
            conexion.query(sql, valores6e1,(error, results)=>{
                if (error){
                    console.error("error al insertar jugador", error);
                }
            }
            )
            conexion.query(sql, valores1e2,(error, results)=>{
                if (error){
                    console.error("error al insertar jugador", error);
                }
            }
            )
            conexion.query(sql, valores2e2,(error, results)=>{
                if (error){
                    console.error("error al insertar jugador", error);
                }
            }
            )
            conexion.query(sql, valores3e2,(error, results)=>{
                if (error){
                    console.error("error al insertar jugador", error);
                }
            }
            )
            conexion.query(sql, valores4e2,(error, results)=>{
                if (error){
                    console.error("error al insertar jugador", error);
                }
            }
            )
            conexion.query(sql, valores5e2,(error, results)=>{
                if (error){
                    console.error("error al insertar jugador", error);
                }
            }
            )
            conexion.query(sql, valores6e2,(error, results)=>{
                if (error){
                    console.error("error al insertar jugador", error);
                }
            }
            )
        res.send("jugadores creados");
        res.status(200)
        
        }
        else{
            res.sendStatus(500);
            console.log("debes ingresar un nombre o numero")
        }
    }
    catch{
        res.sendStatus(500);
    }
    
    
});



app.post("/partidos/tiempon",(req,res) => {
    const inftiempo = req.body;
    console.log(req.body);
    try{
        if(Object.keys(req.body) !== null)
        {
            const valores=[req.body.tPtos1,req.body.tPtos2,req.body.equipo]
            const sql = "INSERT INTO tiempos(tPtos1,tPtos2,equipo) VALUES (?,?,?)"  
            conexion.query(sql, valores,(error, results)=>{
                if (error){
                    console.error("error al insertar tiempo", error);
                }
            }
        )
        res.send("tiempo creado");
        res.status(200)
        
        }
        else{
            res.sendStatus(500);
            console.log("debes ingresar los putos de los equipos")
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

