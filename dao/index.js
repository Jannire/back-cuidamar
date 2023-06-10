const { Sequelize, DataTypes, Model } = require("sequelize");

const CADENA_CONEXION = "postgresql://AdminCuidaMar:Cuidamar4444@localhost:5432/CuidaMar"

const sequelize = new Sequelize(CADENA_CONEXION)

class Usuario extends Model { }

Usuario.init({
    ID_Usuario: {
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
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
}
)

// Abstract factory - super usuarios y simpleton
class Animal extends Model { }

Animal.init({
    ID_Animal: {
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
        type: DataTypes.STRING(150),
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
    ID_Contaminante: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    Descripcion: {
        type: DataTypes.STRING(1000),
        allowNull: true
    },
    Imagen: {
        type: DataTypes.STRING(300),
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
})

class Post extends Model{}

Post.init({
    ID_Post: {
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
    ID_Usuario: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
})

Post.belongsTo(Usuario, {
    foreignKey : "ID_Usuario"
})
Usuario.hasMany(Post,{
    foreignKey : "ID_Usuario"
})

class Comentario extends Model {}

Comentario.init({
    ID_Comentario: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    Contenido: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    ID_Usuario: {
        type: DataTypes.UUID,
        allowNull: true
    },
    ID_Post: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
})

Comentario.belongsTo(Usuario, {
    foreignKey : "ID_Usuario"
})
Usuario.hasMany(Comentario,{
    foreignKey : "ID_Usuario"
})

Comentario.belongsTo(Post, {
    foreignKey : "ID_Post"
})
Post.hasMany(Comentario,{
    foreignKey : "ID_Post"
})

class Afecta extends Model {}

Afecta.init({
    ID_Animal: {
        type: DataTypes.UUID,
        allowNull: false
    },
    ID_Contaminante: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
})

Afecta.belongsTo(Animal, {
    foreignKey : "ID_Animal"
})
Animal.hasMany(Afecta,{
    foreignKey : "ID_Animal"
})

Afecta.belongsTo(Animal, {
    foreignKey : "ID_Animal"
})
Animal.hasMany(Afecta,{
    foreignKey : "ID_Animal"
})

class Favoritos extends Model {}

Favoritos.init({
    ID_Animal: {
        type: DataTypes.UUID,
        allowNull: false
    },
    ID_Usuario: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true,
    sequelize
})

Favoritos.belongsTo(Usuario, {
    foreignKey : "ID_Usuario"
})
Usuario.hasMany(Favoritos,{
    foreignKey : "ID_Usuario"
})

Favoritos.belongsTo(Animal, {
    foreignKey : "ID_Animal"
})
Animal.hasMany(Favoritos,{
    foreignKey : "ID_Animal"
})

module.exports = {
    Usuario, Animal, Contaminante, Afecta, Comentario, Favoritos, Post
}