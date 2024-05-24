

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
let idActualPartido;
let idEquipo1;
let idEquipo2;
app.get('/partidos',(req, res)=>{
    console.log("alguien hizo get en la ruta /partidos");
    res.send('Aun no hay partidos');
    
});
/**crear partido con equipos completo :D :D :D :D :D */

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
                        console.error("Error al obtener el ultimo ID", error);
                        return res.status(500).send("Error interno del servidor");
                    }

                    idActualPartido= results[0].last_id;
                    const valoresEquipo1 = [infoPartido.equipo1, idActualPartido];
                    const valoresEquipo2 = [infoPartido.equipo2, idActualPartido];

                    
                    conexion.query(sqlInsertEquipo, valoresEquipo1, (error, results) => {
                        if (error) {
                            console.error("Error al insertar equipo 1", error);
                            return res.status(500).send("Error interno del servidor");
                        }
                        conexion.query(sqlLastInsertId, (error,results) =>{
                            if (error){
                                console.error("Error al obtener el ultimo ID", error);
                                return res.status(500).send("Error interno del servidor");
                            }
                        idEquipo1= results[0].last_id;
                        console.log("id equipo 1");
                        console.log(idEquipo1);
                        }
                        );
                        
                    conexion.query(sqlInsertEquipo, valoresEquipo2, (error, results) => {
                        if (error) {
                            console.error("Error al insertar equipo 2", error);
                            return res.status(500).send("Error interno del servidor");
                        }
                        conexion.query(sqlLastInsertId, (error,results) =>{
                            if (error){
                                console.error("Error al obtener el ultimo ID", error);
                                return res.status(500).send("Error interno del servidor");
                            }
                        idEquipo2= results[0].last_id;
                        console.log("id equipo 2");
                        console.log(idEquipo2);
                        }
                        );
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

app.post("/partidos/jugadoresn",(req,res) => {
    const infjug = req.body;
    console.log(Object.keys(req.body).length);
    try{
        if(Object.keys(req.body) !== null)
        {
            const sql = "INSERT INTO jugadores(nombre,numero, equipos_idequipo) VALUES (?,?,?)"
            const nombresJugEq1=[infjug.Eq1Nom1, infjug.Eq1Nom2, infjug.Eq1Nom3, infjug.Eq1Nom4, infjug.Eq1Nom5, infjug.Eq1Nom6, infjug.Eq1Nom7, infjug.Eq1Nom8, infjug.Eq1Nom9, infjug.Eq1Nom10, infjug.Eq1Nom11, infjug.Eq1Nom12, infjug.Eq1Nom13, infjug.Eq1Nom14];
            const nombresJugEq2=[infjug.Eq2Nom1, infjug.Eq2Nom2, infjug.Eq2Nom3, infjug.Eq2Nom4, infjug.Eq2Nom5, infjug.Eq2Nom6, infjug.Eq2Nom7, infjug.Eq2Nom8, infjug.Eq2Nom9, infjug.Eq2Nom10, infjug.Eq2Nom11, infjug.Eq2Nom12, infjug.Eq2Nom13, infjug.Eq2Nom14];
            const numerosJugEq1=[infjug.Eq1Num1, infjug.Eq1Num2, infjug.Eq1Num3, infjug.Eq1Num4, infjug.Eq1Num5, infjug.Eq1Num6, infjug.Eq1Num7, infjug.Eq1Num8, infjug.Eq1Num9, infjug.Eq1Num10, infjug.Eq1Num11, infjug.Eq1Num12, infjug.Eq1Num13, infjug.Eq1Num14];
            const numerosJugEq2=[infjug.Eq2Num1, infjug.Eq2Num2, infjug.Eq2Num3, infjug.Eq2Num4, infjug.Eq2Num5, infjug.Eq2Num6, infjug.Eq2Num7, infjug.Eq2Num8, infjug.Eq2Num9, infjug.Eq2Num10, infjug.Eq2Num11, infjug.Eq2Num12, infjug.Eq2Num13, infjug.Eq2Num14];
            
            for (let i=0; i < infjug.CantJugEq1; i++){
                const valores= [nombresJugEq1[i], numerosJugEq1[i],idEquipo1];
                conexion.query(sql,valores,(error,results)=>{
                    if (error){
                        console.error("error al insertar jugador", error)
                    }

                }

                )
            }
            for (let i=0; i < infjug.CantJugEq2; i++){
                const valores= [nombresJugEq2[i], numerosJugEq2[i],idEquipo2];
                conexion.query(sql,valores,(error,results)=>{
                    if (error){
                        console.error("error al insertar jugador", error)
                    }

                }

                )
            }

            

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

app.post("/partidos/sancionn",(req,res) => {
    const infsancion = req.body;
    console.log(req.body);
    try{
        if(Object.keys(req.body) !== null)
        {
            const valores=[req.body.tipoSancion,1,1]
            const sql = "INSERT INTO sanciones(tipoSancion) VALUES (?)"  
            conexion.query(sql, valores,(error, results)=>{
                if (error){
                    console.error("error al insertar sancion", error);
                }
            }
        )
        res.send("sancion creada");
        res.status(200)
        
        }
        else{
            res.sendStatus(500);
            console.log("debes ingresar una sancion")
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

