const { Sequelize, DataTypes } = require("sequelize");

const CADENA_CONEXION = "postgresql://AdminCuidaMar:Cuidamar4444@localhost:5432/CuidaMar"

const sequelize = new Sequelize(CADENA_CONEXION)

const Usuario = sequelize.define("Usuario",{
    Usuario_ID : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    Username : {
        type : DataTypes.STRING(25),
        allowNull : true
    },
    Nombre : {
        type : DataTypes.STRING(25),
        allowNull : true
    },
    Apellido_Paterno : {
        type : DataTypes.STRING(25),
        allowNull : true
    },
    Apellido_Materno : {
        type : DataTypes.STRING(25),
        allowNull : true
    },
    Correo : {
        type : DataTypes.STRING(50),
        allowNull : true
    },
    Password : {
        type : DataTypes.STRING(50),
        allowNull : true
    }  
}, {
    timestamps : false,
    freezeTableName : true
})

const Animal = sequelize.define("Animal",{
    AnimalID : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    Nombre : {
        type : DataTypes.STRING(50),
        allowNull : true
    },
    NombreCientifico : {
        type : DataTypes.STRING(50),
        allowNull : true
    },
    Descripcion : {
        type : DataTypes.STRING(1000),
        allowNull : true
    },
    Profundidad : {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    Imagen : {
        type : DataTypes.STRING(150),
        allowNull : true
    }
}, {
    timestamps : false,
    freezeTableName : true
})

const Post = sequelize.define("Post",{
    PostID : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    Usuario_ID : {
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    Cuerpo : {
        type : DataTypes.STRING(500),
        allowNull : true
    },
    Titulo : {
        type : DataTypes.STRING(75),
        allowNull : true
    }
}, {
    timestamps : false,
    freezeTableName : true
})

Usuario.hasMany(Post,{
    foreignKey : "Usuario_ID"
})
Post.belongsTo(Usuario,{
    foreignKey : "Usuario_ID"
})

module.exports = {
    Usuario, Animal, Post
}