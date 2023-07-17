

const { Usuario, Animal, Contaminante, Afecta, Comentario, Favoritos, Post, Solicitud} = require("./dao")
const PUERTO = 4444

const TOKEN = "HSDFOSHFHSDFSDHFJSHK"
const usuarioID = ""
const ERRORLOGIN = "Datos incorrectos"
const crypto = require("crypto")

const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}))
app.use(cors())

// USUARIO --------------------------------------------------------------------------------------------------------------------------

app.post("/Usuarios", async (req, resp) => {
    const dataRequest = req.body
    const Usuario_ID = crypto.randomUUID();
    const Username = dataRequest.Username
    const Nombre = dataRequest.Nombre
    const Apellido_Paterno = dataRequest.Apellido_Paterno
    const Apellido_Materno = dataRequest.Apellido_Materno
    const Correo = dataRequest.Correo
    const Password = dataRequest.Password
    const admin = dataRequest.Admin
    const usuarioRegister = await Usuario.findAll({
        where: {
            Correo: Correo
        }
    })
    const usuarioNickname = await Usuario.findAll({
        where: {
            Username: Username
        }
    })
    if (usuarioRegister.length > 0) {
        resp.send({
            error: "El correo electronico ya esta en uso."
        })
        return
    } else if (usuarioNickname.length > 0) {
        resp.send({
            error: "Ese username ya esta en uso."
        })
        return
    } else if (Nombre === "" || Correo === "" || Password === "" || Usuario_ID === "") {
        resp.send({
            error: "Por favor, complete todos los campos."
        })
        return
    }
    await Usuario.create({
        Usuario_ID: Usuario_ID,
        Username: Username,
        Correo: Correo,
        Password: Password,
        Nombre: Nombre,
        Apellido_Materno: Apellido_Materno,
        Apellido_Paterno: Apellido_Paterno,
        Admin : admin
    })

    resp.send({
        error: ""
    })
})


app.get("/Usuarios", async (req, resp) => {
    const usuario = req.query.Usuario_ID
    if (usuario == undefined) {
        const listausuarios = await Usuario.findAll()
        resp.send(listausuarios)
    } else {
        const listausuarios = await Usuario.findAll({
            where: {
                Usuario_ID: usuario
            }
        })
        resp.send(listausuarios)
    }
})

app.get("/Usuarios2", async (req, resp) => {
    const usuario = req.query.Correo
    if (usuario == undefined) {
        const listausuarios = await Usuario.findAll()
        resp.send(listausuarios)
    } else {
        const listausuarios = await Usuario.findAll({
            where: {
                Correo: usuario
            }
        })
        resp.send(listausuarios)
    }
})


app.post("/login", async (req, resp) => {
    const correo = req.body.Correo
    const contrasena = req.body.Password
    const Usuario_ID = req.body.Usuario_ID
    const usuario = await Usuario.findOne({
        where: {
            Correo: correo,
            Password: contrasena,
            Usuario_ID: Usuario_ID,
        }
    })
    if (usuario === null) {
        resp.send({
            error: "Datos incorrectos",
            errortxt: ERRORLOGIN
        })
    } else {
        resp.send({
            error: "",
            token: correo,
            usuarioID: Usuario_ID,
            fullCredentials: {...req.body,admin: usuario.Admin}
        })
    }
})

