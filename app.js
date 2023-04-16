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
      Nombre : Nombre,
      Correo : Correo,
      Password : Password,
      Apellido_Materno : Apellido_Materno,
      Apellido_Paterno : Apellido_Paterno,
      Username : Username,
  })
  
  resp.send({
      error : ""
  })
})


app.listen(PUERTO, () => {
  console.log(`Servidor web iniciado en el puerto ${PUERTO}`)
})