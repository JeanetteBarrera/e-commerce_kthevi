module.exports = (sequelize, dataTypes) => {
    let alias = "Variant";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        color: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(300),
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
            
        }
    }
    
    let config = {
        tableName: "variants",
        timestamps: false
    }

    const Variant = sequelize.define(alias, cols, config)

    Variant.associate = models => {
        Variant.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        })
        Variant.hasMany(models.Stock, {
            as: "stock",
            foreignKey: "variant_id"
        })
    }

    return Variant;
}