app.post("/Modificar", async (req, resp) => {
    let usuarioCorreo = [];
    let usuarioNickname = [];

    const Usuario_ID = req.body.Usuario_ID
    const Username = req.body.Username
    const Correo = req.body.Correo
    const Nombre = req.body.Nombre
    const Apellido_Paterno = req.body.Apellido_Paterno
    const Apellido_Materno = req.body.Apellido_Materno
    const Password = req.body.Password
    if (Correo.length > 0 && Correo !== undefined && Username.length > 0 && Username !== undefined) {
        usuarioCorreo = await Usuario.findAll({
            where: { Correo: Correo }
        })
        usuarioNickname = await Usuario.findAll({
            where: { Username: Username }
        })
    }
    else if (Correo.length > 0 && Correo !== undefined) {
        usuarioCorreo = await Usuario.findAll({
            where: { Correo: Correo }
        })
    }
    else if (Username.length > 0 && Username !== undefined) {
        usuarioNickname = await Usuario.findAll({
            where: { Username: Username }
        })
    }

    if (usuarioCorreo.length > 0 && usuarioNickname.length > 0) {
        resp.send({ error: "Correo_Username" })
        return

    }
    else if (usuarioCorreo.length > 0) {
        resp.send({ error: "Correo" })
        return

    } else if (usuarioNickname.length > 0) {
        resp.send({ error: "Username" })
        return

    }
    const obj = generateObject(Username, Correo, Nombre, Apellido_Paterno, Apellido_Materno, Password);
    if (obj !== "Error") {
        await Usuario.update(obj, {
            where: {
                Usuario_ID: Usuario_ID
            }
        });
        resp.send({ error: "" });
    } else {
        resp.send({ error: "Llenar" });
    }

})

//REVISARRRR -----------------------------------------------------------------------------
const generateObject = (username, correo, nombre, apellidoP, apellidoM, password) => {
    let atleastone = false;
    const object = {};
    if (username.length > 0) {
        object["Username"] = username;
        atleastone = true;
    }
    if (correo.length > 0) {
        object["Correo"] = correo;
        atleastone = true;
    }
    if (nombre.length > 0) {
        object["Nombre"] = nombre;
        atleastone = true;
    }
    if (apellidoP.length > 0) {
        object["Apellido_Paterno"] = apellidoP;
        atleastone = true;
    }
    if (apellidoM.length > 0) {
        object["Apellido_Materno"] = apellidoM;
        atleastone = true;
    }
    if (password.length > 0) {
        object["Password"] = password;
        atleastone = true;
    }

    if (atleastone !== true) {
        return "Error";
    } else {
        return object;
    }
}

// ANIMAL --------------------------------------------------------------------------------------------------------------------------

app.get("/Animal", async (req, resp) => {
    const animal = req.query.AnimalID
    if (animal == undefined) {
        const listaanimal = await Animal.findAll()
        resp.send(listaanimal)
    } else {
        const listaanimal = await Animal.findAll({
            where: {
                AnimalID: animal
            }
        })
        resp.send(listaanimal)
    }
})

app.get("/Favoritos", async(req, resp) =>{
    const favoritos = req.query.Usuario_ID
    if (favoritos == undefined) {
        const lista_favoritos = await Favoritos.findAll()
        resp.send(lista_favoritos)
    } else {
        const lista_favoritos = await Favoritos.findAll({
            where: {
                Usuario_ID: favoritos
            }
        })
        resp.send(lista_favoritos)
    }

})

app.get("/Favoritos2", async(req, resp) =>{
    const usuario = req.query.Usuario_ID
    const animal = req.query.AnimalID
    
      
        const lista_favoritos = await Favoritos.findAll({
            where: {
                Usuario_ID: usuario,
                AnimalID : animal
            }
        })
        resp.send(lista_favoritos)
    

})

app.post("/Favoritos2", async (req,resp) => {
    const FavoritosID = crypto.randomUUID();
    const AnimalID = req.body.AnimalID
    const Usuario_ID = req.body.Usuario_ID
    const prueba = await Favoritos.findAll({
        where: {
            Usuario_ID : Usuario_ID,
            AnimalID: AnimalID
            
        }
    })
    if (prueba.length > 0) {
        resp.send({
            error: "YA ES FAVORITO"
        })
        return
    }
    await Favoritos.create({
        FavoritosID : FavoritosID,
        Usuario_ID : Usuario_ID,
        AnimalID : AnimalID
        
    })
    
    resp.send({
        error : ""
    })
})

