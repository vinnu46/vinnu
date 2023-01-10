require('dotenv').config();
const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});
sequelize.authenticate()
.then( db => {
    console.log('Connection has been established successfully.');
    })
.catch ( err => {
    console.error('Unable to connect to the database:', err);
    })

    const Item = sequelize.define('items', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    timestamps: false
});

const User = sequelize.define('users', {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contactNum: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    timestamps: false
}
);

const Cart = sequelize.define('carts', {
    userID: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    itemID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Item,
            key: 'id'
        }
    },
    numberOfItems: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    timestamps: false
}
);
const PromotionCode = sequelize.define('PromotionCodes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    minimumPaymentLimit: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    maximumDiscountLimit: {
    type: DataTypes.FLOAT,
    allowNull: false,
    },
    rawDiscountAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    },
    percentageDiscountAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    },
},
{
    timestamps: false
});
const Purchase = sequelize.define('purchases', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userID: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    totalBeforePromotion: {
        type: DataTypes.FLOAT,
        allowNull: false,
        },
    promotionCodeID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: PromotionCode,
                key: 'id',
            }
        },
    totalAfterPromotion: {
            type: DataTypes.FLOAT,
            allowNull: false,
            },
    },
);

    const PurchaseItem = sequelize.define('PurchaseItems', {
        purchaseID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: Purchase,
                key: 'id',
            }
        },  
        itemID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: Item,
                key: 'id',
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        numberOfItems: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: false
    });
    Item.hasMany(Cart)
    Cart.belongsTo(Item)

sequelize.sync()
    module.exports ={
    Item, User, Cart, Purchase, PromotionCode, PurchaseItem
    }