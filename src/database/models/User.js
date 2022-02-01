module.exports = (sequelize, dataTypes) => {
    const alias = "User";
    const cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        last_name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        }, 
        email: {
            type: dataTypes.STRING(45),
            allowNull: false,
            unique: true
        }, 
        password: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },  
        avatar: {
            type: dataTypes.STRING(250), 
        },
        phone: {
            type: dataTypes.STRING(45),
        },
        address: {
            type: dataTypes.STRING(45),
        },
        rol_id: {
            type: dataTypes.INTEGER(2).UNSIGNED,
            allowNull: false
        }

    }

    const config = {
        tableName: 'users',
        timestamps: true
    }

    const User = sequelize.define(alias, cols, config)

    User.associate = (models) => {
        User.belongsTo(models.Rol, {
            as: 'rol',
            foreignKey: 'rol_id',
        })
        User.hasMany(models.Like, {
            as: "likes",
            foreignKey: "user_id"
        })
    }

    return User
}