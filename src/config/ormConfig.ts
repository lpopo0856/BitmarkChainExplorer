import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.PG_HOST,
    port: 5432,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
    entities: [
        __dirname + "/../entities/entities/*.js"
    ],
    logging: false
}

export default config;