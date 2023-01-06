import {DataTypes, Model} from "sequelize";
import sequelize from "../db";
import Shop from "./Shop";
import User from "./User";
import Domain from "./Domain";
import Position from "./Position";
import Module from "./Module";
import Color from "./Color";
import Category from "./Category";
import ShopFilter from "./Filter";
import Socialnetwork from "./Socialnetwork";
import Media from "./Media";
import Banner from "./Banner";
import Basket from "./Basket";
import Client from "./Client";
import BasketItem from "./BasketItem";
import Feedback from "./Feedback";
import CustomPage from "./CustomPage";
import ModuleDependency from "./ModuleDependency";
import Order from "./Order";
import Promocode from "./Promocode";
import PromocodeActivation from "./PromocodeActivation";
import Review from "./Review";
import UserAdmin from "./UserAdmin";
import UserBlock from "./UserBlock";

class Shop_Color extends Model {}

const Shop_Color_through = Shop_Color.init({
    value: DataTypes.STRING
}, {
    sequelize,
    tableName: 'Shop_Colors'
});

class Shop_Module extends Model {}

export const Shop_Module_through = Shop_Module.init({
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
        defaultValue: false
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
Shop.hasMany(Client);
Shop.belongsToMany(ShopFilter, { through: Shop_Filter_through });
Shop.belongsToMany(Socialnetwork, { through: Shop_Social_networks_through });

Category.belongsTo(Shop, { as: 'Shop' })
Category.hasMany(Position)

Category.hasMany(Media, {
    foreignKey: 'model_id',
    constraints: false,
    scope: {
        model_type: 'Category'
    }
})

ModuleDependency.belongsTo(Module, { as: 'Module' })
ModuleDependency.belongsTo(Module, { as: 'Dependency', foreignKey: 'dependency_id' })

Module.hasMany(Media, {
    foreignKey: 'model_id',
    constraints: false,
    scope: {
        model_type: 'Module'
    }
})

Module.belongsToMany(Module, { through: ModuleDependency, as: 'Dependencies' });
// Module.belongsTo(Shop_Module, { as: 'ShopModule', targetKey: 'module_id', foreignKey: 'id' })

// Module.hasMany(ModuleDependency, {
//     foreignKey: 'module_id',
//     constraints: false,
//     scope: {
//         model_type: 'Module'
//     }
// })

Position.belongsTo(Category, { as: 'Category' })
Position.belongsTo(Shop, { as: 'Shop' })

Position.hasMany(Media, {
    foreignKey: 'model_id',
    constraints: false,
    scope: {
        model_type: 'Position'
    }
})

Client.hasMany(Media, {
    foreignKey: 'model_id',
    constraints: false,
    scope: {
        model_type: 'Client'
    }
})

Banner.belongsTo(Shop, { as: 'Shop' })

Basket.belongsTo(Shop, { as: 'Shop' })
Basket.belongsTo(Client, { as: 'Client' })

BasketItem.belongsTo(Shop, { as: 'Basket' })
BasketItem.belongsTo(Position, { as: 'Position' })

Client.belongsTo(Shop, { as: 'Shop' })

CustomPage.belongsTo(Shop, { as: 'Shop' })

Domain.belongsTo(User, { as: 'User' })

Order.belongsTo(Shop, { as: 'Shop' })
Order.belongsTo(Promocode, { as: 'Promocode' })

Promocode.belongsTo(Shop, { as: 'Shop' })

PromocodeActivation.belongsTo(Promocode, { as: 'Promocode' })
PromocodeActivation.belongsTo(Client, { as: 'Client' })

Review.belongsTo(Shop, { as: 'Shop' })

UserAdmin.belongsTo(User, { as: 'User' })

UserBlock.belongsTo(User, { as: 'User' })