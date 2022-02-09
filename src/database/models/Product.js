module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
        },
        description: {
            type: dataTypes.STRING(800),
        },
        status: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        tags: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
        
    }
    let config = {
        tableName: "products",
        timestamps: true
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = models => {
        Product.belongsTo(models.Category, {
            as:"category",
            foreignKey: "category_id"
        })
        Product.hasMany(models.Variant, {
            as:"variants",
            foreignKey: "product_id"
        })
        Product.hasMany(models.Like, {
            as: "likes",
            foreignKey: "product_id"
        })
    }
    
    return Product;
}