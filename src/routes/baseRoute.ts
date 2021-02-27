import { Router } from "express";

abstract class BaseRoute {
    protected abstract path: string;
    protected router = Router();
    protected abstract setRoutes(): void;

    public getPrefix() {
        return this.path;
    }

    public getRouter() {
        return this.router;
    }

}

export default BaseRoute;