const { Sequelize, DataTypes, Model } = require("sequelize");

const CADENA_CONEXION = "postgresql://AdminCuidaMar:Cuidamar4444@localhost:5432/CuidaMar"

const sequelize = new Sequelize(CADENA_CONEXION)


// Abstract factory - super usuarios y simpleton
class Usuario extends Model { }


Usuario.init({
    Usuario_ID: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    Username: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    Nombre: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    Apellido_Paterno: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    Apellido_Materno: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    Correo: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    Password: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    Admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
}
)


class Animal extends Model { }

Animal.init({
    AnimalID: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    NombreCientifico: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    Descripcion: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    Profundidad: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Imagen: {
        type: DataTypes.STRING(150),
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
})

class Contaminante extends Model {}

Contaminante.init({
    ContaminanteID: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    Descripcion: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    Imagen: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    Profundidad: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
})

class Solicitud extends Model {}

Solicitud.init({
    SolicitudID: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    Descripcion: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    Imagen: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
})

class Post extends Model{}

Post.init({
    PostID: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    Titulo: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    Cuerpo: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    Usuario_ID: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
})

Post.belongsTo(Usuario, {
    foreignKey : "Usuario_ID"
})
Usuario.hasMany(Post,{
    foreignKey : "Usuario_ID"
})

class Comentario extends Model {}

Comentario.init({
    ComentarioID: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    Contenido: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    Usuario_ID: {
        type: DataTypes.UUID,
        allowNull: true
    },
    PostID: {
        type: DataTypes.UUID,
        allowNull: true
    },
    fecha: {
        type: DataTypes.STRING(15),
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
})

Comentario.belongsTo(Usuario, {
    foreignKey : "Usuario_ID"
})
Usuario.hasMany(Comentario,{
    foreignKey : "Usuario_ID"
})

Comentario.belongsTo(Post, {
    foreignKey : "PostID"
})
Post.hasMany(Comentario,{
    foreignKey : "PostID"
})

class Afecta extends Model {}

Afecta.init({
    AfectaID: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    AnimalID: {
        type: DataTypes.UUID,
        allowNull: false
    },
    ContaminanteID: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
})

Afecta.belongsTo(Animal, {
    foreignKey : "AnimalID"
})
Animal.hasMany(Afecta,{
    foreignKey : "AnimalID"
})

Afecta.belongsTo(Contaminante, {
    foreignKey : "ContaminanteID"
})
Contaminante.hasMany(Afecta,{
    foreignKey : "ContaminanteID"
})

class Favoritos extends Model {}

Favoritos.init({
    FavoritosID: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },AnimalID: {
        type: DataTypes.UUID,
        allowNull: false
    },
    Usuario_ID: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
})

Favoritos.belongsTo(Usuario, {
    foreignKey : "Usuario_ID"
})
Usuario.hasMany(Favoritos,{
    foreignKey : "Usuario_ID"
})

Favoritos.belongsTo(Animal, {
    foreignKey : "AnimalID"
})
Animal.hasMany(Favoritos,{
    foreignKey : "AnimalID"
})

module.exports = {
    Usuario, Animal, Contaminante, Afecta, Solicitud, Comentario, Favoritos, Post, sequelize
}