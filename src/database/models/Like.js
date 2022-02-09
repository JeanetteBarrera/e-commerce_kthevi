module.exports = (sequelize, dataTypes) => {
    let alias = "Like";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        active_favorite: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    
    let config = {
        tableName: "likes",
        timestamps: false
    }

    const Like = sequelize.define(alias, cols, config)

    Like.associate = models => {
        Like.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        })
        Like.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })
    }

    return Like;
}