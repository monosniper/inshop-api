import {ApolloServer} from "apollo-server";
import typeDefs from "./schema/type-defs";
import resolvers from "./schema/resolvers";
import db from "./db";
import {DataTypes, Model} from "sequelize";
import Shop from "./models/Shop";
import User from "./models/User";
import Domain from "./models/Domain";
import Position from "./models/Position";
import Module from "./models/Module";
import Color from "./models/Color";
import Category from "./models/Category";
import sequelize from "./db";
import Banner from "./models/Banner";
import Client from "./models/Client";
import Basket from "./models/Basket";
import BasketItem from "./models/BasketItem";
import CustomPage from "./models/CustomPage";
import ModuleDependency from "./models/ModuleDependency";
import Promocode from "./models/Promocode";
import Order from "./models/Order";
import PromocodeActivation from "./models/PromocodeActivation";
import Review from "./models/Review";
import UserAdmin from "./models/UserAdmin";
import UserBlock from "./models/UserBlock";
import ShopFilter from "./models/Filter";
import Socialnetwork from "./models/Socialnetwork";
import CryptoJS from 'crypto-js'
import Media from "./models/Media";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        console.log(req.body)
        let authToken = null
        let currentShop = null

        try {
            const authToken  = req.headers.authorization.split(' ')[1]
            console.log(req.headers.authorization, req.body)
            const bytes  = CryptoJS.AES.decrypt(authToken, '123');
            const host = bytes.toString(CryptoJS.enc.Utf8);

            if (authToken) {
                const subdomain = host.split('.')[0]

                const domain = await Domain.findOne({ where: { name: [host, subdomain] } })

                currentShop = await Shop.findOne({ where: { domainId: domain.id }})
            }
        } catch (e) {
            console.warn(`Unable to authenticate using auth token: ${authToken}. `, e)
        }

        return {
            authToken,
            currentShop
        }
    }
})

class Shop_Color extends Model {}

const Shop_Color_through = Shop_Color.init({
    value: DataTypes.STRING
}, {
    sequelize,
    tableName: 'Shop_Colors'
});

class Shop_Module extends Model {}

const Shop_Module_through = Shop_Module.init({
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    tableName: 'Shop_Modules'
});

class Shop_Filter extends Model {}

const Shop_Filter_through = Shop_Filter.init({
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize,
    tableName: 'Shop_Filters'
});

class Shop_Social_networks extends Model {}

const Shop_Social_networks_through = Shop_Social_networks.init({
    value: {
        type: DataTypes.STRING(2048),
    }
}, {
    sequelize,
    tableName: 'Shop_Social_networks'
});

Shop.belongsTo(User, { as: 'User', foreignKey: 'userId' })
Shop.belongsTo(Domain, { as: 'Domain', foreignKey: 'domainId' })
Shop.hasMany(Position)
Shop.belongsToMany(Module, { through: Shop_Module_through });
Shop.belongsToMany(Color, { through: Shop_Color_through });
Shop.hasMany(Category);
Shop.belongsToMany(ShopFilter, { through: Shop_Filter_through });
Shop.belongsToMany(Socialnetwork, { through: Shop_Social_networks_through });

Category.belongsTo(Shop, { as: 'Shop' })
Category.hasMany(Position)

Position.belongsTo(Category, { as: 'Category' })
Position.belongsTo(Shop, { as: 'Shop' })

Position.hasMany(Media, {
    foreignKey: 'model_id',
    constraints: false,
    scope: {
        model_type: 'Position'
    }
})

Media.belongsTo(Position, { foreignKey: 'model_id', constraints: false });

Banner.belongsTo(Shop, { as: 'Shop' })

Basket.belongsTo(Shop, { as: 'Shop' })
Basket.belongsTo(Client, { as: 'Client' })

BasketItem.belongsTo(Shop, { as: 'Basket' })
BasketItem.belongsTo(Position, { as: 'Position' })

Client.belongsTo(Shop, { as: 'Shop' })

CustomPage.belongsTo(Shop, { as: 'Shop' })

Domain.belongsTo(User, { as: 'User' })

ModuleDependency.belongsTo(Module, { as: 'Module' })
ModuleDependency.belongsTo(Module, { as: 'Dependency', foreignKey: 'dependency_id' })

Order.belongsTo(Shop, { as: 'Shop' })
Order.belongsTo(Promocode, { as: 'Promocode' })

Promocode.belongsTo(Shop, { as: 'Shop' })

PromocodeActivation.belongsTo(Promocode, { as: 'Promocode' })
PromocodeActivation.belongsTo(Client, { as: 'Client' })

Review.belongsTo(Shop, { as: 'Shop' })

UserAdmin.belongsTo(User, { as: 'User' })

UserBlock.belongsTo(User, { as: 'User' })

// db.sync()

db.authenticate()
    .then(async () => {
        server.listen().then(({ url }) => {
            console.log('Apollo server has started successfully: ' +  url)
        })
    });