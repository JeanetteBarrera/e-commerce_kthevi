module.exports = (sequelize, dataTypes) => {
    let alias = "Size";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    
    let config = {
        tableName: "sizes",
        timestamps: false
    }

    const Size = sequelize.define(alias, cols, config)

    Size.associate = models => {
        Size.hasMany(models.Stock, {
            as: "stocks",
            foreignKey: "size_id"
        })
    }

    return Size;
}