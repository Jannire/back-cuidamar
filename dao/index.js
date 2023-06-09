const { Sequelize, DataTypes, Model } = require("sequelize");

const CADENA_CONEXION = "postgresql://AdminCuidaMar:Cuidamar4444@localhost:5432/CuidaMar"

const sequelize = new Sequelize(CADENA_CONEXION)

class Usuario extends Model{}

    Usuario.init({
        ID_Usuario : {
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
        freezeTableName : true,
        sequelize
    }
)    


/*
    constructor(Username, Nombre, Apellido_Paterno, Apellido_Materno, Password, Correo){
        this.Username = Username;
        this.Nombre = Nombre;
        this.Apellido_Paterno = Apellido_Paterno;
        this.Apellido_Materno = Apellido_Materno;
        this.Password = Password;
        this.Correo = Correo;
    }*/


/*
const Usuario = sequelize.define("Usuario",{
    ID_Usuario : {
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
*/
const Animal = sequelize.define("Animal",{
    AnimalID : {
        primaryKey : true,
        type : DataTypes.UUID,
        defaultValue : Sequelize.UUIDV4,
        allowNull : false
    },
    Nombre : {
        type : DataTypes.STRING(25),
        allowNull : true
    },
    NombreCientifico : {
        type : DataTypes.STRING(50),
        allowNull : true
    },
    Descripcion : {
        type : DataTypes.STRING(150),
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


module.exports = {
    Usuario, Animal
}