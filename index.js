const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const {Usuario} = require("./dao")
const PUERTO = 4444
const app = express()
const TOKEN = "HSDFOSHFHSDFSDHFJSHK"
const usuarioID = ""
const ERRORLOGIN = "Datos incorrectos"
const crypto = require("crypto")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(cors())

app.get("/Usuarios", async (req, resp) => {
    const usuario = req.query.Usuario_ID
    if(usuario == undefined){
        const listausuarios = await Usuario.findAll()
        resp.send(listausuarios)
    }else{
        const listausuarios = await Usuario.findAll({
            where : {
                Usuario_ID : usuario
            }
        })
    resp.send(listausuarios)
    }
  })

  app.get("/Usuarios2", async (req, resp) => {
    const usuario = req.query.Correo
    if(usuario == undefined){
        const listausuarios = await Usuario.findAll()
        resp.send(listausuarios)
    }else{
        const listausuarios = await Usuario.findAll({
            where : {
                Correo : usuario
            }
        })
    resp.send(listausuarios)
    }
  })
  
  app.post("/Usuarios", async (req,resp) => {
    const dataRequest = req.body
    const Usuario_ID = crypto.randomUUID();
    const Username = dataRequest.Username
    const Nombre = dataRequest.Nombre
    const Apellido_Paterno = dataRequest.Apellido_Paterno
    const Apellido_Materno = dataRequest.Apellido_Materno
    const Correo = dataRequest.Correo
    const Password = dataRequest.Password
  
    const usuarioRegister = await Usuario.findAll({where : {
        Correo : Correo
    }})
    const usuarioNickname = await Usuario.findAll({where : {
        Username : Username
    }})
    if(usuarioRegister.length > 0){
        resp.send({
            error : "El correo electronico ya esta en uso."
        })
        return
    }else if(usuarioNickname.length > 0){
        resp.send({
            error : "Ese username ya esta en uso."
        })
        return
    }else if(Nombre === "" || Correo === "" || Password === "" || Usuario_ID === ""){
        resp.send({
            error : "Porfavor, complete todos los campos."
        })
        return
    }
    await Usuario.create({
        Usuario_ID : Usuario_ID,
        Username : Username,
        Correo : Correo,
        Password : Password,
        Nombre : Nombre,
        Apellido_Materno : Apellido_Materno,
        Apellido_Paterno : Apellido_Paterno        
    })
    
    resp.send({
        error : ""
    })
  })
  

  app.post("/login", async (req,resp) => {
    const correo = req.body.Correo
    const contrasena = req.body.Password
    const Usuario_ID = req.body.Usuario_ID
    const usuario = await Usuario.findOne({
        where : {
            Correo : correo,
            Password : contrasena,
            Usuario_ID : Usuario_ID
        }
    })
    if(usuario === null){
        resp.send({
            error : "Datos incorrectos",
            errortxt : ERRORLOGIN
        })
    }else{
        resp.send({
            error : "",
            token : correo,
            usuarioID : Usuario_ID,
        })
    }
})

app.listen(PUERTO, () => {
  console.log(`Servidor web iniciado en el puerto ${PUERTO}`)
})