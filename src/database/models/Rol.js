module.exports = (sequelize, dataTypes) => {
    let alias = "Rol";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        title: {
            type: dataTypes.STRING(25),
            allowNull: false
        },
        
    }
    let config = {
        tableName: "rols",
        timestamps: false
    }

    const Rol = sequelize.define(alias, cols, config)

    Rol.associate = models => {
        Rol.hasMany(models.User, {
            as: "users",
            foreignKey: "rol_id"
        })
    }

    return Rol;
}