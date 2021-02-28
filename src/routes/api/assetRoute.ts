import assetController from "../../controllers/assetController";
import { apiBaseRoute } from './apiBaseRoute';

export class assetRoutes extends apiBaseRoute {
    private assetController: assetController;

    constructor() {
        super();
        this.assetController = new assetController();
        this.setRoutes();
    }

    protected setRoutes() {
        this.router.route('/asset/:id')
            .get((req, res) => {
                this.assetController.getOne(req, res)
            });
    }
}