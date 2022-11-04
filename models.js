import Sequelize, {DataTypes} from 'sequelize';
import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
    },
);


const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, },
});

const Domain = sequelize.define('Domain', {
    name: { type: DataTypes.STRING, },
    isSubdomain: { type: DataTypes.BOOLEAN, },
});

// Domain.belongsTo(User, {
//     foreignKey: 'user_id'
// })

export {
    sequelize,

    User,
    Domain
};


// const models = {
//     User: sequelize.import('./models/user'),
// };
//
// Object.keys(models).forEach(key => {
//     if ('associate' in models[key]) {
//         models[key].associate(models);
//     }
// });
//
//
// export default models;