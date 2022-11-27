import Sequelize from 'sequelize';
import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

// const sequelize = new Sequelize(
//     process.env.DATABASE,
//     process.env.DATABASE_USER,
//     process.env.DATABASE_PASSWORD,
//     {
//         host: process.env.DATABASE_HOST,
//         dialect: 'mysql',
//     },
// );

const sequelize = new Sequelize(
    'fc404394_newinshop',
    'fc404394_newinshop',
    '&di!7Ei45V',
    {
        host: '185.104.44.127',
        dialect: 'mysql',
    },
);

export default sequelize