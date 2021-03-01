import * as dotenv from "dotenv";
dotenv.config({ path: '.env' });
import 'reflect-metadata';
import * as express from "express";
import * as bodyParser from "body-parser";
import routers from "./routes";
import { createConnection } from 'typeorm';

class App {
    public app: express.Application;

    constructor(config) {
        this.dbsetup(config);
        this.app = express();
        this.config();
        this.routerSetup();
    }

    private async dbsetup(config) {
        try {
            let connection = await createConnection(config);
            console.log("Has connected to DB? ", connection.isConnected);
        } catch (error) {
            console.log("TypeORM connection error: ", error);
        }
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
}
export default App;