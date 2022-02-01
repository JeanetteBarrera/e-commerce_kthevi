module.exports = (sequelize, dataTypes) => {
    let alias = "Stock";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        variant_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        size_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    }
    
    let config = {
        tableName: "stocks",
        timestamps: false
    }

    const Stock = sequelize.define(alias, cols, config)

    Stock.associate = models => {
        Stock.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        })
        Stock.belongsTo(models.Variant, {
            as: "variant",
            foreignKey: "variant_id"
        })
        Stock.belongsTo(models.Size, {
            as: "size",
            foreignKey: "size_id"
        })
    }

    return Stock;
}