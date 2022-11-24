const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('products', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        sellerId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            model: 'user',
            key: 'id'
        },
        productName: {
            type: DataTypes.STRING(100)
        },
        image: {
            type: DataTypes.STRING(100)
        },
        brand: {
            type: DataTypes.STRING(100)
        },
        category: {
            type: DataTypes.ENUM,
            values: ['Clothes', 'Laptops', 'Mobiles']
        },
        description: {
            type: DataTypes.STRING(100)
        },
        price: {
            type: DataTypes.INTEGER,
        },
        stock: {
            type: DataTypes.INTEGER,
        }
    }, {
        underscored: true,
    })
    return product;
};