app.delete("/Favoritos2", async (req,resp) => {
    const Usuario_ID = req.body.Usuario_ID
    const AnimalID = req.body.AnimalID
    await Favoritos.destroy({
        where : {
            Usuario_ID : Usuario_ID,
            AnimalID : AnimalID
        }
    })
})

// CONTAMINANTE --------------------------------------------------------------------------------------------------------------------------

app.get("/Contaminante", async (req, resp) => {
    const contaminante = req.query.ContaminanteID
    if (contaminante == undefined) {
        const lista_contaminante = await Contaminante.findAll()
        resp.send(lista_contaminante)
    } else {
        const lista_contaminante = await Contaminante.findAll({
            where: {
                ContaminanteID: contaminante
            }
        })
        resp.send(lista_contaminante)
    }
})

app.post("/Contaminante", async (req, resp) => {
    const ContaminanteID = crypto.randomUUID();
    const Nombre = req.body.Nombre
    const Descripcion = req.body.Descripcion
    const Imagen = req.body.Imagen
    const Profundidad = req.body.Profundidad
    const Contador = req.body.Contador

    const prueba = await Contaminante.findAll({
        where: {
            Nombre : Nombre,
        }
    })
    if (prueba.length > 0) {
        // Mañana revisar contador
        resp.status(400).send({
            error: "Ya existe"
        })
        return
    }
    const buffer = Buffer.from(Imagen, 'base64');

    await Contaminante.create({
        ContaminanteID : ContaminanteID,
        Nombre : Nombre,
        Descripcion: Descripcion,
        Imagen: Imagen,
        Profundidad: Profundidad,
        Contador: Contador
        
    })
    
    resp.send({
        error : "",
        ContaminanteID : ContaminanteID
    })
})

app.put("/Contaminante", async(req, resp) => {
    const Nombre = req.body.Nombre;
    const ContaminanteID = req.body.ContaminanteID;

    const contaminador = await Contaminante.findAll({
        where: {
            ContaminanteID: ContaminanteID,
        }
    })

    cuenta = contaminador[0].Contador+1;

    await Contaminante.update({
        ContaminanteID : ContaminanteID,
        Contador : cuenta,
        Nombre: Nombre
    },{where: {
        ContaminanteID: ContaminanteID,
    }})

    resp.send({
        error : "Hola"
    })
})


// Solicitud de contaminante -----------------------------------------------------------------------------------------------------
app.post("/enviarSolicitud", async (req, resp) => {
    const SolicitudID = crypto.randomUUID();
    const Nombre = req.body.Nombre;
    const Descripcion = req.body.Descripcion;
    const Imagen = req.body.Imagen;
  
    if (Nombre === "" || Descripcion === "") {
      resp.send({
        error: "Ingresar mínimo nombre y descripción.",
      });
      return;
    }
    const buffer = Buffer.from(Imagen, 'base64');
  
    try {
      await Solicitud.create({
        SolicitudID: SolicitudID,
        Nombre: Nombre,
        Descripcion: Descripcion,
        Imagen: buffer,
      });
  
      resp.send({
        error: "",
      });
    } catch (error) {
      console.error(error);
      resp.send({
        error: "Error tras la inserción de datos",
      });
    }
  });

app.get("/Solicitud", async (req, resp) => {
    const solicitud = req.query.SolicitudID
    if (solicitud == undefined) {
        const lista_solicitud = await Solicitud.findAll()
        resp.send(lista_solicitud)
    } else {
        const lista_solicitud = await Solicitud.findAll({
            where: {
                SolicitudID: solicitud
            }
        })
        resp.send(lista_solicitud)
    }
})

app.delete("/Solicitud", async (req,resp) => {
    const Solicitud_ID = req.body.SolicitudID
    await Solicitud.destroy({
        where : {
            SolicitudID : Solicitud_ID,
        }
    })
    resp.send("Solicitud eliminada")
})
// AFECTA ----------------------------------------------------------------------------------
app.post("/Afecta", async(req, resp) => {
    const AfectaID = crypto.randomUUID();
    const AnimalID = req.body.AnimalID;
    const ContaminanteID = req.body.ContaminanteID;

    const afecta = await Afecta.findAll({
        where : {
            AnimalID: AnimalID,
            ContaminanteID : ContaminanteID
        }
    })
    if (afecta.length > 0){
        return resp.send({
            error: "Ya existe esta conexion"
        })
    }
    await Afecta.create({
        AfectaID : AfectaID,
        ContaminanteID : ContaminanteID,
        AnimalID : AnimalID
    })

})

