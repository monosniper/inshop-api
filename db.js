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
    'dSa88-9H+u',
    {
        host: 'fc404394.mysql.tools',
        dialect: 'mysql',
    },
);

export default sequelize