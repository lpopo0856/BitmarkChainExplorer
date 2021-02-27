import * as dotenv from "dotenv";
dotenv.config({ path: '.env' });
import 'reflect-metadata';
import * as express from "express";
import * as bodyParser from "body-parser";
import routers from "./routes";
import { createConnection } from 'typeorm';
import config from './config/ormConfig';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routerSetup();
        this.dbSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private routerSetup() {
        for (const route of routers) {
            this.app.use(route.getPrefix(), route.getRouter());
        }
    }

    private async dbSetup() {
        try {
            let connection = await createConnection(config);
            console.log("Has connected to DB? ", connection.isConnected);
        } catch (error) {
            console.log("TypeORM connection error: ", error)
        }
    }
}
export default new App().app;