app.get("/Afecta", async(req, resp) => {
    const Afecta = req.query.AfectaID;
    if(Afecta == undefined){
        const lista_afectan = await Afecta.findAll();
        resp.send(lista_afectan);
    } else {
        const lista_afectan = await Afecta.findAll({
            where : {
                AfectaID : Afecta
            }
        })
        resp.send(lista_afectan);
    }
})


// FORO --------------------------------------------------------------------------------------------------------------------------

app.get("/Comentario", async(req, resp) => {
    const comentario = req.query.ComentarioID
    if (comentario == undefined) {
        const lista_comentario = await Comentario.findAll()
        resp.send(lista_comentario)
    } else {
        const lista_comentario = await Comentario.findAll({
            where: {
                ComentarioID: comentario
            }
        })
        resp.send(lista_comentario)
    }
})

app.get("/Comentario2", async(req, resp) => {
    const comentario = req.query.PostID
    if (comentario == undefined) {
        const lista_comentario = await Comentario.findAll()
        resp.send(lista_comentario)
    } else {
        const lista_comentario = await Comentario.findAll({
            where: {
                PostID: comentario
            }
        })
        resp.send(lista_comentario)
    }
})

app.get("/Post", async (req, resp) => {
    const post = req.query.PostID
    if (post == undefined) {
        const listapost = await Post.findAll()
        resp.send(listapost)
    } else {
        const listapost = await Post.findAll({
            where: {
                PostID: post
            }
        })
        resp.send(listapost)
    }
})

app.post("/Post", async (req,resp) => {
    const PostID = crypto.randomUUID();
    const Usuario_ID = req.body.Usuario_ID
    const Cuerpo = req.body.Cuerpo
    const Titulo = req.body.Titulo

    const post = await Post.findAll({
        where : {
            Titulo : Titulo
        }
    })
    if(post.length > 0){
        resp.send({
            error : "Ya hay un post con esa tematica!"
        })
        return
    }else if(Usuario_ID ==="" || Cuerpo ==="" || Titulo ===""){
        resp.send({
            error : "Ingresa informacion para publicar!"
        })
        return
    }
    await Post.create({
        PostID : PostID,
        Usuario_ID : Usuario_ID,
        Cuerpo : Cuerpo,
        Titulo : Titulo
    })
    
    resp.send({
        error : ""
    })
})

app.post("/Comentario", async (req,resp) => {
    const PostID = req.body.PostID
    const Usuario_ID = req.body.Usuario_ID
    const Contenido = req.body.Contenido
    const fecha = req.body.fecha
    const ComentarioID = crypto.randomUUID();

    await Comentario.create({
        PostID : PostID,
        Usuario_ID : Usuario_ID,
        Contenido : Contenido,
        ComentarioID : ComentarioID,
        fecha : fecha
    })
    
    resp.send({
        error : ""
    })
})

app.delete("/Comentario2", async (req,resp) => {
    const PostID = req.body.PostID
    await Comentario.destroy({
        where : {
            PostID : PostID
        }
    })
})

app.delete("/Comentario", async (req,resp) => {
    const ComentarioID = req.body.ComentarioID
    await Comentario.destroy({
        where : {
            ComentarioID : ComentarioID
        }
    })
})

app.delete("/Post", async (req,resp) => {
    const PostID = req.body.PostID
    await Post.destroy({
        where : {
            PostID : PostID
        }
    })
})

app.listen(PUERTO, () => {
    console.log(`Servidor web iniciado en el puerto ${PUERTO}`)
})